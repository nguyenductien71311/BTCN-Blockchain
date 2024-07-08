import { BlockType } from "@/types";
import SHA256 from "crypto-js/sha256";

export const caculateHash = (
  previousHash: string,
  timestamp: string,
  transactions: any,
  validator: string
) => {
  return SHA256(
    previousHash + timestamp + JSON.stringify(transactions) + validator
  ).toString();
};

export const mineBlock = (difficulty: number, block: BlockType | any) => {
  while (
    block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
  ) {
    block.nonce++;
    block.hash = caculateHash(
      block.previousHash,
      block.timestamp,
      block.transactions,
      block.nonce
    );
  }
};
