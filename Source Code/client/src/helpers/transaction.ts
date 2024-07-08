import SHA256 from "crypto-js/sha256";
import { TransactionType } from "@/types";

export const caculateHash = (transaction: TransactionType) => {
  if (transaction.fromAddress && transaction.toAddress)
    return SHA256(
      transaction.fromAddress + transaction.toAddress + transaction.amount
    ).toString();

  return "";
};

export const signTransaction = (
  transaction: TransactionType,
  signingKey: any
) => {
  if (signingKey.getPublic("hex") !== transaction.fromAddress) {
    throw new Error("You cannot sign transactions for other wallets");
  }

  const hashTx = caculateHash(transaction);
  const sig = signingKey.sign(hashTx, "base64");
  transaction.signature = sig.toDER("hex");
};
