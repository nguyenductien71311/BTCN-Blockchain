import Block from "./Block.ts";
import { getCurrentTime } from "@/helpers/index.ts";

class BlockChain {
  chain: Block[];
  difficulty: number;
  miningReward: number;
  validators: any;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; 
    this.miningReward = 100;
    this.validators = {};
  }

  createGenesisBlock() {
    return new Block(getCurrentTime(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getLatestIndex() {
    return this.chain.length - 1;
  }

  addValidator(address: string, stake: any) {
    this.validators[address] = stake;
  }

  chooseValidator(): string {
    const sumOfStakes: any = Object.values(this.validators).reduce(
      (sum: any, stake: any) => sum + stake,
      0
    );

    const rand = Math.random() * sumOfStakes;
    let cumulativeSum: any = 0;

    for (const [address, stake] of Object.entries(this.validators)) {
      cumulativeSum += stake;
      if (rand < cumulativeSum) {
        return address;
      }
    }

    return "";
  }

  addBlock(data: any): void {
    const newBlock = new Block(
      getCurrentTime(),
      data,
      this.getLatestBlock().hash,
      this.chooseValidator()
    );

    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.caculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

export default BlockChain;
