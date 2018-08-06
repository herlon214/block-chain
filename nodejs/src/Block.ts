import { SHA256 } from 'crypto-js';

class Block {
  public index: number;
  public timestamp: Date;
  public data: any;
  public previousHash: string;
  public hash: string;

  constructor(
    index: number,
    timestamp: Date,
    data: any,
    previousHash: string = '',
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp.toString() +
        JSON.stringify(this.data) +
        this.previousHash,
    ).toString();
  }
}

export default Block;
