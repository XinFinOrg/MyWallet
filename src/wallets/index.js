import {
  LedgerWallet,
  TrezorWallet,
  BitBoxWallet,
  BitBox02Wallet,
  SecalotWallet,
  KeepkeyWallet,
  BCVaultWallet,
  CoolWallet,
  BitfiWallet
} from './hardware';
import WalletInterface from './WalletInterface';
import { MnemonicWallet } from './software';
import {
  MewConnectWallet,
  WalletConnectWallet,
  WalletLinkWallet
} from './hybrid';

export {
  BitfiWallet,
  LedgerWallet,
  TrezorWallet,
  BitBoxWallet,
  BitBox02Wallet,
  SecalotWallet,
  KeepkeyWallet,
  CoolWallet,
  MewConnectWallet,
  WalletConnectWallet,
  WalletLinkWallet,
  WalletInterface,
  MnemonicWallet,
  BCVaultWallet
};
