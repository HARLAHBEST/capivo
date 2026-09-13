"use client";

import React, { createContext, useContext, useState } from "react";
import {
  BusinessMode,
  UserRole,
  PageId,
  DrawerTabId,
  Product,
  SaleTransaction,
  ReceiptItem,
  AlertItem,
  AuditLogItem,
  BranchInfo,
} from "../types";

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}

interface AppStateContextType {
  // Navigation & Mode
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  businessMode: BusinessMode;
  setBusinessMode: (mode: BusinessMode) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;

  // Modals & Drawers
  isDrawerOpen: boolean;
  drawerTab: DrawerTabId;
  openDrawer: (tab?: DrawerTabId) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTabId) => void;

  isUserModalOpen: boolean;
  openUserModal: () => void;
  closeUserModal: () => void;

  isOcrModalOpen: boolean;
  openOcrModal: () => void;
  closeOcrModal: () => void;

  isWizardOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;

  isStyleGuideOpen: boolean;
  openStyleGuide: () => void;
  closeStyleGuide: () => void;

  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;

  isVoiceModalOpen: boolean;
  openVoiceModal: () => void;
  closeVoiceModal: () => void;

  // Data Collections & Actions
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  sales: SaleTransaction[];
  recordSale: (sale: Omit<SaleTransaction, "id" | "time">) => void;
  receipts: ReceiptItem[];
  addReceipt: (receipt: Omit<ReceiptItem, "id">) => void;
  alerts: AlertItem[];
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, user?: string) => void;
  branches: BranchInfo[];
  isMonthLocked: boolean;
  lockCurrentMonth: () => void;

  // Toast System
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Rice — 25kg Bag",
    sku: "STP-1042",
    category: "Staples",
    branch: "Yaba Main",
    purchasePrice: 29000,
    sellingPrice: 42000,
    quantity: 6,
    minLevel: 25,
    status: "lowstock",
  },
  {
    id: "p2",
    name: "Cooking Oil — 5L",
    sku: "STP-1103",
    category: "Staples",
    branch: "Ikeja",
    purchasePrice: 9500,
    sellingPrice: 12500,
    quantity: 0,
    minLevel: 15,
    status: "outstock",
  },
  {
    id: "p3",
    name: "Granulated Sugar — 1kg",
    sku: "STP-1211",
    category: "Staples",
    branch: "Yaba Main",
    purchasePrice: 980,
    sellingPrice: 1450,
    quantity: 156,
    minLevel: 40,
    status: "instock",
  },
  {
    id: "p4",
    name: "Bottled Water — 50cl (Carton)",
    sku: "BEV-2031",
    category: "Beverages",
    branch: "Surulere",
    purchasePrice: 1800,
    sellingPrice: 2300,
    quantity: 89,
    minLevel: 30,
    status: "instock",
  },
  {
    id: "p5",
    name: "Detergent Powder — 1kg",
    sku: "HH-3050",
    category: "Household",
    branch: "Ikeja",
    purchasePrice: 1400,
    sellingPrice: 1900,
    quantity: 4,
    minLevel: 20,
    status: "lowstock",
  },
  {
    id: "p6",
    name: "Spaghetti — 500g Pack",
    sku: "STP-1305",
    category: "Staples",
    branch: "Ajah",
    purchasePrice: 700,
    sellingPrice: 850,
    quantity: 210,
    minLevel: 100,
    status: "instock",
  },
  {
    id: "p7",
    name: "Tomato Paste — 400g",
    sku: "STP-1420",
    category: "Staples",
    branch: "Yaba Main",
    purchasePrice: 480,
    sellingPrice: 680,
    quantity: 0,
    minLevel: 50,
    status: "outstock",
  },
  {
    id: "p8",
    name: "Vegetable Oil — 1L Bottle",
    sku: "STP-1088",
    category: "Staples",
    branch: "Surulere",
    purchasePrice: 2200,
    sellingPrice: 2650,
    quantity: 98,
    minLevel: 35,
    status: "instock",
  },
];

const initialSales: SaleTransaction[] = [
  {
    id: "s1",
    productName: "Rice — 25kg Bag",
    quantity: 3,
    branch: "Yaba Main",
    time: "10:42 AM",
    amount: 126000,
    paymentType: "Cash",
  },
  {
    id: "s2",
    productName: "Bottled Water — Carton",
    quantity: 10,
    branch: "Ikeja",
    time: "10:15 AM",
    amount: 23000,
    paymentType: "Cash",
  },
  {
    id: "s3",
    productName: "Detergent Powder",
    quantity: 4,
    branch: "Surulere",
    time: "9:58 AM",
    amount: 7600,
    paymentType: "Cash",
  },
  {
    id: "s4",
    productName: "Spaghetti — 500g",
    quantity: 20,
    branch: "Ajah",
    time: "9:30 AM",
    amount: 17000,
    paymentType: "Credit",
    customerName: "Madam Ngozi Provisions",
  },
  {
    id: "s5",
    productName: "Vegetable Oil — 1L",
    quantity: 6,
    branch: "Surulere",
    time: "9:12 AM",
    amount: 15900,
    paymentType: "Cash",
  },
  {
    id: "s6",
    productName: "Granulated Sugar — 1kg",
    quantity: 15,
    branch: "Yaba Main",
    time: "8:50 AM",
    amount: 21750,
    paymentType: "Credit",
    customerName: "Chief Okafor Store",
  },
];

const initialReceipts: ReceiptItem[] = [
  {
    id: "rc1",
    type: "Purchase",
    supplier: "Delta Foods Ltd.",
    branch: "Yaba Main",
    date: "10 Aug 2026",
    amount: 184000,
  },
  {
    id: "rc2",
    type: "Purchase",
    supplier: "Bright Supplies",
    branch: "Ikeja",
    date: "09 Aug 2026",
    amount: 96500,
  },
  {
    id: "rc3",
    type: "Expense",
    supplier: "Transport — Fuel",
    branch: "Ajah",
    date: "09 Aug 2026",
    amount: 22400,
  },
  {
    id: "rc4",
    type: "Purchase",
    supplier: "Coastal Distributors",
    branch: "Surulere",
    date: "09 Aug 2026",
    amount: 312000,
  },
  {
    id: "rc5",
    type: "Purchase",
    supplier: "Ajah Wholesale",
    branch: "Ajah",
    date: "08 Aug 2026",
    amount: 58750,
  },
  {
    id: "rc6",
    type: "Expense",
    supplier: "Generator Repair",
    branch: "Yaba Main",
    date: "07 Aug 2026",
    amount: 14000,
  },
  {
    id: "rc7",
    type: "Purchase",
    supplier: "Northgate Traders",
    branch: "Ikeja",
    date: "06 Aug 2026",
    amount: 221300,
  },
  {
    id: "rc8",
    type: "Expense",
    supplier: "Security — Monthly",
    branch: "Surulere",
    date: "05 Aug 2026",
    amount: 35000,
  },
];

const initialAlerts: AlertItem[] = [
  {
    id: "a1",
    category: "Credit",
    title: "Excessive Customer Credit",
    body: "Customer credit rose 18% this month — ₦2.1M is now tied up across 47 accounts.",
    meta: "Active · 10 Aug 2026",
    level: "warn",
  },
  {
    id: "a2",
    category: "Branch",
    title: "Branch Performance — Ajah",
    body: "Ajah has scored below 60 for three consecutive months.",
    meta: "Active · 6 Aug 2026",
    level: "warn",
  },
  {
    id: "a3",
    category: "Credit",
    title: "Supplier Payment Due",
    body: "₦940,000 owed to 2 suppliers, due within 7 days.",
    meta: "Active · 9 Aug 2026",
    level: "info",
  },
  {
    id: "a4",
    category: "Inventory",
    title: "Low Stock — 9 products",
    body: "Rice (25kg), Cooking Oil (5L) and 7 others are below their minimum stock level.",
    meta: "Active · 10 Aug 2026",
    level: "warn",
    storeOnly: true,
  },
  {
    id: "a5",
    category: "Inventory",
    title: "Out of Stock — 3 products",
    body: "Cooking Oil (5L) and Tomato Paste are fully out of stock and losing sales.",
    meta: "Active · 10 Aug 2026",
    level: "warn",
    storeOnly: true,
  },
  {
    id: "a6",
    category: "Expense",
    title: "High Expense Alert",
    body: "Expenses increased 15% this month, driven mainly by transport costs at Ajah.",
    meta: "Active · 10 Aug 2026",
    level: "warn",
  },
  {
    id: "a7",
    category: "Operational",
    title: "Daily Cash Submission",
    body: "All branches submitted daily cash on time this week.",
    meta: "Clear · 10 Aug 2026",
    level: "good",
  },
];

const initialAuditLogs: AuditLogItem[] = [
  {
    id: "l1",
    action: "Supplier Credit adjusted ₦100,000 → ₦80,000",
    user: "Amina Okafor (Owner)",
    time: "Today, 9:12 AM",
  },
  {
    id: "l2",
    action: "New branch manager invited — Chidi Nwosu",
    user: "Amina Okafor (Owner)",
    time: "Yesterday, 4:03 PM",
  },
  {
    id: "l3",
    action: "Daily Cash recorded — ₦148,000",
    user: "Tunde Balogun (Manager - Yaba)",
    time: "Yesterday, 8:56 PM",
  },
  {
    id: "l4",
    action: "Receipt verified & approved — Delta Foods Ltd.",
    user: "Audit Team — Central",
    time: "Yesterday, 2:20 PM",
  },
  {
    id: "l5",
    action: "Branch health recalculation triggered",
    user: "System Daemon",
    time: "Yesterday, 12:00 AM",
  },
];

const initialBranches: BranchInfo[] = [
  {
    id: "b1",
    name: "Yaba Main",
    manager: "Tunde Balogun",
    score: 88,
    status: "active",
    location: "Lagos Mainland",
    syncStatus: "Synced · 2 min ago",
  },
  {
    id: "b2",
    name: "Surulere",
    manager: "Unassigned",
    score: 71,
    status: "unassigned",
    location: "Lagos Central",
    syncStatus: "Synced · 14 min ago",
  },
  {
    id: "b3",
    name: "Ikeja",
    manager: "Kemi Adeyemi",
    score: 76,
    status: "active",
    location: "Lagos Island / Ikeja",
    syncStatus: "2 records pending — offline",
    isOffline: true,
  },
  {
    id: "b4",
    name: "Ajah",
    manager: "Chidi Nwosu",
    score: 58,
    status: "invited",
    location: "Lagos Lekki Axis",
    syncStatus: "Synced · 1 hr ago",
  },
];

const createId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>("dashboard");
  const [businessMode, setBusinessMode] = useState<BusinessMode>("store");
  const [userRole, setUserRole] = useState<UserRole>("owner");
  const [selectedBranch, setSelectedBranch] = useState<string>("Yaba Main");

  // Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<DrawerTabId>("stock");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isStyleGuideOpen, setIsStyleGuideOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Data Collections
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sales, setSales] = useState<SaleTransaction[]>(initialSales);
  const [receipts, setReceipts] = useState<ReceiptItem[]>(initialReceipts);
  const [alerts] = useState<AlertItem[]>(initialAlerts);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [branches] = useState<BranchInfo[]>(initialBranches);
  const [isMonthLocked, setIsMonthLocked] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    message: string,
    type: "success" | "info" | "warning" = "success"
  ) => {
    const id = createId("toast");
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openDrawer = (tab: DrawerTabId = "stock") => {
    setDrawerTab(tab);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);
  const openOcrModal = () => setIsOcrModalOpen(true);
  const closeOcrModal = () => setIsOcrModalOpen(false);
  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);
  const openStyleGuide = () => setIsStyleGuideOpen(true);
  const closeStyleGuide = () => setIsStyleGuideOpen(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openVoiceModal = () => setIsVoiceModalOpen(true);
  const closeVoiceModal = () => setIsVoiceModalOpen(false);

  const addProduct = (newProd: Omit<Product, "id">) => {
    const id = createId("p");
    setProducts((prev) => [{ id, ...newProd }, ...prev]);
    addAuditLog(`Added new product: ${newProd.name} (${newProd.sku})`);
    showToast(`Product "${newProd.name}" added to inventory.`);
  };

  const recordSale = (saleData: Omit<SaleTransaction, "id" | "time">) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const id = createId("s");
    setSales((prev) => [{ id, time: timeStr, ...saleData }, ...prev]);

    // Automatically update stock if matched
    setProducts((prev) =>
      prev.map((p) => {
        if (p.name.toLowerCase().includes(saleData.productName.toLowerCase())) {
          const newQty = Math.max(0, p.quantity - saleData.quantity);
          const status =
            newQty === 0 ? "outstock" : newQty <= p.minLevel ? "lowstock" : "instock";
          return { ...p, quantity: newQty, status };
        }
        return p;
      })
    );

    addAuditLog(`Sale recorded: ₦${saleData.amount.toLocaleString()} for ${saleData.productName}`);
    showToast(`Sale of ₦${saleData.amount.toLocaleString()} recorded successfully.`);
  };

  const addReceipt = (newRc: Omit<ReceiptItem, "id">) => {
    const id = createId("rc");
    setReceipts((prev) => [{ id, ...newRc }, ...prev]);
    addAuditLog(`Receipt stored: ${newRc.supplier} — ₦${newRc.amount.toLocaleString()}`);
  };

  const addAuditLog = (action: string, user = "Amina Okafor (Owner)") => {
    const time = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setAuditLogs((prev) => [{ id: createId("l"), action, user, time }, ...prev]);
  };

  const lockCurrentMonth = () => {
    setIsMonthLocked(true);
    addAuditLog("August 2026 financial reconciliation closed and locked", "Audit Team — Central");
    showToast("Monthly reconciliation locked successfully.");
  };

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        businessMode,
        setBusinessMode,
        userRole,
        setUserRole,
        selectedBranch,
        setSelectedBranch,

        isDrawerOpen,
        drawerTab,
        openDrawer,
        closeDrawer,
        setDrawerTab,

        isUserModalOpen,
        openUserModal,
        closeUserModal,

        isOcrModalOpen,
        openOcrModal,
        closeOcrModal,

        isWizardOpen,
        openWizard,
        closeWizard,

        isStyleGuideOpen,
        openStyleGuide,
        closeStyleGuide,

        isLoginOpen,
        openLogin,
        closeLogin,

        isVoiceModalOpen,
        openVoiceModal,
        closeVoiceModal,

        products,
        addProduct,
        sales,
        recordSale,
        receipts,
        addReceipt,
        alerts,
        auditLogs,
        addAuditLog,
        branches,
        isMonthLocked,
        lockCurrentMonth,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
