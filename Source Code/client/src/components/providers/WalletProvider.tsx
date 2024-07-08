import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWallet } from "@/redux/actions/user.action";
import { useNavigate } from "react-router-dom";

interface PropType {
  children: React.ReactElement;
}

const WalletProvider = (props: PropType) => {
  const { children } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoadSessionWallet = () => {
    const data: any = sessionStorage.getItem("wallet");
    const newWallet = JSON.parse(data);

    if (newWallet === null) {
      navigate("/");
      return;
    }

    dispatch(setWallet(newWallet));
  };

  useEffect(() => {
    handleLoadSessionWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default WalletProvider;
