import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
