import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockInvestors, mockUnitClasses } from '@/lib/mockData';
import { Users, Mail, DollarSign, PieChart } from 'lucide-react';

export default function Investors() {
  const getUnitClassName = (unitClassId: string) => {
    return mockUnitClasses.find(uc => uc.id === unitClassId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investor Management</h1>
        <p className="text-muted-foreground">
          View and manage investor portfolios and holdings
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInvestors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockInvestors.reduce((sum, inv) => sum + inv.totalInvestment, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Investment</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(mockInvestors.reduce((sum, inv) => sum + inv.totalInvestment, 0) / mockInvestors.length).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Holdings</CardTitle>
            <Badge className="ml-2">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInvestors.reduce((sum, inv) => sum + inv.holdings.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investor Details */}
      <div className="grid gap-6">
        {mockInvestors.map((investor) => (
          <Card key={investor.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{investor.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {investor.email}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${investor.totalInvestment.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Current Holdings</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {investor.holdings.map((holding, index) => (
                      <div key={index} className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">{getUnitClassName(holding.unitClassId)}</h5>
                            <p className="text-sm text-muted-foreground">
                              {holding.units.toLocaleString()} units
                            </p>
                          </div>
                          <Badge variant="secondary">
                            ${holding.value.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Unit Price: ${(holding.value / holding.units).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    View Statement
                  </Button>
                  <Button variant="outline" size="sm">
                    Process Redemption
                  </Button>
                  <Button variant="outline" size="sm">
                    Unit Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}