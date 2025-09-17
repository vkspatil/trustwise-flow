import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInvestment: number;
  currentValue: number;
  totalReturn: number;
  returnPercentage: number;
  joinDate: string;
  holdings: {
    unitClass: string;
    units: number;
    value: number;
    avgPrice: number;
  }[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  status: 'active' | 'inactive' | 'suspended';
}

interface InvestorState {
  investors: Investor[];
}

const initialState: InvestorState = {
  investors: [
    {
      id: 'inv1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+61 400 123 456',
      totalInvestment: 50000,
      currentValue: 54250,
      totalReturn: 4250,
      returnPercentage: 8.5,
      joinDate: '2023-03-15',
      holdings: [
        { unitClass: 'Growth Fund A', units: 15420.5, value: 19038.97, avgPrice: 1.1850 },
        { unitClass: 'Income Fund B', units: 18250.3, value: 18021.55, avgPrice: 0.9650 },
        { unitClass: 'Balanced Fund C', units: 15320.2, value: 17189.48, avgPrice: 1.0890 }
      ],
      riskProfile: 'moderate',
      status: 'active'
    },
    {
      id: 'inv2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+61 400 987 654',
      totalInvestment: 75000,
      currentValue: 82125,
      totalReturn: 7125,
      returnPercentage: 9.5,
      joinDate: '2022-11-20',
      holdings: [
        { unitClass: 'Growth Fund A', units: 25840.7, value: 31907.24, avgPrice: 1.1200 },
        { unitClass: 'Balanced Fund C', units: 44720.8, value: 50217.76, avgPrice: 1.0450 }
      ],
      riskProfile: 'aggressive',
      status: 'active'
    },
    {
      id: 'inv3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+61 400 555 777',
      totalInvestment: 30000,
      currentValue: 31650,
      totalReturn: 1650,
      returnPercentage: 5.5,
      joinDate: '2023-08-10',
      holdings: [
        { unitClass: 'Income Fund B', units: 32045.6, value: 31650.00, avgPrice: 0.9375 }
      ],
      riskProfile: 'conservative',
      status: 'active'
    }
  ]
};

const investorSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {
    addInvestor: (state, action: PayloadAction<Omit<Investor, 'id'>>) => {
      const newInvestor: Investor = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.investors.push(newInvestor);
    },
    updateInvestor: (state, action: PayloadAction<Partial<Investor> & { id: string }>) => {
      const index = state.investors.findIndex(inv => inv.id === action.payload.id);
      if (index !== -1) {
        state.investors[index] = { ...state.investors[index], ...action.payload };
      }
    },
    updateInvestorHoldings: (state, action: PayloadAction<{ 
      investorId: string; 
      unitClass: string; 
      units: number; 
      avgPrice: number; 
    }>) => {
      const investor = state.investors.find(inv => inv.id === action.payload.investorId);
      if (investor) {
        const holdingIndex = investor.holdings.findIndex(h => h.unitClass === action.payload.unitClass);
        if (holdingIndex !== -1) {
          investor.holdings[holdingIndex].units += action.payload.units;
          // Recalculate average price
          const totalValue = investor.holdings[holdingIndex].value + (action.payload.units * action.payload.avgPrice);
          investor.holdings[holdingIndex].avgPrice = totalValue / investor.holdings[holdingIndex].units;
          investor.holdings[holdingIndex].value = totalValue;
        } else {
          investor.holdings.push({
            unitClass: action.payload.unitClass,
            units: action.payload.units,
            value: action.payload.units * action.payload.avgPrice,
            avgPrice: action.payload.avgPrice
          });
        }
      }
    }
  }
});

export const { addInvestor, updateInvestor, updateInvestorHoldings } = investorSlice.actions;
export default investorSlice.reducer;