import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { dashboardContent } from "../utils/constants";
import { RiExchangeLine } from "react-icons/ri";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <nav className="h-16 flex justify-between lg:justify-end items-center   relative z-10 px-5">
        <Link
          to={"/"}
          className="flex lg:hidden justify-center items-center gap-2 py-4"
        >
          <RiExchangeLine size={32} className="font-bold text-indigo-700" />
          <span className="font-semibold text-xl transition-opacity duration-300 whitespace-nowrap text-indigo-700">
            easeSub
          </span>
        </Link>

        <div className="relative flex items-center space-x-4">
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              className="w-11 h-11 border-2 p-1 border-gray-300 rounded-full "
              src="/User1.png"
              alt="User Avatar"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-20"
              style={{ top: "90%" }}
            >
              <ul className="flex flex-col">
                {dashboardContent.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <li className="py-3 px-4 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer flex items-center gap-3 transition-all duration-150 ease-in-out">
                      <item.icon className="text-gray-950  transition duration-150" />
                      <span className="font-medium text-gray-950">
                        {item.label}
                      </span>
                    </li>
                  </Link>
                ))}
                <li
                  className={`py-3 px-4 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer flex items-center gap-3 transition-all duration-150 ease-in-out`}
                >
                  <FiLogOut className="text-gray-950  transition duration-150" />
                  <span className="font-medium text-gray-950">Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
