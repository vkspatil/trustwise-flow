import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockUnitClasses, mockInvestors } from '@/lib/mockData';
import { DollarSign, Calculator } from 'lucide-react';

export default function UnitPurchase() {
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedUnitClass, setSelectedUnitClass] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const selectedUnit = mockUnitClasses.find(unit => unit.id === selectedUnitClass);
  const estimatedUnits = selectedUnit && investmentAmount ? 
    Math.floor(parseFloat(investmentAmount) / selectedUnit.unitPrice) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvestor || !selectedUnitClass || !investmentAmount) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Purchase Request Submitted',
      description: 'Your unit purchase request has been submitted for admin approval.',
    });

    // Reset form
    setSelectedInvestor('');
    setSelectedUnitClass('');
    setInvestmentAmount('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit Purchase Request</h1>
        <p className="text-muted-foreground">
          Submit a request to purchase units in available unit classes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Purchase Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Purchase Request Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to request a unit purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="investor">Investor</Label>
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
                    <Label htmlFor="unitClass">Unit Class</Label>
                    <Select value={selectedUnitClass} onValueChange={setSelectedUnitClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit class" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockUnitClasses.map((unitClass) => (
                          <SelectItem key={unitClass.id} value={unitClass.id}>
                            {unitClass.name} - ${unitClass.unitPrice.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter investment amount"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                {selectedUnit && investmentAmount && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4" />
                      <span className="font-medium">Calculation Summary</span>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Unit Price:</span>
                        <span>${selectedUnit.unitPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Amount:</span>
                        <span>${parseFloat(investmentAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Estimated Units:</span>
                        <span>{estimatedUnits.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information or special instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Purchase Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Unit Classes Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Unit Classes</CardTitle>
              <CardDescription>
                Current pricing and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUnitClasses.map((unitClass) => (
                <div 
                  key={unitClass.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedUnitClass === unitClass.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedUnitClass(unitClass.id)}
                >
                  <h4 className="font-medium">{unitClass.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {unitClass.description}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Unit Price:</span>
                      <span className="font-medium">${unitClass.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Units:</span>
                      <span>{unitClass.totalUnits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NAV:</span>
                      <span>${unitClass.nav.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}