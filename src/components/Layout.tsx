import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Badge,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  People,
  Business,
  CheckCircle,
  AccountBalance,
  Description,
  MonetizationOn,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { RootState } from '../store';
import { toggleDarkMode, toggleSidebar } from '../store/slices/uiSlice';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  ArrowRightLeft,
  Users, 
  Building, 
  CheckSquare,
  Banknote
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/unit-purchase', label: 'Unit Purchase', icon: DollarSign },
  { path: '/admin/approvals', label: 'Approvals', icon: CheckSquare, badge: 3 },
  { path: '/shares-request', label: 'Shares Request', icon: TrendingUp },
  { path: '/redemption', label: 'Unit Redemption', icon: TrendingDown },
  { path: '/transfer', label: 'Unit Transfer', icon: ArrowRightLeft },
  { path: '/statements', label: 'Statements', icon: FileText },
  { path: '/transactions', label: 'Bank Transactions', icon: Banknote },
  { path: '/simulation', label: 'Property Simulation', icon: Building },
  { path: '/investors', label: 'Investors', icon: Users }
];

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            } ${mobile ? 'w-full' : ''}`}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
                </div>
                <nav className="flex flex-col gap-2">
                  <NavItems mobile />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">TrustWise</h1>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin User</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/10 p-4">
          <nav className="flex flex-col gap-2">
            <NavItems />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}