import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-6  mx-auto">
      <p className="text-gray-700 font-semibold text-lg">
        Welcome back <span role="img" aria-label="wave">👋</span>
      </p>
      
      <div className="flex items-center gap-4">
        <p className="text-gray-800 font-bold text-4xl">
          {isVisible ? "1563" : "****"}
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
