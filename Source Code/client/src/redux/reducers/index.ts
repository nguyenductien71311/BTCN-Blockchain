import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import blockchainReducer from "./blockchain.reducer";

export const rootReducer = combineReducers({
  users: userReducer,
  blockchains: blockchainReducer,
});
