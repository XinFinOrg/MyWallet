import web3 from 'web3';
import store from '@/core/store';
import { ROOTSTOCK } from '@/utils/networks/types';
import {
  toChecksumAddress as toChecksumAddr,
  isValidChecksumAddress
} from 'ethereumjs-util';

const isAddress = address => {
  const chainId = store.getters['global/network'].type.chainID;

  if (chainId === ROOTSTOCK.chainID) {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
      // If it's ALL lowercase or ALL upppercase
    } else if (
      /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
      /^(0x|0X)?[0-9A-F]{40}$/.test(address)
    ) {
      return true;
      // Otherwise check each case
    }

    return isValidChecksumAddress(address, chainId);
  }

  return (
    address && web3.utils.isHexStrict(address) && web3.utils.isAddress(address)
  );
};
const toChecksumAddress = address => {
  const chainId = store.getters['global/network'].type.chainID;
  // Use EIP-1191 Address Checksum if its Rootstock network
  if (chainId === ROOTSTOCK.chainID) {
    return toChecksumAddr(address, chainId);
  }

  return web3.utils.toChecksumAddress(address);
};
const isXDCAddress = (address = '') => {
  const prefix = address?.slice(0, 3);
  if (prefix.toLowerCase() === 'xdc') address = '0x' + address.substring(3);
  return !!address && isAddress(address);
};
const getXDCAddress = (address = '') => {
  const prefix = address?.slice(0, 2);
  return prefix.toLowerCase() === '0x' ? 'xdc' + address.substring(2) : address;
};
const get0xAddress = (address = '') => {
  const prefix = address?.slice(0, 3);
  return prefix.toLowerCase() === 'xdc' ? '0x' + address.substring(3) : address;
};

export {
  isAddress,
  toChecksumAddress,
  isXDCAddress,
  getXDCAddress,
  get0xAddress
};
