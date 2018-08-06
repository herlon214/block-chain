import BlockChain from './BlockChain';

let coin = new BlockChain();

// Insert some blocks
coin.addBlock({ type: 'transfer', amount: 10, to: 'Bob' });
coin.addBlock({ type: 'transfer', amount: 3, to: 'Sam' });
coin.addBlock({ type: 'transfer', amount: 50, to: 'John' });
coin.addBlock({ type: 'withdraw', amount: 10, to: 'Bob' });

// Get blockchain summary
console.log(coin.summary());

// Change some block
console.log(`Changing data...`);
coin.chain[2].data = { type: 'transfer', amount: 300, to: 'Sam' };
coin.chain[2].hash = coin.chain[2].calculateHash();

// Get blockchain summary, it will show as invalid because
// data is not consistent anymore
console.log(coin.summary());