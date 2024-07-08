import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUserCircle, FaEthereum } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { BiTransfer } from "react-icons/bi";
import { PiDotsThreeCircle } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import ChainTable from "@/components/dashboard/ChainTable";
import TransactionTable from "@/components/dashboard/TransactionTable";

import { WalletType } from "@/types";

const Dashboard = () => {
  const userWallet = useSelector<RootState, WalletType | null>(
    (state) => state.users.wallet
  );

  const userEth = useSelector<RootState, number>((state) => state.users.eth);

  return (
    <div className="mt-[60px] p-6 flex flex-col gap-10">
      <div className="mb-10 flex flex-wrap gap-5 items-center">
        <div className="w-[100%] md:w-[400px] h-[150px] bg-[#285BC1] text-white p-6 rounded-md flex gap-5">
          <FaUserCircle className="my-auto" size={50} />
          <div className="w-[80%]">
            <h1 className="text-2xl font-bold">Address</h1>
            <p className="max-w-[200px] md:max-w-[300px] truncate">
              {userWallet?.address}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-3">
                  <PiDotsThreeCircle size={40} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Wallet Detail Information</DialogTitle>
                  <DialogDescription>
                    Here is your wallet information, use it for transaction.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-primary-green font-bold">
                      Wallet address
                    </h1>
                    <Input defaultValue={userWallet?.address} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-red-500 font-bold">Private key</h1>
                    <Input defaultValue={userWallet?.privateKey} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-[100%] md:w-[400px] h-[150px] bg-[#22A1DD] text-white p-6 rounded-md flex gap-5">
          <GiWallet className="my-auto" size={50} />
          <div className="w-[80%]">
            <h1 className="text-2xl font-bold">Balance</h1>
            <p className="max-w-[200px] md:max-w-[300px] truncate">
              {userEth} ETH
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] 2xl:w-full overflow-x-auto flex flex-col gap-10">
        <ChainTable />
        <TransactionTable walletAddress={null} />
      </div>
    </div>
  );
};

export default Dashboard;
