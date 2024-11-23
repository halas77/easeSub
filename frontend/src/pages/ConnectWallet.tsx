import { useNavigate } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { RiExchangeLine } from "react-icons/ri";

const ConnectWallet = () => {
  const { connectWallet } = useMainContext();

  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    connectWallet();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-[600px] bg-white p-2">
      <div className="p-6 sm:p-8 border rounded-3xl shadow-lg bg-white max-w-md">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 py-4">
            <RiExchangeLine size={32} className="text-indigo-700" />
            <h1 className="text-2xl font-semibold text-indigo-700">easeSub.</h1>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Connect your wallet to start using our platform. Ensure your
            MetaMask is installed and ready to go.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => handleConnectWallet()}
            className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:from-indigo-800 hover:to-indigo-800 focus:outline-none "
          >
            Connect Wallet
          </button>
          <p className="mt-4 text-xs text-gray-500 text-center">
            Make sure you have MetaMask installed in your browser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
