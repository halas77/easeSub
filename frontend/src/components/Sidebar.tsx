import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiExchangeLine } from "react-icons/ri";
import { dashboardContent, socialLinks } from "../utils/constants";
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
          <RiExchangeLine size={32} className="font-bold text-indigo-600" />
          {isExpanded && (
            <span className="font-semibold text-xl transition-opacity duration-300 whitespace-nowrap text-indigo-600">
              easeSub
            </span>
          )}
        </Link>

        <ul className="flex flex-col gap-2 justify-center items-start mt-4">
          {dashboardContent.map((item, idx) => (
            <Link key={idx} to={item.href} className="flex items-center gap-3">
              <li
                className={`p-4 cursor-pointer text-sm flex items-center gap-3 whitespace-nowrap transition-colors ease-in-out duration-300 ${
                  location.pathname === item.href
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-500 hover:text-indigo-600"
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
        {isExpanded && (
          <div className="absolute bottom-6 left-0 w-full px-4 text-start text-gray-600 text-xs border-t border-gray-200 pt-4 space-y-1">
            <p className="whitespace-nowrap">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="pl-3">
              Powered by{" "}
              <a
                href="https://github.com/halas77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline cursor-pointer"
              >
                halas77
              </a>
              .
            </div>
            <div className="flex justify-start pt-1 gap-6 pl-3">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icons
                    className="text-gray-600 hover:text-gray-400 transition-colors duration-200"
                    size={18}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
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
