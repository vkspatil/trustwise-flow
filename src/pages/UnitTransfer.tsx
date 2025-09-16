import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockInvestors, mockUnitClasses } from '@/lib/mockData';
import { ArrowRightLeft, Calculator, Users, AlertCircle } from 'lucide-react';

export default function UnitTransfer() {
  const [fromInvestor, setFromInvestor] = useState('');
  const [toInvestor, setToInvestor] = useState('');
  const [selectedUnitClass, setSelectedUnitClass] = useState('');
  const [transferUnits, setTransferUnits] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const fromInvestorData = mockInvestors.find(inv => inv.id === fromInvestor);
  const toInvestorData = mockInvestors.find(inv => inv.id === toInvestor);
  const selectedUnit = mockUnitClasses.find(unit => unit.id === selectedUnitClass);
  const investorHolding = fromInvestorData?.holdings.find(h => h.unitClassId === selectedUnitClass);
  
  const transferValue = selectedUnit && transferUnits ? 
    parseFloat(transferUnits) * selectedUnit.unitPrice : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromInvestor || !toInvestor || !selectedUnitClass || !transferUnits) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (fromInvestor === toInvestor) {
      toast({
        title: 'Error',
        description: 'Cannot transfer units to the same investor',
        variant: 'destructive'
      });
      return;
    }

    if (investorHolding && parseFloat(transferUnits) > investorHolding.units) {
      toast({
        title: 'Error',
        description: 'Transfer amount exceeds available units',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Transfer Request Submitted',
      description: 'Unit transfer request has been submitted for admin approval.',
    });

    // Reset form
    setFromInvestor('');
    setToInvestor('');
    setSelectedUnitClass('');
    setTransferUnits('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit Transfer Request</h1>
        <p className="text-muted-foreground">
          Transfer units between investors with pro-rata asset and liability adjustments
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Transfer Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Unit Transfer Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to request a unit transfer between investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fromInvestor">From Investor</Label>
                    <Select value={fromInvestor} onValueChange={setFromInvestor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transferring investor" />
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
                    <Label htmlFor="toInvestor">To Investor</Label>
                    <Select value={toInvestor} onValueChange={setToInvestor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select receiving investor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockInvestors
                          .filter(inv => inv.id !== fromInvestor)
                          .map((investor) => (
                            <SelectItem key={investor.id} value={investor.id}>
                              {investor.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {fromInvestorData && (
                  <div className="space-y-2">
                    <Label htmlFor="unitClass">Unit Class</Label>
                    <Select value={selectedUnitClass} onValueChange={setSelectedUnitClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit class to transfer" />
                      </SelectTrigger>
                      <SelectContent>
                        {fromInvestorData.holdings.map((holding) => {
                          const unitClass = mockUnitClasses.find(uc => uc.id === holding.unitClassId);
                          return unitClass ? (
                            <SelectItem key={holding.unitClassId} value={holding.unitClassId}>
                              {unitClass.name} - {holding.units.toLocaleString()} units available
                            </SelectItem>
                          ) : null;
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {investorHolding && (
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Available Holdings</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Available Units:</span>
                        <span className="font-medium">{investorHolding.units.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Value:</span>
                        <span className="font-medium">${investorHolding.value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Price:</span>
                        <span className="font-medium">${selectedUnit?.unitPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="units">Units to Transfer</Label>
                  <Input
                    id="units"
                    type="number"
                    placeholder="Number of units to transfer"
                    value={transferUnits}
                    onChange={(e) => setTransferUnits(e.target.value)}
                    min="1"
                    max={investorHolding?.units}
                  />
                  {investorHolding && (
                    <p className="text-xs text-muted-foreground">
                      Maximum: {investorHolding.units.toLocaleString()} units
                    </p>
                  )}
                </div>

                {selectedUnit && transferUnits && investorHolding && fromInvestorData && toInvestorData && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="h-4 w-4" />
                      <span className="font-medium">Transfer Summary</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Units to Transfer:</span>
                          <span>{parseFloat(transferUnits).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Price:</span>
                          <span>${selectedUnit.unitPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                          <span>Transfer Value:</span>
                          <span>${transferValue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2 pt-2 border-t">
                        <div>
                          <h5 className="font-medium text-sm mb-1">From: {fromInvestorData.name}</h5>
                          <div className="text-xs text-muted-foreground">
                            Remaining: {(investorHolding.units - parseFloat(transferUnits)).toLocaleString()} units
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-1">To: {toInvestorData.name}</h5>
                          <div className="text-xs text-muted-foreground">
                            Will receive: {parseFloat(transferUnits).toLocaleString()} units
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {parseFloat(transferUnits) > investorHolding.units && (
                      <div className="flex items-center gap-2 mt-3 p-2 rounded bg-red-50 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Exceeds available units</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Transfer Reason (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Reason for transfer or special instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Transfer Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Transfer Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">1</div>
                <div>
                  <p className="font-medium">Request Submission</p>
                  <p className="text-muted-foreground">Submit transfer request with investor details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">2</div>
                <div>
                  <p className="font-medium">Validation</p>
                  <p className="text-muted-foreground">System validates holdings and eligibility</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">3</div>
                <div>
                  <p className="font-medium">Pro-rata Adjustments</p>
                  <p className="text-muted-foreground">Asset and liability adjustments calculated</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">4</div>
                <div>
                  <p className="font-medium">Completion</p>
                  <p className="text-muted-foreground">Transfer recorded and ledger updated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transfer Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Both investors must be active</p>
              <p>• Minimum transfer: 50 units</p>
              <p>• Transfer fee: $25 per transaction</p>
              <p>• Processing time: 1-2 business days</p>
              <p>• Pro-rata adjustments applied automatically</p>
              <p>• All transfers logged for audit trail</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Transfers adjust each investor's proportional share of:</p>
              <p>• Underlying assets</p>
              <p>• Associated liabilities</p>
              <p>• Future distributions</p>
              <p>• Voting rights (if applicable)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}