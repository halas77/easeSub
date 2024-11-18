import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <Sidebar className="sticky left-0 rounded-r-3xl top-0 h-screen hidden md:block" />

      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 h-16" />

        <main className="flex-1 overflow-y-auto p-4  [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
