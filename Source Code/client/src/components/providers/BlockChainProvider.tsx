import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import {
  createNewBlock,
  createNewTransaction,
  getAllBlocks,
  getAllTransactions,
} from "@/redux/reducers/blockchain.reducer";
import { toast } from "react-toastify";
import { getCurrentTime } from "@/helpers";
import { caculateHash } from "@/helpers/block";
import {
  clearLastestBlock,
  clearLastestTransactions,
  setChain,
} from "@/redux/actions/blockchain.action";
import { reduceCoin } from "@/redux/actions/user.action";
import { BlockType, TransactionType, WalletType } from "@/types";
import { getWalletCoins } from "@/redux/reducers/user.reducer";

interface PropType {
  children: React.ReactElement;
}

const BlockChainProvider = (props: PropType) => {
  const { children } = props;

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const userWallet = useSelector<RootState, WalletType | null>(
    (state) => state.users.wallet
  );

  const lastestBlock = useSelector<RootState, BlockType | null>(
    (state) => state.blockchains.lastestBlock
  );

  const lastestTransactions = useSelector<RootState, TransactionType[]>(
    (state) => state.blockchains.lastestTransactions
  );

  const handleCreateNewChain = async (
    block: BlockType,
    transactions: TransactionType[]
  ) => {
    try {
      await dispatchAsync(createNewBlock(block)).unwrap();

      for (let i = 0; i < transactions?.length; ++i) {
        const trans: TransactionType = {
          blockHash: block?.hash,
          fromAddress: transactions[i].fromAddress,
          toAddress: transactions[i].toAddress,
          amount: transactions[i].amount,
          signature: transactions[i].signature
            ? transactions[i].signature
            : "Get system coin",
        };

        dispatch(reduceCoin(trans.amount ? trans.amount : 0));

        await dispatchAsync(createNewTransaction(trans)).unwrap();
      }

      toast.success("Send transaction successfully");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (lastestBlock && lastestTransactions?.length !== 0) {
      console.log(lastestBlock);
      console.log(lastestTransactions);

      handleCreateNewChain(lastestBlock, lastestTransactions);

      // Clear lastest
      dispatch(clearLastestBlock());
      dispatch(clearLastestTransactions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastestBlock, lastestTransactions]);

  const handleInitGenesisBlock = async () => {
    const chains: BlockType[] = await dispatchAsync(getAllBlocks()).unwrap();
    const trans: TransactionType[] = await dispatchAsync(
      getAllTransactions()
    ).unwrap();

    if (chains?.length === 0) {
      const genesisBlock: BlockType = {
        timestamp: getCurrentTime(),
        transactions: "Genesis block",
        previousHash: "0",
        hash: caculateHash("0", getCurrentTime(), "Genesis block", "0"),
        // nonce: 0,
        validator: "MyCoin System",
      };

      const genesisTransaction: TransactionType = {
        blockHash: genesisBlock?.hash,
        fromAddress: "null",
        toAddress: "null",
        amount: 0,
        signature: "Genesis block",
      };

      const blockRes = await dispatchAsync(
        createNewBlock(genesisBlock)
      ).unwrap();

      const transactionRes = await dispatchAsync(
        createNewTransaction(genesisTransaction)
      ).unwrap();

      const newChains: BlockType[] = [];
      blockRes.transactions = transactionRes?.signature;
      newChains.push(blockRes);

      dispatch(setChain(newChains));
    } else {
      const newChains: BlockType[] = [];

      const genesisBlock: BlockType = chains[0];
      const genesisTransaction: TransactionType = trans[0];

      // const genesisInit: BlockType = {
      //   ...genesisBlock,
      //   transactions: genesisTransaction?.signature,
      // };

      genesisBlock.transactions = genesisTransaction?.signature;
      newChains.push(genesisBlock);

      for (let i = 1; i < chains.length; ++i) {
        const chainTransactions = [];

        for (let j = 1; j < trans.length; ++j) {
          if (trans[j].blockHash === chains[i].hash) {
            chainTransactions.push(trans[j]);
          }
        }

        chains[i].transactions = chainTransactions;
        newChains.push(chains[i]);
      }

      dispatch(setChain(newChains));
    }
  };

  const handleGetWalletCoin = async () => {
    if (userWallet?.address) {
      const data = {
        address: userWallet?.address,
        type: "ETH",
      };

      await dispatchAsync(getWalletCoins(data)).unwrap();
    }
  };

  useEffect(() => {
    handleInitGenesisBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetWalletCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWallet]);

  return <>{children}</>;
};

export default BlockChainProvider;
