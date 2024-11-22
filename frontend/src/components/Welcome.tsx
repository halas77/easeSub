import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMainContext } from "../context/MainContext";
import { getAccountBalance } from "../utils/lib";

const Welcome = () => {
  const { account } = useMainContext();
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState<string | null>();

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const fetchedBalance = await getAccountBalance(account);
        setBalance(fetchedBalance);
      }
    };
    fetchBalance();
  }, [account]);

  return (
    <div className="space-y-6 mx-auto">
      <p className="text-gray-700 font-semibold text-lg">
        Welcome back{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </p>

      <div className="flex items-center gap-4">
        <p className="text-gray-800 font-bold text-4xl">
          {isVisible ? balance?.slice(0, 5) || "0" : "****"}
          <span className="ml-1 text-lg font-medium text-gray-500">USDe</span>
        </p>

        <button
          className="text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Toggle visibility"
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default Welcome;
