import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxthunk.type";
import { WalletType } from "@/types";

import { addCoin, setWallet, reduceCoin } from "../actions/user.action";

// Interface declair
interface UserState {
  isLoading: boolean;
  isError: boolean;
  wallet: WalletType | null;
  eth: number;
}

// createAsyncThunk middleware
export const createNewWallet = createAsyncThunk(
  "users/addNewWallet",
  async (wallet: WalletType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wallet/create`,
        {
          ...wallet,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Create new wallet failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accessKeyStore = createAsyncThunk(
  "users/addNewWallet",
  async (wallet: WalletType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wallet/access-keystore`,
        {
          ...wallet,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Access wallet keystore failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accessPrivateKey = createAsyncThunk(
  "users/accessPrivateKey",
  async (privateKey: string, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wallet/access-privatekey`,
        {
          privateKey,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({
          message: "Access wallet private key failed",
        });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWalletCoins = createAsyncThunk(
  "users/getWalletCoins",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (data: { address: string; type: string }, thunkAPI) => {
    try {
      const response = await axios.get<any>(
        `${import.meta.env.VITE_API_URL}/wallet/coin`,
        {
          signal: thunkAPI.signal,
          headers: {
            ["wallet-address"]: data?.address,
            ["wallet-type"]: data?.type,
          },
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

export const getAllWalletCoins = createAsyncThunk(
  "users/getAllWalletCoins",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (data: { type: string }, thunkAPI) => {
    try {
      const response = await axios.get<any>(
        `${import.meta.env.VITE_API_URL}/wallet/all-coin`,
        {
          signal: thunkAPI.signal,
          headers: {
            ["wallet-type"]: data?.type,
          },
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

// InitialState value
const initialState: UserState = {
  isLoading: false,
  isError: false,
  wallet: null,
  eth: 0,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setWallet, (state, action) => {
      const wallet: WalletType = action?.payload;
      state.wallet = wallet;
    })
    .addCase(addCoin, (state, action) => {
      const amount: number = action?.payload;
      state.eth += amount;
    })
    .addCase(reduceCoin, (state, action) => {
      const amount: number = action?.payload;
      state.eth -= amount;
    })
    .addCase(getWalletCoins.fulfilled, (state, action) => {
      const walletCoin = action?.payload;
      state.eth = walletCoin?.coin;
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

export default userReducer;
