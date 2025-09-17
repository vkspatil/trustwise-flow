import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import { 
  TrendingUp, 
  AccountBalance, 
  People,
  Warning
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { unitClasses, totalNav, purchaseRequests } = useSelector((state: RootState) => state.unitTrust);
  const { investors } = useSelector((state: RootState) => state.investors);
  const { totalIncome } = useSelector((state: RootState) => state.transactions);

  const pendingRequests = purchaseRequests.filter(r => r.status === 'pending').length;

  const metrics = [
    {
      title: 'Total NAV',
      value: `$${(totalNav / 1000000).toFixed(2)}M`,
      change: '+8.2%',
      positive: true,
      icon: AccountBalance
    },
    {
      title: 'Active Investors',
      value: investors.length.toString(),
      change: '+12',
      positive: true,
      icon: People
    },
    {
      title: 'Monthly Income',
      value: `$${(totalIncome / 1000).toFixed(0)}K`,
      change: '+5.7%',
      positive: true,
      icon: TrendingUp
    },
    {
      title: 'Pending Approvals',
      value: pendingRequests.toString(),
      change: 'Requires attention',
      positive: false,
      icon: Warning
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Trading Dashboard
      </Typography>
      
      {/* Metrics Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 4 
      }}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} sx={{ 
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }
            }}>
              <CardContent sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: theme.palette.primary.main + '20',
                    mr: 2
                  }}>
                    <Icon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    {metric.value}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {metric.title}
                  </Typography>
                  <Chip
                    label={metric.change}
                    size="small"
                    sx={{
                      backgroundColor: metric.positive ? '#10b981' + '20' : '#ef4444' + '20',
                      color: metric.positive ? '#10b981' : '#ef4444',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Unit Classes Performance */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Unit Classes Performance
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gap: 2 
          }}>
            {unitClasses.map((unitClass, index) => {
              const equityRatio = ((unitClass.assets - unitClass.liabilities) / unitClass.assets) * 100;
              return (
                <Box key={unitClass.id} sx={{ 
                  p: 2, 
                  border: `1px solid ${theme.palette.divider}`, 
                  borderRadius: 2 
                }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {unitClass.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      ${unitClass.unitPrice.toFixed(4)} per unit
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Equity Ratio</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                        {equityRatio.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={equityRatio}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: `hsl(${index * 120}, 70%, 50%)`
                        }
                      }}
                    />
                  </Box>

                  <Chip
                    label={`${unitClass.totalUnits.toLocaleString()} units`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;