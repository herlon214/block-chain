import Block from './Block';

class BlockChain {
  public chain: Block[];
  private difficulty = 4;

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(
      0,
      new Date('Sun Aug 05 2018 21:49:36 GMT-0400 (Amazon Standard Time)'),
      '{"totalCoins": 1000}',
      '',
      this.difficulty
    );
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: any) {
    const latestBlock = this.getLatestBlock();
    const index = latestBlock.index + 1;
    const timestamp = new Date();

    const block = new Block(index, timestamp, data, latestBlock.hash, this.difficulty);
    block.mine();

    this.chain.push(block);
  }

  isValid (): boolean {
    for(let i = 1; i < this.chain.length; i ++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true
  }

  summary (): string {
    return `@@@@@@ BlockChain Summary @@@@@@\n
    Blocks created: ${this.chain.length}\n
    Lastest hash: ${this.getLatestBlock().hash}\n
    Valid: ${this.isValid()}\n
    --------------------------------------------------------------------`
  }
}

export default BlockChain;
