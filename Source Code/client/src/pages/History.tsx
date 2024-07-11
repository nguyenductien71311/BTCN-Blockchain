import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { getTransactionsByAddress } from "@/redux/reducers/blockchain.reducer";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { BlockChainType, TransactionType, WalletType } from "@/types";
import { arrayRange } from "@/helpers";

const History = () => {
  const ITEMS_PER_PAGE: number = 5;

  const dispatchAsync = useAppDispatch();

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transPerPage, setTransPerPage] = useState<TransactionType[]>([]);
  const [pagination, setPagination] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  const MyCoin = useSelector<RootState, BlockChainType>(
    (state) => state.blockchains.MyCoin
  );

  const userWallet = useSelector<RootState, WalletType | null>(
    (state) => state.users.wallet
  );

  const handleGetTransactionByAddress = async () => {
    if (userWallet && userWallet?.address) {
      const res = await dispatchAsync(
        getTransactionsByAddress(userWallet?.address)
      ).unwrap();

      setTransactions(res);
    }
  };

  const handleCountPages = () => {
    if (transactions?.length) {
      const pageCount = Math.ceil(transactions?.length / ITEMS_PER_PAGE);
      setPagination(arrayRange(1, pageCount, 1));
    }
  };

  // Pagination handle
  const handleGetTransPerPage = (n: number) => {
    const begin = (n - 1) * ITEMS_PER_PAGE;
    const end = (n - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;

    if (transactions?.slice) {
      const items = transactions?.slice(begin, end);
      setTransPerPage(items);
    }
  };

  useEffect(() => {
    handleGetTransactionByAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MyCoin, userWallet]);

  useEffect(() => {
    handleCountPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, transPerPage]);

  useEffect(() => {
    handleGetTransPerPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  useEffect(() => {
    handleGetTransPerPage(activePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <div className="mt-[60px] p-6 bg-slate-950">
      <img
        className="w-[100%] h-[150px] md:h-[300px] object-cover rounded-md"
        src="/assets/banner-history.png"
        alt="banner-2"
      />
      <div className="w-[300px] sm:w-[500px] lg:w-full p-4 flex flex-col gap-5 rounded-md bg-slate-950">
        <div className="mx-auto my-5 flex items-center gap-5">
          <h1 className="text-3xl font-bold text-primary-green">
            Transactions
          </h1>
          <div></div>
        </div>
        <Table className="text-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">From address</TableHead>
              <TableHead className="w-[300px]">To address</TableHead>
              <TableHead className="w-[300px]">Signature</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Transaction detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transPerPage?.map((transaction: TransactionType | any) => {
              if (transaction === "Genesis block") {
                return (
                  <TableRow key={uuidv4()}>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      null
                    </TableCell>
                    <TableCell className="font-medium max-w-[300px] truncate">
                      null
                    </TableCell>
                    <TableCell>{transaction}</TableCell>
                    <TableCell>null</TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <TableCell>
                          <p className="text-right font-bold text-primary-green hover:cursor-pointer hover:underline hover:underline-offset-2">
                            Click to view detail
                          </p>
                        </TableCell>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90%] lg:max-w-[60%] bg-slate-950">
                        <DialogHeader>
                          <DialogTitle>
                            <p className="text-primary-green">
                              Transaction detail
                            </p>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-5 text-white">
                          <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                            <h1 className="text-xl font-bold">From address</h1>
                            <p className="max-w-[300px] md:max-w-full truncate">
                              null
                            </p>
                          </div>
                          <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                            <h1 className="text-xl font-bold">To address</h1>
                            <p className="max-w-[300px] md:max-w-full truncate">
                              null
                            </p>
                          </div>
                          <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Signature</h1>
                            <p className="max-w-[300px] md:max-w-full truncate">
                              Genesis block
                            </p>
                          </div>
                          <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Amount</h1>
                            <p className="max-w-[300px] md:max-w-full truncate">
                              null
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableRow>
                );
              }

              return (
                <TableRow key={uuidv4()}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {transaction?.fromAddress}
                  </TableCell>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {transaction?.toAddress}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {transaction?.signature
                      ? transaction?.signature
                      : "Get system coin"}
                  </TableCell>
                  <TableCell>{transaction?.amount}</TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <TableCell>
                        <p className="text-right font-bold text-primary-green hover:cursor-pointer hover:underline hover:underline-offset-2">
                          Click to view detail
                        </p>
                      </TableCell>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90%] lg:max-w-[70%] bg-slate-950">
                      <DialogHeader>
                        <DialogTitle>
                          <p className="text-primary-green">
                            Transaction detail
                          </p>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-5 text-white">
                        <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                          <h1 className="text-xl font-bold">From address</h1>
                          <p className="max-w-[300px] md:max-w-[600px] truncate">
                            {transaction?.fromAddress}
                          </p>
                        </div>
                        <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                          <h1 className="text-xl font-bold">To Address</h1>
                          <p className="max-w-[300px] md:max-w-[600px] truncate">
                            {transaction?.toAddress}
                          </p>
                        </div>
                        <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                          <h1 className="text-xl font-bold">Signature</h1>
                          <p className="max-w-[300px] md:max-w-[600px] truncate">
                            {transaction?.signature
                              ? transaction?.signature
                              : "Get system coin"}
                          </p>
                        </div>
                        <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                          <h1 className="text-xl font-bold">Amount</h1>
                          <p className="max-w-[300px] md:max-w-full truncate">
                            {transaction?.amount}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="w-[100%] flex items-center mt-5">
          <Pagination>
            <PaginationContent>
              {pagination?.map((value: number) => {
                return (
                  <PaginationItem
                    key={uuidv4()}
                    onClick={() => {
                      setActivePage(value);
                    }}
                  >
                    <PaginationLink
                      isActive={activePage === value ? true : false}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default History;
