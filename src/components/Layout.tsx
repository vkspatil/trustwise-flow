import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Users,
  Building2,
  CheckCircle,
  Landmark,
  FileText,
  DollarSign,
  Sun,
  Moon,
  Settings,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import { RootState } from '../store';
import { toggleDarkMode, toggleSidebar } from '../store/slices/uiSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/unit-purchase', label: 'Unit Purchase', icon: DollarSign },
  { path: '/admin/approvals', label: 'Approvals', icon: CheckCircle, badge: true },
  { path: '/shares-request', label: 'Shares Request', icon: TrendingUp },
  { path: '/redemption', label: 'Unit Redemption', icon: TrendingDown },
  { path: '/transfer', label: 'Unit Transfer', icon: ArrowLeftRight },
  { path: '/statements', label: 'Statements', icon: FileText },
  { path: '/transactions', label: 'Bank Transactions', icon: Landmark },
  { path: '/simulation', label: 'Property Simulation', icon: Building2 },
  { path: '/investors', label: 'Investors', icon: Users },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { sidebarOpen, darkMode, notifications } = useSelector((state: RootState) => state.ui);
  const pendingRequests = useSelector((state: RootState) => 
    state.unitTrust.purchaseRequests.filter(r => r.status === 'pending').length
  );
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">TrustWise</h2>
            <p className="text-sm text-muted-foreground">Capital Management</p>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="border-b p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Market Overview
        </p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">NAV Total</span>
            <span className="text-sm font-semibold text-success">$2.45M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">24h Change</span>
            <Badge variant="secondary" className="bg-success/20 text-success">
              +2.34%
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 min-w-5 px-1 text-xs animate-pulse"
                  >
                    {item.path === '/admin/approvals' ? pendingRequests : ''}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-lg border bg-card/50 p-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@trustwise.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex w-80 border-r bg-background transition-all duration-300",
          !sidebarOpen && "w-0 overflow-hidden"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center px-4 gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDrawerToggle}
              className="hidden md:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="flex-1 text-lg font-semibold">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'TrustWise'}
            </h1>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Badge 
                  content={notifications.length > 0 ? notifications.length.toString() : undefined}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
                  )}
                </Badge>
              </Button>

              <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;