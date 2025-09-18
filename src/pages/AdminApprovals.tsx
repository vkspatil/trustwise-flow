import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Box,
  Divider
} from '@mui/material';
import { CheckCircle, Cancel, AccessTime } from '@mui/icons-material';
import { mockPurchaseRequests, mockSharesRequests } from '@/lib/mockData';
import { addNotification } from '@/store/slices/uiSlice';

export default function AdminApprovals() {
  const [purchaseRequests, setPurchaseRequests] = useState(mockPurchaseRequests);
  const [sharesRequests, setSharesRequests] = useState(mockSharesRequests);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();

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

    dispatch(addNotification({
      type: 'success',
      message: `${type === 'purchase' ? 'Unit purchase' : 'Shares purchase'} request has been approved.`
    }));
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

    dispatch(addNotification({
      type: 'error',
      message: `${type === 'purchase' ? 'Unit purchase' : 'Shares purchase'} request has been rejected.`
    }));
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" size="small" sx={{ backgroundColor: '#10b981', color: 'white' }} />;
      case 'rejected':
        return <Chip label="Rejected" size="small" sx={{ backgroundColor: '#ef4444', color: 'white' }} />;
      default:
        return <Chip label="Pending" size="small" sx={{ backgroundColor: '#f59e0b', color: 'white' }} />;
    }
  };

  const pendingPurchases = purchaseRequests.filter(req => req.status === 'pending');
  const pendingShares = sharesRequests.filter(req => req.status === 'pending');

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Admin Approvals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and approve purchase requests from investors
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1, color: 'text.secondary' }}>
              Pending Unit Purchases
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {pendingPurchases.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Awaiting approval
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1, color: 'text.secondary' }}>
              Pending Shares Purchases
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {pendingShares.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Awaiting approval
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1, color: 'text.secondary' }}>
              Total Pending
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {pendingPurchases.length + pendingShares.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Requires attention
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <Box>
          <Tabs 
            value={tabValue} 
            onChange={(_, value) => setTabValue(value)}
            sx={{ px: 2, pt: 2 }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Unit Purchase Requests
                  {pendingPurchases.length > 0 && (
                    <Chip 
                      label={pendingPurchases.length} 
                      size="small" 
                      sx={{ backgroundColor: '#f59e0b', color: 'white', minWidth: 20, height: 20 }}
                    />
                  )}
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Shares Purchase Requests
                  {pendingShares.length > 0 && (
                    <Chip 
                      label={pendingShares.length} 
                      size="small" 
                      sx={{ backgroundColor: '#f59e0b', color: 'white', minWidth: 20, height: 20 }}
                    />
                  )}
                </Box>
              } 
            />
          </Tabs>

          {tabValue === 0 && (
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {purchaseRequests.map((request) => (
                  <Card key={request.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {request.investorName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Submitted {new Date(request.submittedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        {getStatusChip(request.status)}
                      </Box>

                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Unit Class:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{request.unitClassName}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Investment Amount:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>${request.requestedAmount.toLocaleString()}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Estimated Units:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{request.requestedUnits.toLocaleString()}</Typography>
                          </Box>
                        </Box>
                        
                        <Box>
                          {request.status === 'pending' ? (
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <Button
                                variant="contained"
                                onClick={() => handleApprove(request.id, 'purchase')}
                                startIcon={<CheckCircle />}
                                fullWidth
                                sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' } }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleReject(request.id, 'purchase')}
                                startIcon={<Cancel />}
                                fullWidth
                                sx={{ backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626' } }}
                              >
                                Reject
                              </Button>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.approvedBy} on{' '}
                              {request.approvedAt && new Date(request.approvedAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sharesRequests.map((request) => (
                  <Card key={request.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {request.investorName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Submitted {new Date(request.submittedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        {getStatusChip(request.status)}
                      </Box>

                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Symbol:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{request.symbol}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Quantity:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{request.quantity}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Estimated Price:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>${request.estimatedPrice}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Total Amount:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>${request.totalAmount.toLocaleString()}</Typography>
                          </Box>
                        </Box>
                        
                        <Box>
                          {request.status === 'pending' ? (
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <Button
                                variant="contained"
                                onClick={() => handleApprove(request.id, 'shares')}
                                startIcon={<CheckCircle />}
                                fullWidth
                                sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' } }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleReject(request.id, 'shares')}
                                startIcon={<Cancel />}
                                fullWidth
                                sx={{ backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626' } }}
                              >
                                Reject
                              </Button>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.approvedBy} on{' '}
                              {request.approvedAt && new Date(request.approvedAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
}