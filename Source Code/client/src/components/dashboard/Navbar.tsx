import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEthereum, FaUserCircle } from "react-icons/fa";

import { TransactionType, WalletType } from "@/types";
import { buyCoin } from "@/redux/actions/blockchain.action";
import { addCoin } from "@/redux/actions/user.action";

interface BuyEthFormType {
  amount: string;
}

const Navbar = () => {
  const userWallet = useSelector<RootState, WalletType | null>(
    (state) => state.users.wallet
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buyEthForm, setBuyEthForm] = useState<BuyEthFormType>({
    amount: "",
  });
  const [openBuyEthForm, setOpenBuyEthForm] = useState<boolean>(false);

  const handleBuyEth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount: number = Number(buyEthForm?.amount);

    if (!amount) {
      toast.error("Please input amount");
      return;
    }

    if (userWallet?.address) {
      const newTransaction: TransactionType = {
        fromAddress: "MyCoin System",
        toAddress: userWallet?.address,
        amount: amount,
      };

      dispatch(buyCoin(newTransaction));
      dispatch(addCoin(amount));

      toast.success("Buy coin successfully");
    }

    setOpenBuyEthForm(false);
    setBuyEthForm({
      amount: "",
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("wallet");
    navigate("/");
    toast.success("Log out successfully");
  };

  return (
    <div className="fixed z-10 w-full h-[60px] bg-white flex items-center justify-around p-4">
      <Link to="/dashboard">
        <div className="w-[120px]">
          <img className="w-[100%]" src="../assets/logo-mew.png" alt="logo" />
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Dialog open={openBuyEthForm} onOpenChange={setOpenBuyEthForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" variant="outline">
              <FaEthereum size={20} />
              <p>Buy ETH</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                handleBuyEth(e);
              }}
            >
              <DialogHeader>
                <DialogTitle>Buy ETH</DialogTitle>
                <DialogDescription>
                  Buy Ethereum coin for your wallet.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <p>Amount</p>
                  <Input
                    id="amount"
                    className="col-span-3"
                    value={buyEthForm.amount}
                    onChange={(e) => {
                      setBuyEthForm({
                        ...buyEthForm,
                        amount: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <p>Address</p>
                  <Input
                    disabled
                    defaultValue={userWallet?.address}
                    id="address"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Buy</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <div className="hover:cursor-pointer">
              <FaUserCircle size={30} />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <Button
                className="w-[100%]"
                variant="destructive"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
