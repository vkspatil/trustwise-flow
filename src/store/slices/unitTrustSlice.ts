import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UnitClass {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  totalUnits: number;
  nav: number;
  assets: number;
  liabilities: number;
  performance: number;
  inception: string;
}

export interface UnitPurchaseRequest {
  id: string;
  investorId: string;
  investorName: string;
  unitClass: string;
  amount: number;
  units: number;
  unitPrice: number;
  fees: number;
  total: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  processedAt?: string;
}

interface UnitTrustState {
  unitClasses: UnitClass[];
  purchaseRequests: UnitPurchaseRequest[];
  totalNav: number;
  totalAssets: number;
  totalLiabilities: number;
}

const initialState: UnitTrustState = {
  unitClasses: [
    {
      id: 'growth-a',
      name: 'Growth Fund A',
      description: 'High growth potential equity fund',
      unitPrice: 1.2345,
      totalUnits: 85420,
      nav: 105468.90,
      assets: 120000,
      liabilities: 14531.10,
      performance: 8.75,
      inception: '2020-01-15'
    },
    {
      id: 'income-b',
      name: 'Income Fund B',
      description: 'Stable income focused fund',
      unitPrice: 0.9876,
      totalUnits: 124680,
      nav: 123205.68,
      assets: 135000,
      liabilities: 11794.32,
      performance: 5.25,
      inception: '2019-06-01'
    },
    {
      id: 'balanced-c',
      name: 'Balanced Fund C',
      description: 'Diversified balanced portfolio',
      unitPrice: 1.1234,
      totalUnits: 96340,
      nav: 108234.56,
      assets: 115000,
      liabilities: 6765.44,
      performance: 6.90,
      inception: '2021-03-10'
    }
  ],
  purchaseRequests: [
    {
      id: '1',
      investorId: 'inv1',
      investorName: 'John Smith',
      unitClass: 'Growth Fund A',
      amount: 10000,
      units: 8103.73,
      unitPrice: 1.2345,
      fees: 50,
      total: 10050,
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      investorId: 'inv2',
      investorName: 'Sarah Johnson',
      unitClass: 'Income Fund B',
      amount: 15000,
      units: 15187.97,
      unitPrice: 0.9876,
      fees: 75,
      total: 15075,
      status: 'pending',
      submittedAt: '2024-01-15T11:45:00Z'
    }
  ],
  totalNav: 336909.14,
  totalAssets: 370000,
  totalLiabilities: 33090.86
};

const unitTrustSlice = createSlice({
  name: 'unitTrust',
  initialState,
  reducers: {
    addPurchaseRequest: (state, action: PayloadAction<Omit<UnitPurchaseRequest, 'id' | 'submittedAt' | 'status'>>) => {
      const newRequest: UnitPurchaseRequest = {
        ...action.payload,
        id: Date.now().toString(),
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      state.purchaseRequests.push(newRequest);
    },
    approvePurchaseRequest: (state, action: PayloadAction<string>) => {
      const request = state.purchaseRequests.find(r => r.id === action.payload);
      if (request) {
        request.status = 'approved';
        request.processedAt = new Date().toISOString();
      }
    },
    rejectPurchaseRequest: (state, action: PayloadAction<string>) => {
      const request = state.purchaseRequests.find(r => r.id === action.payload);
      if (request) {
        request.status = 'rejected';
        request.processedAt = new Date().toISOString();
      }
    },
    updateUnitClass: (state, action: PayloadAction<Partial<UnitClass> & { id: string }>) => {
      const index = state.unitClasses.findIndex(uc => uc.id === action.payload.id);
      if (index !== -1) {
        state.unitClasses[index] = { ...state.unitClasses[index], ...action.payload };
      }
    }
  }
});

export const { addPurchaseRequest, approvePurchaseRequest, rejectPurchaseRequest, updateUnitClass } = unitTrustSlice.actions;
export default unitTrustSlice.reducer;