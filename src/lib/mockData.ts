export interface UnitClass {
  id: string;
  name: string;
  description: string;
  totalUnits: number;
  unitPrice: number;
  nav: number;
  assets: number;
  liabilities: number;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  totalInvestment: number;
  holdings: Array<{
    unitClassId: string;
    units: number;
    value: number;
  }>;
}

export interface PurchaseRequest {
  id: string;
  investorId: string;
  investorName: string;
  unitClassId: string;
  unitClassName: string;
  requestedAmount: number;
  requestedUnits: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  gst: number;
  category: string;
}

export interface SharesPurchaseRequest {
  id: string;
  investorId: string;
  investorName: string;
  symbol: string;
  quantity: number;
  estimatedPrice: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'property' | 'shares' | 'cash';
  value: number;
  purchasePrice: number;
  purchaseDate: string;
  liability?: number;
  location?: string;
  symbol?: string;
  quantity?: number;
}

export interface RedemptionRequest {
  id: string;
  investorId: string;
  investorName: string;
  unitClassId: string;
  unitClassName: string;
  unitsToRedeem: number;
  estimatedValue: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface TransferRequest {
  id: string;
  fromInvestorId: string;
  fromInvestorName: string;
  toInvestorId: string;
  toInvestorName: string;
  unitClassId: string;
  unitClassName: string;
  unitsToTransfer: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface Statement {
  id: string;
  investorId: string;
  type: 'purchase' | 'bas' | 'redemption' | 'transfer';
  generatedAt: string;
  data: any;
}

// Mock data
export const mockUnitClasses: UnitClass[] = [
  {
    id: '1',
    name: 'Growth Fund A',
    description: 'High-growth investment focused on property and equity',
    totalUnits: 10000,
    unitPrice: 1.25,
    nav: 12500000,
    assets: 15000000,
    liabilities: 2500000
  },
  {
    id: '2',
    name: 'Income Fund B',
    description: 'Stable income-generating investments',
    totalUnits: 8000,
    unitPrice: 1.15,
    nav: 9200000,
    assets: 11000000,
    liabilities: 1800000
  }
];

export const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    totalInvestment: 250000,
    holdings: [
      { unitClassId: '1', units: 1500, value: 187500 },
      { unitClassId: '2', units: 800, value: 92000 }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    totalInvestment: 180000,
    holdings: [
      { unitClassId: '1', units: 1000, value: 125000 },
      { unitClassId: '2', units: 500, value: 57500 }
    ]
  }
];

export const mockPurchaseRequests: PurchaseRequest[] = [
  {
    id: '1',
    investorId: '1',
    investorName: 'John Smith',
    unitClassId: '1',
    unitClassName: 'Growth Fund A',
    requestedAmount: 50000,
    requestedUnits: 4000,
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    investorId: '2',
    investorName: 'Sarah Johnson',
    unitClassId: '2',
    unitClassName: 'Income Fund B',
    requestedAmount: 25000,
    requestedUnits: 2174,
    status: 'approved',
    submittedAt: '2024-01-14T14:20:00Z',
    approvedAt: '2024-01-14T16:45:00Z',
    approvedBy: 'Admin User'
  }
];

export const mockBankTransactions: BankTransaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Rental Income - Property A',
    type: 'income',
    amount: 5000,
    gst: 500,
    category: 'Rental Income'
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Property Management Fee',
    type: 'expense',
    amount: 800,
    gst: 80,
    category: 'Property Management'
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Dividend Income - ASX:CBA',
    type: 'income',
    amount: 2500,
    gst: 0,
    category: 'Dividends'
  }
];

export const mockSharesRequests: SharesPurchaseRequest[] = [
  {
    id: '1',
    investorId: '1',
    investorName: 'John Smith',
    symbol: 'CBA',
    quantity: 100,
    estimatedPrice: 105.50,
    totalAmount: 10550,
    status: 'pending',
    submittedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '2',
    investorId: '2',
    investorName: 'Sarah Johnson',
    symbol: 'WBC',
    quantity: 50,
    estimatedPrice: 98.20,
    totalAmount: 4910,
    status: 'approved',
    submittedAt: '2024-01-14T09:30:00Z',
    approvedAt: '2024-01-14T10:15:00Z',
    approvedBy: 'Admin User'
  }
];

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Residential Property - Melbourne',
    type: 'property',
    value: 850000,
    purchasePrice: 750000,
    purchaseDate: '2023-06-15',
    liability: 400000,
    location: '123 Collins Street, Melbourne VIC 3000'
  },
  {
    id: '2',
    name: 'Commercial Property - Sydney',
    type: 'property',
    value: 1200000,
    purchasePrice: 1100000,
    purchaseDate: '2022-11-20',
    liability: 600000,
    location: '456 George Street, Sydney NSW 2000'
  },
  {
    id: '3',
    name: 'CBA Shares',
    type: 'shares',
    value: 52750,
    purchasePrice: 48000,
    purchaseDate: '2023-08-10',
    symbol: 'CBA',
    quantity: 500
  },
  {
    id: '4',
    name: 'Cash Reserve',
    type: 'cash',
    value: 150000,
    purchasePrice: 150000,
    purchaseDate: '2024-01-01'
  }
];

export const mockRedemptionRequests: RedemptionRequest[] = [
  {
    id: '1',
    investorId: '1',
    investorName: 'John Smith',
    unitClassId: '1',
    unitClassName: 'Growth Fund A',
    unitsToRedeem: 500,
    estimatedValue: 62500,
    status: 'pending',
    submittedAt: '2024-01-15T15:30:00Z'
  }
];

export const mockTransferRequests: TransferRequest[] = [
  {
    id: '1',
    fromInvestorId: '1',
    fromInvestorName: 'John Smith',
    toInvestorId: '2',
    toInvestorName: 'Sarah Johnson',
    unitClassId: '2',
    unitClassName: 'Income Fund B',
    unitsToTransfer: 200,
    status: 'pending',
    submittedAt: '2024-01-15T16:45:00Z'
  }
];