import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "@/components/layouts/HomeLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Send from "@/pages/Send";
import History from "@/pages/History";
import CreateWallet from "@/pages/CreateWallet";
import AccessWallet from "@/pages/AccessWallet";
import NotFound from "@/pages/NotFound";

import { MY_ROUTE } from "./router.constant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: MY_ROUTE.HOME, element: <Home /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: MY_ROUTE.DASHBOARD, element: <Dashboard /> }],
  },
  {
    path: "/dashboard/send",
    element: <DashboardLayout />,
    children: [{ path: MY_ROUTE.DASHBOARD_SEND, element: <Send /> }],
  },
  {
    path: "/dashboard/history",
    element: <DashboardLayout />,
    children: [{ path: MY_ROUTE.DASHBOARD_HISTORY, element: <History /> }],
  },
  {
    path: "/create-wallet",
    element: <HomeLayout />,
    children: [{ path: MY_ROUTE.CREATE_WALLET, element: <CreateWallet /> }],
  },
  {
    path: "/access-wallet",
    element: <HomeLayout />,
    children: [{ path: MY_ROUTE.ACCESS_WALLET, element: <AccessWallet /> }],
  },
  { path: "/*", element: <NotFound /> },
]);
