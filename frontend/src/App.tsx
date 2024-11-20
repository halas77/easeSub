import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trasactions from "./pages/Trasactions";
import Subscriptions from "./pages/Subscriptions";
import Setting from "./pages/Setting";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Trasactions />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
