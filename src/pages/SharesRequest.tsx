import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockInvestors } from '@/lib/mockData';
import { TrendingUp, Calculator, Activity } from 'lucide-react';

export default function SharesRequest() {
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const totalAmount = quantity && estimatedPrice ? 
    parseFloat(quantity) * parseFloat(estimatedPrice) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvestor || !symbol || !quantity || !estimatedPrice) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Shares Purchase Request Submitted',
      description: 'Your shares purchase request has been submitted for admin approval.',
    });

    // Reset form
    setSelectedInvestor('');
    setSymbol('');
    setQuantity('');
    setEstimatedPrice('');
    setNotes('');
  };

  const popularStocks = [
    { symbol: 'CBA', name: 'Commonwealth Bank', price: 105.50 },
    { symbol: 'WBC', name: 'Westpac Banking', price: 98.20 },
    { symbol: 'ANZ', name: 'ANZ Banking Group', price: 87.45 },
    { symbol: 'NAB', name: 'National Australia Bank', price: 92.30 },
    { symbol: 'BHP', name: 'BHP Group', price: 156.80 },
    { symbol: 'CSL', name: 'CSL Limited', price: 234.60 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shares Purchase Request</h1>
        <p className="text-muted-foreground">
          Submit a request to purchase shares for the unit trust portfolio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Purchase Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Shares Purchase Request Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to request a shares purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="investor">Requesting Investor</Label>
                    <Select value={selectedInvestor} onValueChange={setSelectedInvestor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investor" />
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

                  <div className="space-y-2">
                    <Label htmlFor="symbol">Stock Symbol</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g., CBA, WBC, BHP"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Number of shares"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Estimated Price per Share ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Current market price"
                      value={estimatedPrice}
                      onChange={(e) => setEstimatedPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {quantity && estimatedPrice && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4" />
                      <span className="font-medium">Order Summary</span>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Symbol:</span>
                        <span className="font-medium">{symbol || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{parseFloat(quantity).toLocaleString()} shares</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price per Share:</span>
                        <span>${parseFloat(estimatedPrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Total Amount:</span>
                        <span>${totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Investment Rationale (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Explain why this investment aligns with the fund's strategy"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Shares Purchase Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Popular Stocks */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Popular ASX Stocks
              </CardTitle>
              <CardDescription>
                Current market prices (indicative)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularStocks.map((stock) => (
                <div 
                  key={stock.symbol} 
                  className="p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => {
                    setSymbol(stock.symbol);
                    setEstimatedPrice(stock.price.toString());
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{stock.symbol}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price.toFixed(2)}</div>
                      <div className="text-xs text-green-600">+1.2%</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Diversify across sectors and market caps</p>
              <p>• Consider dividend yield and growth potential</p>
              <p>• Align with fund's risk profile</p>
              <p>• Maximum 5% position size per stock</p>
              <p>• Focus on ASX 200 companies</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}