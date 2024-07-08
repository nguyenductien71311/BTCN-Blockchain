import { Outlet } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
import Slidebar from "../dashboard/Slidebar";
import WalletProvider from "../providers/WalletProvider";
import BlockChainProvider from "../providers/BlockChainProvider";

export default function DashboardLayout() {
  return (
    <WalletProvider>
      <BlockChainProvider>
        <div className="min-h-screen bg-primary-gray">
          <Navbar />
          <div className="flex">
            <Slidebar />
            <div className="ml-[80px] md:ml-[250px] w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </BlockChainProvider>
    </WalletProvider>
  );
}
