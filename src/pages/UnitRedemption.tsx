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
import { ArrowDown, Calculator, AlertCircle } from 'lucide-react';

export default function UnitRedemption() {
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedUnitClass, setSelectedUnitClass] = useState('');
  const [redemptionUnits, setRedemptionUnits] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const selectedInvestorData = mockInvestors.find(inv => inv.id === selectedInvestor);
  const selectedUnit = mockUnitClasses.find(unit => unit.id === selectedUnitClass);
  const investorHolding = selectedInvestorData?.holdings.find(h => h.unitClassId === selectedUnitClass);
  
  const estimatedValue = selectedUnit && redemptionUnits ? 
    parseFloat(redemptionUnits) * selectedUnit.unitPrice : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvestor || !selectedUnitClass || !redemptionUnits) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (investorHolding && parseFloat(redemptionUnits) > investorHolding.units) {
      toast({
        title: 'Error',
        description: 'Redemption amount exceeds available units',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Redemption Request Submitted',
      description: 'Unit redemption request has been submitted for admin approval.',
    });

    // Reset form
    setSelectedInvestor('');
    setSelectedUnitClass('');
    setRedemptionUnits('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Unit Redemption Request</h1>
        <p className="text-muted-foreground">
          Submit a request to redeem units with NAV validation and holdings verification
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Redemption Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5" />
                Unit Redemption Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to request a unit redemption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {selectedInvestorData && (
                  <div className="space-y-2">
                    <Label htmlFor="unitClass">Unit Class</Label>
                    <Select value={selectedUnitClass} onValueChange={setSelectedUnitClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit class to redeem" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedInvestorData.holdings.map((holding) => {
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
                    <h4 className="font-medium mb-2">Current Holdings</h4>
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
                  <Label htmlFor="units">Units to Redeem</Label>
                  <Input
                    id="units"
                    type="number"
                    placeholder="Number of units to redeem"
                    value={redemptionUnits}
                    onChange={(e) => setRedemptionUnits(e.target.value)}
                    min="1"
                    max={investorHolding?.units}
                  />
                  {investorHolding && (
                    <p className="text-xs text-muted-foreground">
                      Maximum: {investorHolding.units.toLocaleString()} units
                    </p>
                  )}
                </div>

                {selectedUnit && redemptionUnits && investorHolding && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4" />
                      <span className="font-medium">Redemption Summary</span>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Units to Redeem:</span>
                        <span>{parseFloat(redemptionUnits).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Unit Price:</span>
                        <span>${selectedUnit.unitPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Estimated Value:</span>
                        <span>${estimatedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Remaining Units:</span>
                        <span>{(investorHolding.units - parseFloat(redemptionUnits)).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {parseFloat(redemptionUnits) > investorHolding.units && (
                      <div className="flex items-center gap-2 mt-3 p-2 rounded bg-red-50 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Exceeds available units</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Redemption Reason (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Reason for redemption or special instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Redemption Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redemption Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">1</div>
                <div>
                  <p className="font-medium">Request Submission</p>
                  <p className="text-muted-foreground">Submit redemption request with unit details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">2</div>
                <div>
                  <p className="font-medium">Admin Review</p>
                  <p className="text-muted-foreground">Admin validates holdings and NAV calculations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">3</div>
                <div>
                  <p className="font-medium">NAV Update</p>
                  <p className="text-muted-foreground">System updates NAV and unit prices</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">4</div>
                <div>
                  <p className="font-medium">Settlement</p>
                  <p className="text-muted-foreground">Funds transferred and ledger updated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Redemption value based on current NAV</p>
              <p>• Processing time: 2-3 business days</p>
              <p>• Minimum redemption: 100 units</p>
              <p>• Exit fees may apply (0.5%)</p>
              <p>• Tax implications should be considered</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}