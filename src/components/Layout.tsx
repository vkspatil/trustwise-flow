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
  Button,
  Menu,
  MenuItem,
  Divider,
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
  Brightness7,
  Settings,
  AccountCircle,
  Logout,
  Notifications
} from '@mui/icons-material';
import { RootState } from '../store';
import { toggleDarkMode, toggleSidebar } from '../store/slices/uiSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon, color: '#60a5fa' },
  { path: '/unit-purchase', label: 'Unit Purchase', icon: MonetizationOn, color: '#10b981' },
  { path: '/admin/approvals', label: 'Approvals', icon: CheckCircle, badge: 3, color: '#f59e0b' },
  { path: '/shares-request', label: 'Shares Request', icon: TrendingUp, color: '#8b5cf6' },
  { path: '/redemption', label: 'Unit Redemption', icon: TrendingDown, color: '#ef4444' },
  { path: '/transfer', label: 'Unit Transfer', icon: SwapHoriz, color: '#06b6d4' },
  { path: '/statements', label: 'Statements', icon: Description, color: '#84cc16' },
  { path: '/transactions', label: 'Bank Transactions', icon: AccountBalance, color: '#f97316' },
  { path: '/simulation', label: 'Property Simulation', icon: Business, color: '#ec4899' },
  { path: '/investors', label: 'Investors', icon: People, color: '#6366f1' },
];

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { sidebarOpen, darkMode, notifications } = useSelector((state: RootState) => state.ui);
  const pendingRequests = useSelector((state: RootState) => 
    state.unitTrust.purchaseRequests.filter(r => r.status === 'pending').length
  );
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      dispatch(toggleSidebar());
    }
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 4px 20px rgba(96, 165, 250, 0.3)'
                : '0 4px 20px rgba(59, 130, 246, 0.2)'
            }}
          >
            <Business sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
              TrustWise
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              opacity: 0.8
            }}>
              Capital Management
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Market Overview */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="caption" sx={{ 
          fontWeight: 600, 
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'text.secondary',
          px: 1
        }}>
          Market Overview
        </Typography>
        <Box sx={{ mt: 1, px: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2">NAV Total</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.trading.bull }}>
              $2.45M
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">24h Change</Typography>
            <Chip 
              label="+2.34%" 
              size="small" 
              sx={{ 
                backgroundColor: theme.palette.trading.bull + '20',
                color: theme.palette.trading.bull,
                fontSize: '0.7rem',
                height: 20,
                fontWeight: 600
              }} 
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, px: 1, py: 1 }}>
        <List sx={{ py: 0 }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    px: 2,
                    py: 1,
                    minHeight: 44,
                    backgroundColor: isActive 
                      ? (theme.palette.mode === 'dark' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.1)')
                      : 'transparent',
                    border: isActive ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(96, 165, 250, 0.08)' 
                        : 'rgba(59, 130, 246, 0.05)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: 'linear-gradient(180deg, #60a5fa, #3b82f6)',
                      borderRadius: '0 2px 2px 0'
                    } : {}
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon 
                      sx={{ 
                        fontSize: 20,
                        color: isActive ? '#60a5fa' : item.color,
                        filter: isActive ? 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.4))' : 'none'
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'primary.main' : 'text.primary'
                    }}
                  />
                  {item.badge && (
                    <Chip 
                      label={item.path === '/admin/approvals' ? pendingRequests : item.badge}
                      size="small"
                      sx={{ 
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20,
                        minWidth: 20,
                        fontWeight: 600,
                        animation: pendingRequests > 0 ? 'pulse 2s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 1 },
                          '50%': { opacity: 0.7 }
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* User Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(96, 165, 250, 0.05)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`
        }}>
          <Avatar sx={{ 
            width: 32, 
            height: 32,
            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
              AD
            </Typography>
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'text.secondary',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              admin@trustwise.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          background: theme.palette.mode === 'dark'
            ? 'rgba(17, 24, 39, 0.8)'
            : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Current Page Title */}
          <Typography variant="h6" noWrap component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            color: 'text.primary'
          }}>
            {navigationItems.find(item => item.path === location.pathname)?.label || 'TrustWise'}
          </Typography>

          {/* Top Bar Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton sx={{ color: 'text.primary' }}>
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Theme Toggle */}
            <IconButton onClick={handleThemeToggle} sx={{ color: 'text.primary' }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* User Menu */}
            <IconButton
              onClick={handleProfileMenu}
              sx={{ color: 'text.primary' }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={handleCloseProfileMenu}>
                <Settings sx={{ mr: 2 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleCloseProfileMenu}>
                <Logout sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="persistent"
          open={sidebarOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              transition: 'width 0.3s ease'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          ml: { md: sidebarOpen ? `${drawerWidth}px` : 0 },
          transition: 'margin 0.3s ease, width 0.3s ease',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar /> {/* Spacer for fixed app bar */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}