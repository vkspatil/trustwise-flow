import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockPurchaseRequests, mockSharesRequests } from '@/lib/mockData';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

export default function AdminApprovals() {
  const [purchaseRequests, setPurchaseRequests] = useState(mockPurchaseRequests);
  const [sharesRequests, setSharesRequests] = useState(mockSharesRequests);
  const { toast } = useToast();

  const handleApprove = (id: string, type: 'purchase' | 'shares') => {
    const timestamp = new Date().toISOString();
    
    if (type === 'purchase') {
      setPurchaseRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: 'approved', approvedAt: timestamp, approvedBy: 'Admin User' }
            : req
        )
      );
    } else {
      setSharesRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: 'approved', approvedAt: timestamp, approvedBy: 'Admin User' }
            : req
        )
      );
    }

    toast({
      title: 'Request Approved',
      description: `${type === 'purchase' ? 'Unit purchase' : 'Shares purchase'} request has been approved.`,
    });
  };

  const handleReject = (id: string, type: 'purchase' | 'shares') => {
    const timestamp = new Date().toISOString();
    
    if (type === 'purchase') {
      setPurchaseRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: 'rejected', approvedAt: timestamp, approvedBy: 'Admin User' }
            : req
        )
      );
    } else {
      setSharesRequests(prev => 
        prev.map(req => 
          req.id === id 
            ? { ...req, status: 'rejected', approvedAt: timestamp, approvedBy: 'Admin User' }
            : req
        )
      );
    }

    toast({
      title: 'Request Rejected',
      description: `${type === 'purchase' ? 'Unit purchase' : 'Shares purchase'} request has been rejected.`,
      variant: 'destructive'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const pendingPurchases = purchaseRequests.filter(req => req.status === 'pending');
  const pendingShares = sharesRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Approvals</h1>
        <p className="text-muted-foreground">
          Review and approve purchase requests from investors
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Unit Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPurchases.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Shares Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingShares.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPurchases.length + pendingShares.length}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="unit-purchases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="unit-purchases">
            Unit Purchase Requests
            {pendingPurchases.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingPurchases.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="shares-purchases">
            Shares Purchase Requests
            {pendingShares.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingShares.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unit-purchases" className="space-y-4">
          {purchaseRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.investorName}</CardTitle>
                    <CardDescription>
                      Submitted {new Date(request.submittedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Unit Class:</span>
                      <span className="font-medium">{request.unitClassName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Investment Amount:</span>
                      <span className="font-medium">${request.requestedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Units:</span>
                      <span className="font-medium">{request.requestedUnits.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleApprove(request.id, 'purchase')}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(request.id, 'purchase')}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status !== 'pending' && request.approvedAt && (
                    <div className="text-sm text-muted-foreground">
                      {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.approvedBy} on{' '}
                      {new Date(request.approvedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="shares-purchases" className="space-y-4">
          {sharesRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.investorName}</CardTitle>
                    <CardDescription>
                      Submitted {new Date(request.submittedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Symbol:</span>
                      <span className="font-medium">{request.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{request.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Price:</span>
                      <span className="font-medium">${request.estimatedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Amount:</span>
                      <span className="font-medium">${request.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleApprove(request.id, 'shares')}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(request.id, 'shares')}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status !== 'pending' && request.approvedAt && (
                    <div className="text-sm text-muted-foreground">
                      {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.approvedBy} on{' '}
                      {new Date(request.approvedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}