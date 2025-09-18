import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Landmark, 
  Users,
  AlertTriangle
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
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
      icon: Landmark
    },
    {
      title: 'Active Investors',
      value: investors.length.toString(),
      change: '+12',
      positive: true,
      icon: Users
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
      icon: AlertTriangle
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Dashboard</h1>
        <p className="text-muted-foreground">Monitor your unit trust performance and key metrics</p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold font-mono">
                      {metric.value}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Badge 
                    variant={metric.positive ? "default" : "destructive"}
                    className={metric.positive ? "bg-success/20 text-success" : ""}
                  >
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unit Classes Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Classes Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {unitClasses.map((unitClass, index) => {
              const equityRatio = ((unitClass.assets - unitClass.liabilities) / unitClass.assets) * 100;
              return (
                <div key={unitClass.id} className="rounded-lg border p-4">
                  <div className="mb-4">
                    <h4 className="font-semibold">{unitClass.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${unitClass.unitPrice.toFixed(4)} per unit
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm">Equity Ratio</span>
                      <span className="text-sm font-semibold font-mono">
                        {equityRatio.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={equityRatio} className="h-2" />
                  </div>

                  <Badge variant="outline">
                    {unitClass.totalUnits.toLocaleString()} units
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;