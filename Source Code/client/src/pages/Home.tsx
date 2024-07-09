import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GiWallet } from "react-icons/gi";
import { FaUnlockAlt, FaLongArrowAltRight } from "react-icons/fa";
import { PiCallBellBold } from "react-icons/pi";

const Home = () => {
  return (
    <div className="bg-slate-950">
      <section className="mx-auto max-w-screen-xl px-6 py-[75px] flex flex-wrap gap-5 justify-between">
        <div>
          <h1 className="text-[50px] text-primary-green font-bold">
            Ehtereum Wallet
          </h1>
          <p className="mt-5 max-w-[550px] text-gray-400 text-justify text-lg">
            Discover the power of Ethereum – secure your assets, enjoy transparent transactions, and access the world of decentralized applications.
          </p>
        </div>
        <div>
          <img
            className="w-1/2"
            src="./assets/ethereum-wallet.png"
            alt="article-1"
          />
        </div>
      </section>
      <section className="mx-auto max-w-screen-xl p-6 pb-10 flex flex-wrap gap-5 justify-between">
        <Link to="/create-wallet">
          <div
            className="h-[100%] w-[100%] md:w-[550px] xl:w-[600px] bg-blue-400 text-white p-6 rounded-md flex gap-8 justify-between
                          hover:cursor-pointer hover:translate-y-1"
          >
            <div className="flex items-center">
              <GiWallet size={60} />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold">Create A New Wallet</h1>
                <p className="my-3 pr-40  ">
                  Generate your own Ethereum wallet.
                </p>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <p>Get Started</p>
                <FaLongArrowAltRight size={20} />
              </div>
            </div>
          </div>
        </Link>
        <Link to="/access-wallet">
          <div
            className="h-[100%] w-[100%] md:w-[550px] xl:w-[600px] bg-indigo-500 text-white p-6 rounded-md flex gap-8 justify-between
                          hover:cursor-pointer hover:translate-y-1"
          >
            <div className="flex items-center">
              <FaUnlockAlt size={60} />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold pb-3">Access Your Wallet</h1>
                <p>
                  Connect to the blockchain using the wallet of your choice.
                </p>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <p>Get Started</p>
                <FaLongArrowAltRight size={20} />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Home;
