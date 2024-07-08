import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { BlockChainType, BlockType, TransactionType } from "@/types";
import {
  addNewBlock,
  buyCoin,
  clearLastestBlock,
  clearLastestTransactions,
  createTransaction,
  setChain,
  pendingTransactions,
  updateValidators,
} from "../actions/blockchain.action";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxthunk.type";

import { getCurrentTime } from "@/helpers";
import { caculateHash } from "@/helpers/block";
import { getLatestBlock } from "@/helpers/blockchain";

// Interface declair
interface UserState {
  isLoading: boolean;
  isError: boolean;
  MyCoin: BlockChainType;
  lastestBlock: BlockType | null;
  lastestTransactions: TransactionType[];
}

export const getAllBlocks = createAsyncThunk(
  "blockchains/getAllBlocks",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const response = await axios.get<BlockType[]>(
        `${import.meta.env.VITE_API_URL}/blockchain/blocks`,
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({ message: "Get all blocks failed" });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "blockchains/getAllTransactions",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TransactionType[]>(
        `${import.meta.env.VITE_API_URL}/blockchain/transactions`,
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Get all transactions failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewBlock = createAsyncThunk(
  "blockchains/createGenesisBlock",
  async (newBlock: BlockType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blockchain/create-block`,
        {
          ...newBlock,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Create new block failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewTransaction = createAsyncThunk(
  "blockchains/createNewTransaction",
  async (newTransaction: TransactionType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blockchain/create-transaction`,
        {
          ...newTransaction,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError" && error.status === 400) {
        return thunkAPI.rejectWithValue({
          message: error?.response?.data?.message,
        });
      }

      if (error.name === "AxiosError" && error.status !== 400) {
        return thunkAPI.rejectWithValue({
          message: "Create new transaction failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionsByAddress = createAsyncThunk(
  "blockchains/getTransactionsByAddress",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (address: string, thunkAPI) => {
    try {
      const response = await axios.get<TransactionType[]>(
        `${import.meta.env.VITE_API_URL}/blockchain/transactions/${address}`,
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Get transactions by address failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// InitialState value
// const genesisBlock: BlockType = {
//   timestamp: getCurrentTime(),
//   transactions: "Genesis block",
//   previousHash: "0",
//   hash: caculateHash("0", getCurrentTime(), "Genesis block", 0),
//   nonce: 0,
// };

const initialState: UserState = {
  isLoading: false,
  isError: false,
  MyCoin: {
    chain: [],
    difficulty: 3,
    miningReward: 100,
    validators: null,
    transactions: [],
  },
  lastestBlock: null,
  lastestTransactions: [],
};

const blockchainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setChain, (state, action) => {
      const newChains: BlockType[] = action?.payload;
      state.MyCoin.chain = newChains;
    })
    .addCase(addNewBlock, (state, action: any) => {
      const newBlock: BlockType = action?.payload;

      const lastestBlock = getLatestBlock(state.MyCoin);

      if (lastestBlock && state.MyCoin.difficulty) {
        newBlock.previousHash = lastestBlock.hash;

        if (newBlock.previousHash && newBlock.validator) {
          newBlock.hash = caculateHash(
            newBlock.previousHash,
            getCurrentTime(),
            newBlock.transactions,
            newBlock.validator
          );

          // mineBlock(state.MyCoin.difficulty, newBlock);

          state.MyCoin.chain?.push(newBlock);
        }
      }
    })
    .addCase(pendingTransactions, (state, action: any) => {
      const sendAddress: any = action?.payload.sendAddress;
      const validator: any = action?.payload.validator;
      console.log("Send address:", sendAddress);
      console.log("Validator:", validator);

      const lastestBlock = getLatestBlock(state.MyCoin);

      if (lastestBlock?.hash && state.MyCoin.difficulty) {
        const block: BlockType | any = {
          timestamp: getCurrentTime(),
          transactions: state.MyCoin.transactions,
          previousHash: lastestBlock.hash,
          validator: validator,
        };

        block.hash = caculateHash(
          lastestBlock.hash,
          getCurrentTime(),
          block.transactions,
          block.validator
        );

        // mineBlock(state.MyCoin.difficulty, block);

        // console.log("Block successfully mined!", block);
        state.MyCoin.chain?.push(block);

        state.lastestBlock = block;
        state.lastestTransactions = block?.transactions;
      }
    })
    .addCase(createTransaction, (state, action) => {
      const transaction: TransactionType = action?.payload;

      state.MyCoin.transactions?.push(transaction);
    })
    .addCase(buyCoin, (state, action) => {
      const transaction: TransactionType = action?.payload;

      const lastestBlock = getLatestBlock(state.MyCoin);

      if (lastestBlock?.hash && state.MyCoin.difficulty) {
        const block: BlockType | any = {
          timestamp: getCurrentTime(),
          transactions: transaction,
          previousHash: lastestBlock.hash,
          validator: "MyCoin System",
        };

        block.hash = caculateHash(
          lastestBlock.hash,
          getCurrentTime(),
          block.transactions,
          block.validator
        );

        // mineBlock(state.MyCoin.difficulty, block);

        // console.log("Block successfully mined!", block);
        state.MyCoin.chain?.push(block);
        state.lastestBlock = block;
        state.lastestTransactions.push(transaction);
      }
    })
    .addCase(updateValidators, (state, action) => {
      const validators: any = action?.payload;

      state.MyCoin.validators = validators;
    })
    .addCase(clearLastestBlock, (state) => {
      state.lastestBlock = null;
    })
    .addCase(clearLastestTransactions, (state) => {
      state.lastestTransactions = [];
    })
    .addMatcher(
      (action): action is PendingAction => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      (action): action is FulfilledAction => action.type.endsWith("/fulfilled"),
      (state) => {
        state.isLoading = false;
        state.isError = false;
      }
    )
    .addMatcher(
      (action): action is RejectedAction => action.type.endsWith("/rejected"),
      (state) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
});

export default blockchainReducer;
