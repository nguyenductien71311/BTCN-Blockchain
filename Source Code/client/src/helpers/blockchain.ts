import elliptic from "elliptic";
import { BlockChainType, BlockType, TransactionType } from "@/types";

export const getLatestBlock = (MyCoin: BlockChainType): BlockType | null => {
  if (MyCoin.chain) return MyCoin.chain[MyCoin.chain.length - 1];

  return null;
};

export const getWalletAddress = (privateKey: string) => {
  const ec = new elliptic.ec("secp256k1");

  const myKey = ec.keyFromPrivate(privateKey);

  const myWalletAddress = myKey.getPublic("hex");

  return myWalletAddress;
};

export const getAllTransactions = (MyCoin: BlockChainType) => {
  const result: TransactionType[] = [];

  if (!MyCoin?.chain?.length) return [];

  for (let i = 0; i < MyCoin?.chain?.length; ++i) {
    if (MyCoin?.chain[i].transactions === "Genesis block") {
      const transaction: TransactionType = MyCoin?.chain[i].transactions;
      result.push(transaction);
    } else if (
      MyCoin?.chain[i].transactions !== "Genesis block" &&
      !Array.isArray(MyCoin?.chain[i].transactions)
    ) {
      const transaction: TransactionType = MyCoin?.chain[i].transactions;
      result.push(transaction);
    } else if (
      MyCoin?.chain[i].transactions !== "Genesis block" &&
      Array.isArray(MyCoin?.chain[i].transactions)
    ) {
      const transactions: TransactionType[] = MyCoin?.chain[i].transactions;
      for (let j = 0; j < transactions?.length; ++j) {
        result.push(transactions[j]);
      }
    }
  }

  return result;
};

export const chooseValidator = (validators: any): string => {
  const sumOfStakes: any = Object.values(validators).reduce(
    (sum: any, stake: any) => sum + stake,
    0
  ); // Tổng số lượng stake của tất cả validators

  const rand = Math.random() * sumOfStakes; // Chọn một giá trị ngẫu nhiên trong tổng stake
  let cumulativeSum: any = 0;

  // Lựa chọn validator dựa trên xác suất tỉ lệ với stake của họ
  for (const [address, stake] of Object.entries(validators)) {
    cumulativeSum += stake;
    if (rand < cumulativeSum) {
      return address;
    }
  }

  return ""; // Trường hợp không có validator nào được chọn
};

export const formatStakeFromCoin = () => {
  return { address: 100 };
};
