import web3 from 'web3';

const isAddress = address => {
  return (
    address && web3.utils.isHexStrict(address) && web3.utils.isAddress(address)
  );
};
const toChecksumAddress = address => {
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
