
const Web3 = require('web3');
var url = 'https://rpc.apothem.network';
const web3 = new Web3(new Web3.providers.HttpProvider(url));

// const txCount = await web3.eth.getTransactionCount(account1)

// // Transaction
//  const txObject = {
//     nonce:    web3.utils.toHex(txCount),
//     to:       account2,
//     value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
//     gasLimit: web3.utils.toHex(21000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
//  }

// // Sign the transaction
// const tx = new Transaction(txObject, { chain: 'ropsten', hardfork: 'istanbul' })
// const pk = Buffer.from(PRIVATE_KEY_ACCOUNT_1, 'hex')
// tx.sign(pk)

// const serializedTx = tx.serialize()
// const raw = '0x' + serializedTx.toString('hex')

 // Broadcast the transaction
 let raw = "0xf86f028209c482520894727de340d8d12d9e5eea45d28d98a490b9596adc8d193e5939a08ce9dbd480000000808189a077777320e3d3ac569835e6f831e3abba438c67cc497152d4ab0204ddda36f3b3a01dbf690d2b27e7356efd29227483e9f2896e0e1bc25617d17a1cc8b93c7d6590"
 web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
})