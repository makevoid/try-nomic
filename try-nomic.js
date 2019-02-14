const lotion = require('lotion')
const bitcoin = require('bitcoinjs-lib')
const bitcoinPeg = require('bitcoin-peg')
const coins = require('coins')
const webcoin = require('webcoin')

let app = lotion({
  initialState: {
    count: 0
  }
})

// app.use(function(state, tx) {
//   console.log(tx)
//   if (state.count === tx.nonce) {
//     console.log(tx)
//     state.count++
//   }
// })
//
// app.start()
//
// let app = lotion({
//     initialState: {
//       txCount: 0,
//       blockCount: 0,
//       word: ''
//     },
//     rpcPort,
//     p2pPort,
//     genesisPath,
//     peers,
//     true
// })

// create a token using `coins` to be pegged to Bitcoin
app.use('pbtc', coins({
  handlers: {
    bitcoin: bitcoinPeg.coinsHandler('bitcoin')
  }
}))

// pick a Bitcoin (or testnet) block header to use as the checkpoint
// bitcoin mainchain
// bits 388919176
let checkpoint = {
  version: 536870912,
  prevHash: Buffer.from('00000000000000000010d7aa5c15e18b7245d40553782aa873a245a9bf817c9e', 'hex').reverse(),
  merkleRoot: Buffer.from('c0dbf5c088b4ea8bcaeb95d9c2c9dc39f5d756bfe9ae1845131f56b7f619c4db', 'hex').reverse(),
  timestamp: 1550113737,
  bits: 0x172E6F88,
  nonce: 3672617368,
  height: 562954
}

// keep track of the Bitcoin blockchain, and specify the route of the pegged token
app.use('bitcoin', bitcoinPeg(checkpoint, 'pbtc'))

app.start()
  .then((res) => console.log(res))
