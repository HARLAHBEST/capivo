"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Plus, ShoppingBag, CreditCard, Banknote, Calendar } from "lucide-react";

export function SalesView() {
  const { sales, openDrawer, branches } = useAppState();
  const { t } = useLanguage();

  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [paymentFilter, setPaymentFilter] = useState<"All" | "Cash" | "Credit">("All");

  const filteredSales = sales.filter((s) => {
    if (branchFilter !== "All Branches" && s.branch !== branchFilter) return false;
    if (paymentFilter !== "All" && s.paymentType !== paymentFilter) return false;
    return true;
  });

  const totalSalesAmount = filteredSales.reduce((sum, s) => sum + s.amount, 0);
  const cashSalesAmount = filteredSales
    .filter((s) => s.paymentType === "Cash")
    .reduce((sum, s) => sum + s.amount, 0);
  const creditSalesAmount = filteredSales
    .filter((s) => s.paymentType === "Credit")
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Sales Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="card stat-card">
          <div className="stat-label">{t("todaysSales")}</div>
          <div className="stat-value">₦{totalSalesAmount.toLocaleString()}</div>
          <div className="stat-caption">{filteredSales.length} total transactions</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Cash Received</div>
          <div className="stat-value text-[var(--green)]">
            ₦{cashSalesAmount.toLocaleString()}
          </div>
          <div className="stat-caption">Paid upfront in full</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Credit Sales</div>
          <div className="stat-value text-[var(--ochre)]">
            ₦{creditSalesAmount.toLocaleString()}
          </div>
          <div className="stat-caption">Given to customers on debt</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Top Selling Item</div>
          <div className="stat-value text-base">Rice 25kg Bag</div>
          <div className="stat-caption">11 units sold today</div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <select
            className="filter-select"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option value="All Branches">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value as "All" | "Cash" | "Credit")}
          >
            <option value="All">All Payment Types</option>
            <option value="Cash">Cash Only</option>
            <option value="Credit">Credit Sales Only</option>
          </select>
        </div>

        <button className="btn-primary" onClick={() => openDrawer("sale")}>
          <Plus className="w-4 h-4" />
          <span>{t("recordSale")}</span>
        </button>
      </div>

      {/* Sales Transactions Table */}
      <div className="card overflow-x-auto">
        <div className="sale-row bg-[var(--paper-deep)] text-[10.7px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
          <div>Product</div>
          <div>Qty</div>
          <div>Branch</div>
          <div>Payment Type</div>
          <div>Amount</div>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {filteredSales.map((sale) => (
            <div key={sale.id} className="sale-row hover:bg-black/[0.01]">
              <div className="font-medium text-[var(--ink)]">
                {sale.productName}
                {sale.customerName && (
                  <div className="text-[11px] text-[var(--ink-soft)] font-normal">
                    Customer: {sale.customerName}
                  </div>
                )}
              </div>
              <div className="font-mono text-xs">{sale.quantity}</div>
              <div className="text-xs">{sale.branch}</div>
              <div>
                <span
                  className={`status-tag ${
                    sale.paymentType === "Cash" ? "cash" : "credit"
                  }`}
                >
                  {sale.paymentType}
                </span>
                <span className="text-[10px] text-[var(--ink-soft)] block font-mono">
                  {sale.time}
                </span>
              </div>
              <div className="font-mono font-semibold text-[var(--indigo-900)]">
                ₦{sale.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
