import SHA256 from "crypto-js/sha256";
import elliptic from "elliptic";

class Transaction {
  fromAddress: string | null;
  toAddress: string | null;
  amount: number;
  signature: string;

  constructor(
    fromAddress: string | null,
    toAddress: string | null,
    amount: number
  ) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.signature = "";
  }

  caculateHash() {
    if (this.fromAddress && this.toAddress)
      return SHA256(this.fromAddress + this.toAddress + this.amount).toString();

    return "";
  }

  signTransaction(signingKey: any) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets");
    }

    const hashTx = this.caculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    const ec = new elliptic.ec("secp256k1");
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");

    return publicKey.verify(this.caculateHash(), this.signature);
  }
}

export default Transaction;
