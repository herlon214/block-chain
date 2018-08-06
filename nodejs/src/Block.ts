import { SHA256 } from 'crypto-js';

class Block {
  public index: number;
  public timestamp: Date;
  public data: any;
  public previousHash: string;
  public hash: string;
  public difficulty: number;
  private nonce = 0;

  constructor(
    index: number,
    timestamp: Date,
    data: any,
    previousHash: string = '',
    difficulty: number,
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp.toString() +
        JSON.stringify(this.data) +
        this.previousHash +
        this.nonce,
    ).toString();
  }

  mine() {
    while (
      this.hash.substring(0, this.difficulty) !==
      Array(this.difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export default Block;
