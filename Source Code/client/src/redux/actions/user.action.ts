import { createAction } from "@reduxjs/toolkit";
import { WalletType } from "@/types";

export const setWallet = createAction<WalletType>("users/setWallet");
export const addCoin = createAction<number>("users/addCoin");
export const reduceCoin = createAction<number>("users/reduceCoin");
