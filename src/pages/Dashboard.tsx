import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockUnitClasses, mockInvestors, mockPurchaseRequests, mockBankTransactions } from '@/lib/mockData';
import { TrendingUp, DollarSign, Users, FileCheck, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const totalNav = mockUnitClasses.reduce((sum, unit) => sum + unit.nav, 0);
  const totalInvestors = mockInvestors.length;
  const pendingRequests = mockPurchaseRequests.filter(req => req.status === 'pending').length;
  const monthlyIncome = mockBankTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Unit Trust Management System Overview
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total NAV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalNav.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvestors}</div>
            <p className="text-xs text-muted-foreground">
              +1 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Requires admin attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${monthlyIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Unit Classes Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Unit Classes Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUnitClasses.map((unitClass) => {
              const equityRatio = ((unitClass.assets - unitClass.liabilities) / unitClass.assets) * 100;
              
              return (
                <div key={unitClass.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{unitClass.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${unitClass.unitPrice.toFixed(2)} per unit
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {unitClass.totalUnits.toLocaleString()} units
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Equity Ratio</span>
                      <span>{equityRatio.toFixed(1)}%</span>
                    </div>
                    <Progress value={equityRatio} className="h-2" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPurchaseRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{request.investorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.unitClassName} - ${request.requestedAmount.toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      request.status === 'approved' ? 'default' :
                      request.status === 'pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              ))}
              
              {mockBankTransactions.slice(0, 2).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}