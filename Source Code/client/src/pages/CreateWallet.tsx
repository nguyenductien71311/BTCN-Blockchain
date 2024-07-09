import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import elliptic from "elliptic";
import { generateJSONFile } from "@/helpers";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa";
import { IoMdDownload, IoIosWarning } from "react-icons/io";
import { AiOutlineSafety } from "react-icons/ai";
import { BsIncognito } from "react-icons/bs";
import { LuDatabaseBackup } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { createNewWallet } from "@/redux/reducers/user.reducer";

interface WalletFormType {
  password: string;
}

const CreateWallet = () => {
  const navigate = useNavigate();

  const dispatchAsync = useAppDispatch();

  const ec = new elliptic.ec("secp256k1");

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.users.isLoading
  );

  const [createWalletForm, setCreateWalletForm] = useState<WalletFormType>({
    password: "",
  });
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [isGenerate, setIsGenerate] = useState<boolean>(false);

  const handleCreateNewWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreated(true);
    setIsGenerate(true);

    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");

    const newWallet = {
      address: publicKey,
      publicKey: publicKey,
      privateKey: privateKey,
      password: createWalletForm?.password,
    };

    const walletRes = await dispatchAsync(createNewWallet(newWallet)).unwrap();

    sessionStorage.setItem("wallet", JSON.stringify(walletRes));

    // setTimeout(() => {
    //   setIsGenerate(false);
    // }, 3000);

    if (!isLoading) setIsGenerate(false);

    setCreateWalletForm({
      password: "",
    });
  };

  const handleDownloadKeystore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sessionStorage.getItem("wallet") !== null) {
      const data: any = sessionStorage.getItem("wallet");
      const newWallet = JSON.parse(data);
      generateJSONFile(newWallet);
    }

    sessionStorage.removeItem("wallet");
    navigate("/access-wallet");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCreated]);

  return (
    <div className="bg-slate-950 px-6 py-[100px]">
      {!isCreated ? (
        <form
          className="bg-white mx-auto md:w-[600px] lg:w-[800px] rounded-md"
          onSubmit={(e) => {
            handleCreateNewWallet(e);
          }}
        >
          <div className="bg-primary-black text-white p-6 rounded-t-md">
            <h1 className="text-xl font-bold text-center text-primary-green">Create new wallet</h1>
          </div>
          <div className="bg-gray-700 px-4 md:px-[60px] py-6">
            <div className="mb-5 flex flex-col gap-3">
              <h1 className="text-3xl text-center my-[30px] font-bold text-primary-green">
                Your password
              </h1>
              <Input
                className="border border-black border-solid"
                type="password"
                value={createWalletForm.password}
                onChange={(e) => {
                  setCreateWalletForm({
                    ...createWalletForm,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <button className="mx-auto flex items-center justify-around w-[60%] bg-primary-green text-white font-bold p-4 rounded-md">
              <div></div>
              <p>Next</p>
              <FaArrowRight />
            </button>
            <div className="my-10 flex flex-col items-center">
              <div className="flex flex-wrap justify-center items-center gap-1">
                <p className="font-bold text-red-500">DO NOT FORGET</p>
                <p className="text-primary-green">to save your password. You will need this</p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-1">
                <p className="font-bold text-red-500">Pasword + Keystore</p>
                <p className="text-primary-green">File to unclock your wallet</p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form
          className="bg-white mx-auto md:w-[600px] lg:w-[800px] rounded-md"
          onSubmit={(e) => {
            handleDownloadKeystore(e);
          }}
        >
          <div className="bg-primary-black text-white p-6 rounded-t-md">
            <h1 className="text-xl font-bold text-center text-primary-green">
              Save My Keystore File
            </h1>
          </div>
          <div className="bg-gray-700 px-4 md:px-[60px] py-6">
            <div className="mb-5 flex flex-col gap-3">
              <div className="bg-gray-500 p-4 rounded-sm flex gap-3 items-center justify-between">
                <AiOutlineSafety className="text-primary-green" size={80} />
                <div className="w-[80%]">
                  <h1 className="text-xl font-bold text-primary-green">Don't Lose it</h1>
                  <p className="text-amber-50">Be carefull, it can not be recovered if you lose it.</p>
                </div>
              </div>
              <div className="bg-gray-500 p-4 rounded-sm flex gap-3 items-center justify-between">
                <BsIncognito className="text-primary-green" size={80} />
                <div className="w-[80%]">
                  <h1 className="text-xl font-bold text-primary-green">Don't Share it</h1>
                  <p className="text-amber-50">
                    Your funds will be stolen if you use this file on a
                    malicious phishing site.
                  </p>
                </div>
              </div>
              <div className="bg-gray-500 p-4 rounded-sm flex gap-3 items-center justify-between">
                <LuDatabaseBackup className="text-primary-green" size={80} />
                <div className="w-[80%]">
                  <h1 className="text-xl font-bold text-primary-green">Make a Backup</h1>
                  <p className="text-amber-50">
                    Secure it like the millions of dollars it may one day be
                    worth.
                  </p>
                </div>
              </div>
            </div>
            <button
              disabled={isGenerate ? true : false}
              className={`mx-auto flex items-center justify-around w-[60%] text-white font-bold p-4 rounded-md ${
                isGenerate ? "bg-gray-500" : "bg-primary-green"
              }`}
            >
              <div></div>
              <p>{isGenerate ? "Please wait..." : "Download Keystore File"}</p>
              <div>{!isGenerate && <IoMdDownload size={25} />}</div>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateWallet;
