import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trasactions from "./pages/Trasactions";
import Subscriptions from "./pages/Subscriptions";
import Setting from "./pages/Setting";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySubscriptionDetail from "./pages/MySubscriptionDetail";
import Services from "./pages/Services";
import ConnectWallet from "./pages/ConnectWallet";
import PrivateRoute from "./components/PrivateRoute";
import { MainProvider } from "./context/MainContext";

const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Trasactions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
            <Route
              path="/subscriptions/my/:id"
              element={<MySubscriptionDetail />}
            />
            <Route path="/settings" element={<Setting />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default App;
