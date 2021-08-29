import { Transaction } from 'ethereumjs-tx';
import { BITFI_WALLET, COOLWALLET as coolWalletType } from '../../bip44/walletTypes';
import HDWalletInterface from '@/wallets/HDWalletInterface';
import errorHandler from './errorHandler';
import bip44Paths from '../../bip44';
import { bufferToHex } from 'ethereumjs-util';
import Vue from 'vue';

import store from '@/store';
import {
  getSignTransactionObject,
  sanitizeHex,
  getBufferFromHex,
  calculateChainIdFromV
} from '../../utils';
import commonGenerator from '@/helpers/commonGenerator';
import { connectBitfi } from './utils';

const NEED_PASSWORD = false;
const APP_NAME = 'MyEtherWalletV5';

class BitfiWallet {
  constructor() {
    this.identifier = BITFI_WALLET;
    this.isHardware = true;
    this.needPassword = NEED_PASSWORD;
    this.appPrivateKey = '';
    this.appPublicKey = '';
    this.transport = {};
    this.bitfi = null
    this.isBitfi = true
    this.deviceInstance = {};
    this.supportedPaths = bip44Paths[coolWalletType];
  }

  init() {
    return new Promise(async (resolve, reject) => {
      this.bitfi = await connectBitfi()

      if (!this.bitfi) {
        reject(new Error('not-installed'))
        window.open('https://chrome.google.com/webstore/detail/bitfi-xdc-chrome-extensio/hollalkeimdfbjebppaojkookekggehm','_blank');
        return
      }
      
      this.account = await this.bitfi.getAccount()
      //console.log(this.account)
      if (!this.account)
        reject(new Error('not-authenticated'))

      resolve()
    });
  }


  async getAccount(idx) {
    const address = this.account.slice(3);
    const txSigner = async tx => {
      tx = new Transaction(tx, {
        common: commonGenerator(store.state.main.network)
      });
      const cwTx = {
        data: bufferToHex(tx.data),
        gasLimit: bufferToHex(tx.gasLimit),
        gasPrice: bufferToHex(tx.gasPrice),
        nonce: bufferToHex(tx.nonce),
        to: bufferToHex(tx.to),
        value: bufferToHex(tx.value),
        chainId: store.state.main.network.type.chainID
      };

      const networkId = tx.getChainId();
      
      if (parseInt(this.bitfi.networkID) !== parseInt(cwTx.chainId)) {
        throw new Error('wrong-network')
      }

      const data = {
        amount: BigInt(cwTx.value).toString(),
        gasPrice: BigInt(cwTx.gasPrice).toString(),
        gasLimit: BigInt(cwTx.gasLimit).toString(),
        to: cwTx.to,
        from: this.account,
        networkId
      }

      //console.log("TRANSACTION:")
      //console.log(data)

      this.bitfi.request(this.bitfi.subjects.EXPAND)

      let result = await this.bitfi.request(this.bitfi.subjects.SIGN_TX, {
        timeoutMsec: 60 * 1000,
        data
      })
      
      result = ""

      return {
        tx: {
          hash: result
        }
      }
      /*
      if (result) {
        const resultTx = new Transaction(result);
        tx.v = getBufferFromHex(sanitizeHex(resultTx.v.toString('hex')));
        tx.r = getBufferFromHex(sanitizeHex(resultTx.r.toString('hex')));
        tx.s = getBufferFromHex(sanitizeHex(resultTx.s.toString('hex')));
        const signedChainId = calculateChainIdFromV(tx.v);
        if (signedChainId !== networkId)
          throw new Error(
            Vue.$i18n.t('errorsGlobal.invalid-network-id-sig', {
              got: signedChainId,
              expected: networkId
            }),
            'InvalidNetworkId'
          );
        return getSignTransactionObject(tx);
      }
      */
      return result;
    };
    const msgSigner = async msg => {
      throw new Error('not-supported')
    };
    return new HDWalletInterface(
      null,
      address,
      this.isHardware,
      this.identifier,
      errorHandler,
      txSigner,
      msgSigner,
      null
    );
  }

  getCurrentPath() {
    return this.supportedPaths[0].path;
  }
  getSupportedPaths() {
    return this.supportedPaths;
  }
}

const createWallet = async (_, password) => {
  const _coolWallet = new BitfiWallet();
  await _coolWallet.init(password);
  return _coolWallet;
};
createWallet.errorHandler = errorHandler;

export default createWallet;
