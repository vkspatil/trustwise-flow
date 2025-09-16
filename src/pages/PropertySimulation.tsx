import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Calculator, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function PropertySimulation() {
  const [propertyValue, setPropertyValue] = useState('850000');
  const [purchasePrice, setPurchasePrice] = useState('750000');
  const [loanAmount, setLoanAmount] = useState('600000');
  const [rentalIncome, setRentalIncome] = useState('2400');
  const [expenses, setExpenses] = useState('800');
  const [interestRate, setInterestRate] = useState('6.5');

  // Calculations
  const equity = parseFloat(propertyValue) - parseFloat(loanAmount);
  const equityRatio = (equity / parseFloat(propertyValue)) * 100;
  const monthlyRepayment = (parseFloat(loanAmount) * (parseFloat(interestRate) / 100 / 12)) / (1 - Math.pow(1 + (parseFloat(interestRate) / 100 / 12), -300)); // 25 year loan
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
    if (score >= 75) return { status: 'Excellent', color: 'text-green-600', icon: CheckCircle };
    if (score >= 50) return { status: 'Good', color: 'text-blue-600', icon: TrendingUp };
    if (score >= 25) return { status: 'Fair', color: 'text-yellow-600', icon: AlertTriangle };
    return { status: 'Poor', color: 'text-red-600', icon: AlertTriangle };
  };

  const healthStatus = getHealthStatus(healthScore);
  const HealthIcon = healthStatus.icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Property Investment Health Check</h1>
        <p className="text-muted-foreground">
          Simulate property investments and evaluate financial health with detailed analysis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Property Value ($)</Label>
                <Input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Purchase Price ($)</Label>
                <Input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Loan Amount ($)</Label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Monthly Rental Income ($)</Label>
                <Input
                  type="number"
                  value={rentalIncome}
                  onChange={(e) => setRentalIncome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Monthly Expenses ($)</Label>
                <Input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Investment Health Score
                </span>
                <div className="flex items-center gap-2">
                  <HealthIcon className={`h-5 w-5 ${healthStatus.color}`} />
                  <Badge variant="outline" className={healthStatus.color}>
                    {healthStatus.status}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{healthScore}/100</div>
                  <Progress value={healthScore} className="h-3" />
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  Based on equity ratio, cash flow, yield, and ROI metrics
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Equity Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${equity.toLocaleString()}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Equity Ratio</span>
                  <span className={`text-sm font-medium ${equityRatio >= 20 ? 'text-green-600' : 'text-red-600'}`}>
                    {equityRatio.toFixed(1)}%
                  </span>
                </div>
                <Progress value={equityRatio} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Monthly Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {monthlyCashFlow >= 0 ? '+' : ''}${monthlyCashFlow.toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Rental: ${rentalIncome} | Repayment: ${monthlyRepayment.toFixed(0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Rental Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${annualYield >= 4 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {annualYield.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Annual rental income vs property value
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Return on Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${roi >= 8 ? 'text-green-600' : roi >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {roi.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Annual cash flow vs equity invested
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <ul className="space-y-1 text-sm">
                    {equityRatio >= 20 ? (
                      <li className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Strong equity position ({equityRatio.toFixed(1)}% equity ratio)
                      </li>
                    ) : (
                      <li className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        Low equity ratio - consider reducing loan amount
                      </li>
                    )}
                    
                    {monthlyCashFlow >= 0 ? (
                      <li className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Positive cash flow of ${monthlyCashFlow.toFixed(0)} per month
                      </li>
                    ) : (
                      <li className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        Negative cash flow - property costs exceed rental income
                      </li>
                    )}
                    
                    {annualYield >= 4 ? (
                      <li className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Good rental yield of {annualYield.toFixed(2)}%
                      </li>
                    ) : (
                      <li className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="h-4 w-4" />
                        Below average rental yield - consider higher rent or lower purchase price
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Capital Growth Impact:</h4>
                  <p className="text-sm text-muted-foreground">
                    Current capital gain: ${(parseFloat(propertyValue) - parseFloat(purchasePrice)).toLocaleString()} 
                    ({(((parseFloat(propertyValue) - parseFloat(purchasePrice)) / parseFloat(purchasePrice)) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}