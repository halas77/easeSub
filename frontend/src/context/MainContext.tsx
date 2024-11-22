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
  chainId: string | null;
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
  const [chainId, setChainId] = useState<string | null>(null);

  const ethenaNetwork = {
    chainId: "0x31a9b87",
    chainName: "Ble Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.rpc.ethena.fi"],
    blockExplorerUrls: ["https://testnet.explorer.ethena.fi/"],
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [ethenaNetwork],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
      alert("Switching to the Ethena Testnet failed. Please try again.");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed! Please install it to proceed.");
      return;
    }
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();

      if (network.chainId !== 52085143) {
        await switchNetwork();
      }

      setAccount(accounts[0]);
      setChainId(network.chainId.toString());
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect to wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    setAccount("");
    setChainId(null);
    alert(
      "Wallet disconnected. To fully disconnect, remove this site from the 'Connected sites' list in MetaMask."
    );
  };

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum === "undefined") {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setChainId(network.chainId.toString());

        if (network.chainId !== 52085143) {
          await switchNetwork();
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Listen to account changes
    window.ethereum?.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
      }
    });

    // Listen to network changes
    window.ethereum?.on("chainChanged", (newChainId: string) => {
      setChainId(parseInt(newChainId, 16).toString());
      if (newChainId !== ethenaNetwork.chainId) {
        switchNetwork();
      }
    });

    return () => {
      window.ethereum?.removeListener("accountsChanged", () => {});
      window.ethereum?.removeListener("chainChanged", () => {});
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        isLoading,
        chainId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
