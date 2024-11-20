import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trasactions from "./pages/Trasactions";
import Subscriptions from "./pages/Subscriptions";
import Setting from "./pages/Setting";
import SubscriptionDetail from "./pages/SubscriptionDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Trasactions />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
