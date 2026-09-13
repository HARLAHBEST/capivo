export type Language = 'en' | 'ha' | 'yo' | 'ig' | 'pcm';

export type BusinessMode = 'shop' | 'store';

export type UserRole = 'owner' | 'worker' | 'lissafiTeam';

export type PageId =
  | 'dashboard'
  | 'inventory'
  | 'sales'
  | 'profit'
  | 'receipts'
  | 'reports'
  | 'alerts'
  | 'lissafi'
  | 'users'
  | 'security';

export type DrawerTabId =
  | 'stock'
  | 'cash'
  | 'sale'
  | 'stockin'
  | 'product'
  | 'ccredit'
  | 'cpay'
  | 'scredit'
  | 'expense'
  | 'loss'
  | 'deposit';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  branch: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  minLevel: number;
  status: 'instock' | 'lowstock' | 'outstock';
}

export interface SaleTransaction {
  id: string;
  productName: string;
  quantity: number;
  branch: string;
  time: string;
  amount: number;
  paymentType: 'Cash' | 'Credit';
  customerName?: string;
}

export interface ReceiptItem {
  id: string;
  type: 'Purchase' | 'Expense';
  supplier: string;
  branch: string;
  date: string;
  amount: number;
}

export interface AlertItem {
  id: string;
  category: 'Capital' | 'Credit' | 'Branch' | 'Inventory' | 'Operational' | 'Expense';
  title: string;
  body: string;
  meta: string;
  level: 'warn' | 'info' | 'good';
  storeOnly?: boolean;
}

export interface AuditLogItem {
  id: string;
  action: string;
  user: string;
  time: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  manager: string;
  score: number;
  status: 'active' | 'invited' | 'unassigned';
  location: string;
  syncStatus: string;
  isOffline?: boolean;
}
