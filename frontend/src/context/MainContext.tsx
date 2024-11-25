import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

type MainContextType = {
  account: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isLoading: boolean;
};

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed!");
      alert("MetaMask is not installed!");
      return;
    }
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet:", error);
      alert("Failed to connect.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    setAccount("");
    alert(
      "Wallet disconnected. Please go to your MetaMask extension, Remove this site from the 'Connected sites' list to fully disconnect."
    );
  };

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed!");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log("Error checking wallet connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <MainContext.Provider
      value={{ account, connectWallet, isLoading, disconnectWallet }}
    >
      {children}
    </MainContext.Provider>
  );
};