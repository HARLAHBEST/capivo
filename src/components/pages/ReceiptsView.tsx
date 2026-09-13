"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Plus, FileText, Camera } from "lucide-react";

export function ReceiptsView() {
  const { receipts, openDrawer, openOcrModal, branches } = useAppState();
  const { t } = useLanguage();

  const [typeFilter, setTypeFilter] = useState<"All" | "Purchase" | "Expense">("All");
  const [branchFilter, setBranchFilter] = useState("All Branches");

  const filteredReceipts = receipts.filter((rc) => {
    if (typeFilter !== "All" && rc.type !== typeFilter) return false;
    if (branchFilter !== "All Branches" && rc.branch !== branchFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter Bar */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-white border border-[var(--line)] rounded-full p-1 shadow-xs">
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                typeFilter === "All"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setTypeFilter("All")}
            >
              All ({receipts.length})
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                typeFilter === "Purchase"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setTypeFilter("Purchase")}
            >
              Purchases
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                typeFilter === "Expense"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setTypeFilter("Expense")}
            >
              Expenses
            </button>
          </div>

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
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={openOcrModal}>
            <Camera className="w-4 h-4 text-[var(--ochre)]" />
            <span>AI OCR Scan</span>
          </button>
          <button className="btn-primary" onClick={() => openDrawer("stock")}>
            <Plus className="w-4 h-4" />
            <span>Add Receipt</span>
          </button>
        </div>
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredReceipts.map((rc) => (
          <div key={rc.id} className="card receipt-card flex flex-col justify-between">
            <div>
              <div className="rc-thumb">
                <FileText className="w-6 h-6 text-[var(--ink-soft)] opacity-75" />
              </div>
              <div className="rc-type font-mono">{rc.type}</div>
              <div className="rc-supplier font-semibold">{rc.supplier}</div>
              <div className="rc-meta">
                {rc.branch} · {rc.date}
              </div>
            </div>
            <div className="rc-amount mt-3 text-[var(--indigo-900)]">
              ₦{rc.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
