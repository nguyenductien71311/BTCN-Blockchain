import elliptic from "elliptic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { Button } from "./ui/button.tsx";
import {
  addNewBlock,
  createTransaction,
} from "@/redux/actions/blockchain.action.ts";
import { getCurrentTime } from "@/helpers/index.ts";
import { signTransaction } from "@/helpers/transaction.ts";

import BlockCpn from "./BlockCpn.tsx";
import {
  BlockChainType,
  BlockType,
  TransactionType,
  WalletType,
} from "@/types/index.ts";

const DisplayTest = () => {
  const dispatch = useDispatch();

  const userWallet = useSelector<RootState, WalletType | null>(
    (state) => state.users.wallet
  );

  const MyCoin = useSelector<RootState, BlockChainType>(
    (state) => state.blockchains.MyCoin
  );

  const handleAddBlock = () => {
    const newBlock: BlockType = {
      timestamp: getCurrentTime(),
      transactions: { amount: 100 },
    };

    dispatch(addNewBlock(newBlock));
  };

  const handleAddNewTransaction = () => {
    const ec = new elliptic.ec("secp256k1");
    const myWalletAddress = userWallet?.address;
    const myWalletPrivateKey = userWallet?.privateKey;

    if (myWalletAddress && myWalletPrivateKey) {
      const myKey = ec.keyFromPrivate(myWalletPrivateKey);

      const tx1: TransactionType = {
        fromAddress: myWalletAddress,
        toAddress: "address-1",
        amount: 10,
      };

      signTransaction(tx1, myKey);
      dispatch(createTransaction(tx1));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={handleAddBlock}>
          Add Block
        </Button>
        <Button variant="outline" onClick={handleAddNewTransaction}>
          Add Transaction
        </Button>
      </div>
      {MyCoin.chain?.map((block: BlockType) => {
        return <BlockCpn key={block.hash} block={block} />;
      })}
    </div>
  );
};

export default DisplayTest;
