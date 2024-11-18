import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiExchangeLine } from "react-icons/ri";
import { dashboardContent } from "../utils/constants";
import { FiChevronRight } from "react-icons/fi";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(() =>
    JSON.parse(localStorage.getItem("isExpanded") || "false")
  );

  useEffect(() => {
    localStorage.setItem("isExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  return (
    <div className="relative rounded-r-3xl">
      <div
        className={`absolute lg:relative h-screen shadow bg-white transition-width duration-300 ${
          isExpanded ? "w-60" : "w-16"
        } ${className}`}
      >
        {/* Logo Section */}
        <Link
          to="/"
          className="h-16 flex items-center px-3 gap-1 shadow shadow-white/20 border-b"
        >
          <RiExchangeLine size={32} className="font-bold text-indigo-700" />
          {isExpanded && (
            <span className="font-semibold text-xl transition-opacity duration-300 whitespace-nowrap text-indigo-700">
              easeSub
            </span>
          )}
        </Link>

        <ul className="flex flex-col gap-2 justify-center items-start mt-4">
          {dashboardContent.map((item) => (
            <Link to={item.href} className="flex items-center gap-3">
              <li
                key={item.href}
                className={`p-4 cursor-pointer text-sm flex items-center gap-3 whitespace-nowrap transition-colors ease-in-out duration-300 ${
                  location.pathname === item.href
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-gray-950"
                }`}
              >
                <item.icon size={22} />
                <span
                  className={`transition-opacity duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute top-5 z-[9999] text-black rounded-full shadow-lg p-1 transition-transform duration-300 ${
            isExpanded
              ? "translate-x-1/2 -right-0"
              : "-translate-x-1/2 -right-8"
          }`}
        >
          <FiChevronRight
            size={20}
            className={`${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
