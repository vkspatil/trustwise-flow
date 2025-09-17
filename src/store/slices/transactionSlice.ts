import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  gst: number;
  reference: string;
  status: 'cleared' | 'pending' | 'reconciled';
}

interface TransactionState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  totalGST: number;
}

const initialState: TransactionState = {
  transactions: [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Rental Income - Property A',
      type: 'income',
      category: 'rental',
      amount: 2500,
      gst: 227.27,
      reference: 'RENT001',
      status: 'cleared'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Property Management Fee',
      type: 'expense',
      category: 'management',
      amount: 250,
      gst: 22.73,
      reference: 'MGT001',
      status: 'cleared'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Dividend Income - ASX Shares',
      type: 'income',
      category: 'dividends',
      amount: 1200,
      gst: 0,
      reference: 'DIV001',
      status: 'cleared'
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Legal Fees',
      type: 'expense',
      category: 'legal',
      amount: 500,
      gst: 45.45,
      reference: 'LEG001',
      status: 'pending'
    }
  ],
  totalIncome: 0,
  totalExpenses: 0,
  totalGST: 0
};

// Calculate totals
initialState.totalIncome = initialState.transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

initialState.totalExpenses = initialState.transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

initialState.totalGST = initialState.transactions
  .reduce((sum, t) => sum + t.gst, 0);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.transactions.push(newTransaction);
      
      // Recalculate totals
      state.totalIncome = state.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      state.totalExpenses = state.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      state.totalGST = state.transactions
        .reduce((sum, t) => sum + t.gst, 0);
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: Transaction['status'] }>) => {
      const transaction = state.transactions.find(t => t.id === action.payload.id);
      if (transaction) {
        transaction.status = action.payload.status;
      }
    }
  }
});

export const { addTransaction, updateTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;