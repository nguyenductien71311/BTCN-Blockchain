import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

export default function HomeLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
