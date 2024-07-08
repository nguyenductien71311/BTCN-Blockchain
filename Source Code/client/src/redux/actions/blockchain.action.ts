import { BlockType, TransactionType } from "@/types";
import { createAction } from "@reduxjs/toolkit";

export const setChain = createAction<BlockType[]>("blockchains/setChain");
export const addNewBlock = createAction<BlockType>("blockchains/addNewBlock");

export const createTransaction = createAction<TransactionType>(
  "blockchains/createTransaction"
);
export const buyCoin = createAction<TransactionType>("blockchains/buyCoin");
export const clearLastestBlock = createAction("blockchains/clearLastestBlock");
export const clearLastestTransactions = createAction(
  "blockchains/clearLastestTransactions"
);
export const pendingTransactions = createAction<any>(
  "blockchains/pendingTransactions"
);
export const updateValidators = createAction<string>(
  "blockchains/updateValidators"
);
