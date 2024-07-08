import { saveAs } from "file-saver";
import { WalletType } from "@/types";

export const generateJSONFile = (newWallet: WalletType) => {
  const jsonData = JSON.stringify(newWallet, null, 2);

  const blob = new Blob([jsonData], { type: "application/json" });

  saveAs(blob, "keystore-wallet.json");
};

export const getCurrentTime = () => {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time = hours + ":" + minutes + ":" + seconds;

  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const date = month + "/" + day + "/" + year;

  const timestamp = date + " " + time;

  return timestamp;
};

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );
