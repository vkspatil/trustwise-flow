import { configureStore } from '@reduxjs/toolkit';
import unitTrustReducer from './slices/unitTrustSlice';
import transactionReducer from './slices/transactionSlice';
import investorReducer from './slices/investorSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    unitTrust: unitTrustReducer,
    transactions: transactionReducer,
    investors: investorReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;