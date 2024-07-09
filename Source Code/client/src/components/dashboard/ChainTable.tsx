import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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

import { BlockChainType, BlockType } from "@/types";
import { arrayRange } from "@/helpers";

const ChainTable = () => {
  const ITEMS_PER_PAGE: number = 5;

  const [chainsPerPage, setChainsPerPage] = useState<BlockType[]>([]);
  const [pagination, setPagination] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  const MyCoin = useSelector<RootState, BlockChainType>(
    (state) => state.blockchains.MyCoin
  );

  const handleCountPages = () => {
    if (MyCoin?.chain?.length) {
      const pageCount = Math.ceil(MyCoin?.chain?.length / ITEMS_PER_PAGE);
      setPagination(arrayRange(1, pageCount, 1));
    }
  };

  const handleGetChainsPerPage = (n: number) => {
    const begin = (n - 1) * ITEMS_PER_PAGE;
    const end = (n - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;

    if (MyCoin?.chain?.slice) {
      const items = MyCoin?.chain?.slice(begin, end);
      setChainsPerPage(items);
    }
  };

  useEffect(() => {
    handleCountPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainsPerPage]);

  useEffect(() => {
    handleGetChainsPerPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetChainsPerPage(activePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MyCoin?.chain, activePage]);

  return (
    <div className="w-[300px] sm:w-[500px] lg:w-full bg-slate-950 p-4 flex flex-col gap-5 rounded-md">
      <div className="mx-auto my-5 flex flex-wrap items-center gap-5">
        <h1 className="text-3xl font-bold text-primary-green">Chains</h1>
        <div></div>
      </div>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Hash</TableHead>
            <TableHead className="w-[300px]">Previous hash</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Block detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chainsPerPage?.map((block: BlockType) => {
            return (
              <TableRow key={block?.hash}>
                <TableCell className="font-medium max-w-[300px] truncate">
                  {block?.hash}
                </TableCell>
                <TableCell className="font-medium max-w-[300px] truncate">
                  {block?.previousHash}
                </TableCell>
                <TableCell>{block?.timestamp}</TableCell>
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
                        <p className="text-primary-green">Block detail</p>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-5 text-white">
                      <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                        <h1 className="text-xl font-bold">Hash</h1>
                        <p className="max-w-[300px] md:max-w-full truncate">
                          {block?.hash}
                        </p>
                      </div>
                      <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                        <h1 className="text-xl font-bold">Previous hash</h1>
                        <p className="max-w-[300px] md:max-w-full truncate">
                          {block?.previousHash}
                        </p>
                      </div>
                      <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                        <h1 className="text-xl font-bold">Validator</h1>
                        <p className="max-w-[300px] md:max-w-[800px] truncate">
                          {block?.validator}
                        </p>
                      </div>
                      <div className="w-[100%] p-2 rounded-md border border-gray-300 flex flex-col gap-3">
                        <h1 className="text-xl font-bold">Timestamp</h1>
                        <p className="max-w-[300px] md:max-w-full truncate">
                          {block?.timestamp}
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
  );
};

export default ChainTable;
