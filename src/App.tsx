import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UnitPurchase from "./pages/UnitPurchase";
import AdminApprovals from "./pages/AdminApprovals";
import Investors from "./pages/Investors";
import BankTransactions from "./pages/BankTransactions";
import SharesRequest from "./pages/SharesRequest";
import Statements from "./pages/Statements";
import PropertySimulation from "./pages/PropertySimulation";
import UnitRedemption from "./pages/UnitRedemption";
import UnitTransfer from "./pages/UnitTransfer";
import NotFound from "./pages/NotFound";

const App = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/unit-purchase" element={<UnitPurchase />} />
            <Route path="/admin/approvals" element={<AdminApprovals />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/transactions" element={<BankTransactions />} />
            <Route path="/shares-request" element={<SharesRequest />} />
            <Route path="/statements" element={<Statements />} />
            <Route path="/simulation" element={<PropertySimulation />} />
            <Route path="/redemption" element={<UnitRedemption />} />
            <Route path="/transfer" element={<UnitTransfer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
