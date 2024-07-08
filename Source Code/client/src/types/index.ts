export interface WalletType {
  address?: string;
  publicKey?: string;
  privateKey?: string;
  password?: string;
}

export interface BlockType {
  timestamp?: string;
  transactions?: any;
  previousHash?: string;
  hash?: string;
  validator?: string;
}

export interface TransactionType {
  blockHash?: string;
  fromAddress?: string | null;
  toAddress?: string | null;
  amount?: number;
  signature?: string;
}

export interface BlockChainType {
  chain?: BlockType[];
  difficulty?: number;
  transactions?: TransactionType[];
  miningReward?: number;
  validators?: any;
}
