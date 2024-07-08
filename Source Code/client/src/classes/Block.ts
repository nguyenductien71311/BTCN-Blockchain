import SHA256 from "crypto-js/sha256";

class Block {
  timestamp: string;
  transactions: any;
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;

  constructor(
    timestamp: string,
    transactions: any,
    previousHash = "",
    validator = ""
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.caculateHash();
    this.nonce = 0;
    this.validator = validator;
  }

  caculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce +
        this.validator
    ).toString();
  }
}

export default Block;
