import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockInvestors, mockBankTransactions } from '@/lib/mockData';
import { FileText, Download, Eye, Calendar, DollarSign } from 'lucide-react';

export default function Statements() {
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const { toast } = useToast();

  const generateStatement = (type: string) => {
    toast({
      title: 'Statement Generated',
      description: `${type} statement has been generated and is ready for download.`,
    });
  };

  const generateBAS = () => {
    const totalIncome = mockBankTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = mockBankTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalGST = mockBankTransactions.reduce((sum, t) => sum + t.gst, 0);

    toast({
      title: 'BAS Statement Generated',
      description: `Total Income: $${totalIncome.toLocaleString()}, Total GST: $${totalGST}`,
    });
  };

  const statementTypes = [
    {
      id: 'purchase',
      title: 'Unit Purchase Statement',
      description: 'Detailed breakdown of unit purchases including fees and calculations',
      icon: DollarSign,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'bas',
      title: 'BAS (Business Activity Statement)',
      description: 'GST and PAYG reporting with AI-assisted explanations',
      icon: FileText,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Statement',
      description: 'Complete investor portfolio summary with NAV breakdown',
      icon: Eye,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'transaction',
      title: 'Transaction History',
      description: 'Comprehensive transaction ledger and audit trail',
      icon: Calendar,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statements & Reports</h1>
        <p className="text-muted-foreground">
          Generate and export statements, BAS reports, and investor summaries
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>BAS Statement Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reporting Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Current Month</SelectItem>
                  <SelectItem value="quarterly">Current Quarter</SelectItem>
                  <SelectItem value="yearly">Current Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateBAS} className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Generate BAS Statement
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investor Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Investor</label>
              <Select value={selectedInvestor} onValueChange={setSelectedInvestor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose investor" />
                </SelectTrigger>
                <SelectContent>
                  {mockInvestors.map((investor) => (
                    <SelectItem key={investor.id} value={investor.id}>
                      {investor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => generateStatement('Investor')} 
              className="w-full"
              disabled={!selectedInvestor}
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Portfolio Statement
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Statement Types */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Statement Types</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {statementTypes.map((statement) => {
            const Icon = statement.icon;
            return (
              <Card key={statement.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${statement.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{statement.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {statement.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">PDF</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateStatement(statement.title)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => generateStatement(statement.title)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Statements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'BAS Statement - January 2024', date: '2024-01-31', type: 'BAS', status: 'Ready' },
              { name: 'John Smith - Portfolio Statement', date: '2024-01-30', type: 'Portfolio', status: 'Ready' },
              { name: 'Unit Purchase Statement - Growth Fund A', date: '2024-01-29', type: 'Purchase', status: 'Ready' },
              { name: 'Sarah Johnson - Transaction History', date: '2024-01-28', type: 'Transaction', status: 'Ready' }
            ].map((statement, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{statement.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Generated on {new Date(statement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{statement.type}</Badge>
                  <Badge variant="secondary">{statement.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}