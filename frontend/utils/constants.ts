import { FiGrid, FiSettings } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { LuFolderClock } from "react-icons/lu";


export const dashboardContent = [
  { label: "Dashboard", href: "/", icon: FiGrid },
  { label: "Transactions", href: "/transactions", icon: GrTransaction },
  { label: "Subscriptions", href: "/subscriptions", icon: LuFolderClock },
  { label: "Settings", href: "/settings", icon: FiSettings },
];
