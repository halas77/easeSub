import { FiGrid, FiSettings } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { LuFolderClock } from "react-icons/lu";
import { HiOutlineCog } from "react-icons/hi2";

import { FiMail } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiGithubLine } from "react-icons/ri";

import abi from "./abi.json";

export const contractABI = abi.abi;
export const contractAddress = "0xa905484b7E7CFFA7D03e79E6Ad99F2dDc4e1048C";

export const dashboardContent = [
  { label: "Dashboard", href: "/", icon: FiGrid },
  { label: "My subscriptions", href: "/subscriptions", icon: LuFolderClock },
  { label: "Services", href: "/services", icon: HiOutlineCog },
  { label: "Transactions", href: "/transactions", icon: GrTransaction },
  { label: "Settings", href: "/settings", icon: FiSettings },
];

export const socialLinks = [
  {
    icons: RiGithubLine,
    href: "https://github.com/halas77",
  },
  {
    icons: PiTelegramLogo,
    href: "https://t.me/halas7",
  },
  {
    icons: RiLinkedinBoxLine,
    href: "https://www.linkedin.com/in/dawit-mellese/",
  },
  {
    icons: FiMail,
    href: "mailto:dawitm777@gmail.com",
  },
];
