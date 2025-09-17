import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  LinearProgress,
  Chip,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Building, 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle 
} from 'lucide-react';

export default function PropertySimulation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [propertyValue, setPropertyValue] = useState('850000');
  const [purchasePrice, setPurchasePrice] = useState('750000');
  const [loanAmount, setLoanAmount] = useState('600000');
  const [rentalIncome, setRentalIncome] = useState('2400');
  const [expenses, setExpenses] = useState('800');
  const [interestRate, setInterestRate] = useState('6.5');

  // Calculations
  const equity = parseFloat(propertyValue) - parseFloat(loanAmount);
  const equityRatio = (equity / parseFloat(propertyValue)) * 100;
  const monthlyRepayment = (parseFloat(loanAmount) * (parseFloat(interestRate) / 100 / 12)) / (1 - Math.pow(1 + (parseFloat(interestRate) / 100 / 12), -300));
  const monthlyCashFlow = parseFloat(rentalIncome) - parseFloat(expenses) - monthlyRepayment;
  const annualYield = (parseFloat(rentalIncome) * 12 / parseFloat(propertyValue)) * 100;
  const roi = (monthlyCashFlow * 12 / equity) * 100;

  const getHealthScore = () => {
    let score = 0;
    if (equityRatio >= 20) score += 25;
    if (monthlyCashFlow >= 0) score += 25;
    if (annualYield >= 4) score += 25;
    if (roi >= 8) score += 25;
    return score;
  };

  const healthScore = getHealthScore();

  const getHealthStatus = (score: number) => {
    if (score >= 75) return { status: 'Excellent', color: 'success', icon: CheckCircle };
    if (score >= 50) return { status: 'Good', color: 'primary', icon: TrendingUp };
    if (score >= 25) return { status: 'Fair', color: 'warning', icon: AlertTriangle };
    return { status: 'Poor', color: 'error', icon: AlertTriangle };
  };

  const healthStatus = getHealthStatus(healthScore);
  const HealthIcon = healthStatus.icon;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Property Investment Health Check
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Simulate property investments and evaluate financial health with detailed analysis
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 3 
      }}>
        {/* Input Form */}
        <Box sx={{ flex: { lg: '0 0 33%' } }}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Building size={20} />
                <Typography variant="h6" component="h2">
                  Property Details
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Current Property Value ($)"
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Purchase Price ($)"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Loan Amount ($)"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Monthly Rental Income ($)"
                  type="number"
                  value={rentalIncome}
                  onChange={(e) => setRentalIncome(e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Monthly Expenses ($)"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Interest Rate (%)"
                  type="number"
                  inputProps={{ step: '0.1' }}
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Results */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Health Score */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 3
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Calculator size={20} />
                    <Typography variant="h6">Investment Health Score</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HealthIcon size={20} />
                    <Chip 
                      label={healthStatus.status} 
                      color={healthStatus.color as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="h2" component="div" sx={{ fontWeight: 700, mb: 2 }}>
                    {healthScore}/100
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={healthScore} 
                    sx={{ height: 12, borderRadius: 6 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Based on equity ratio, cash flow, yield, and ROI metrics
                </Typography>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2
            }}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Equity Position
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 2 }}>
                    ${equity.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Equity Ratio
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600,
                        color: equityRatio >= 20 ? 'success.main' : 'error.main'
                      }}
                    >
                      {equityRatio.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(equityRatio, 100)} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Monthly Cash Flow
                  </Typography>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: monthlyCashFlow >= 0 ? 'success.main' : 'error.main'
                    }}
                  >
                    {monthlyCashFlow >= 0 ? '+' : ''}${monthlyCashFlow.toFixed(0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rental: ${rentalIncome} | Repayment: ${monthlyRepayment.toFixed(0)}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Rental Yield
                  </Typography>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: annualYield >= 4 ? 'success.main' : 'warning.main'
                    }}
                  >
                    {annualYield.toFixed(2)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Annual rental income vs property value
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Return on Investment
                  </Typography>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: roi >= 8 ? 'success.main' : roi >= 0 ? 'warning.main' : 'error.main'
                    }}
                  >
                    {roi.toFixed(2)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Annual cash flow vs equity invested
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Analysis & Recommendations */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Investment Analysis
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Key Insights:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {equityRatio >= 20 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                        <CheckCircle size={16} />
                        <Typography variant="body2">
                          Strong equity position ({equityRatio.toFixed(1)}% equity ratio)
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                        <AlertTriangle size={16} />
                        <Typography variant="body2">
                          Low equity ratio - consider reducing loan amount
                        </Typography>
                      </Box>
                    )}
                    
                    {monthlyCashFlow >= 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                        <CheckCircle size={16} />
                        <Typography variant="body2">
                          Positive cash flow of ${monthlyCashFlow.toFixed(0)} per month
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
                        <AlertTriangle size={16} />
                        <Typography variant="body2">
                          Negative cash flow - property costs exceed rental income
                        </Typography>
                      </Box>
                    )}
                    
                    {annualYield >= 4 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                        <CheckCircle size={16} />
                        <Typography variant="body2">
                          Good rental yield of {annualYield.toFixed(2)}%
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'warning.main' }}>
                        <AlertTriangle size={16} />
                        <Typography variant="body2">
                          Below average rental yield - consider higher rent or lower purchase price
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Capital Growth Impact:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current capital gain: ${(parseFloat(propertyValue) - parseFloat(purchasePrice)).toLocaleString()} 
                    ({(((parseFloat(propertyValue) - parseFloat(purchasePrice)) / parseFloat(purchasePrice)) * 100).toFixed(1)}%)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}