"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import {
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Truck,
  AlertTriangle,
  Building2,
  ShieldCheck,
  Activity,
  Layers,
  Download,
  CheckCircle,
} from "lucide-react";

export function ReportsView() {
  const { showToast } = useAppState();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const reportList = [
    {
      id: "r1",
      title: "Stock Purchase Report",
      desc: "All recorded stock purchases, supplier invoices and verified receipts.",
      icon: ShoppingBag,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r2",
      title: "Business Expense Report",
      desc: "All operating expenses categorized by transport, fuel, repairs, and branch.",
      icon: TrendingUp,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r3",
      title: "Customer Credit & Debtors",
      desc: "Detailed aging breakdown of outstanding customer balances by account.",
      icon: UserCheck,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r4",
      title: "Supplier Credit & Payables",
      desc: "Outstanding supplier obligations, payment terms, and upcoming due dates.",
      icon: Truck,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r5",
      title: "Loss & Damage Log",
      desc: "Recorded inventory spoilage, damage, expired goods, and shrinkage.",
      icon: AlertTriangle,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r6",
      title: "Bank Deposit Reconciliation",
      desc: "Money transferred from shop floor cash drawers into bank accounts.",
      icon: Building2,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r7",
      title: "Capital & Equity Report",
      desc: "Capital position movement, baseline comparison, and net worth trend.",
      icon: ShieldCheck,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r8",
      title: "Business Health & Diagnostics",
      desc: "Overall condition score, liquidity ratios, and risk indicators.",
      icon: Activity,
      lastGenerated: "1 Aug 2026",
    },
    {
      id: "r9",
      title: "Branch Comparative Performance",
      desc: "Side-by-side branch revenue, profitability, and operational scorecards.",
      icon: Layers,
      lastGenerated: "1 Aug 2026",
    },
  ];

  const handleGenerate = (title: string) => {
    setGeneratingReport(title);
    setTimeout(() => {
      setGeneratingReport(null);
      showToast(`Report "${title}" generated and downloaded successfully.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold">Financial & Operational Reports</h2>
          <p className="text-xs text-[var(--ink-soft)]">
            Export audit-ready PDF summaries and CSV spreadsheets for bankers, accountants, or internal review.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-secondary text-xs"
            onClick={() => handleGenerate("Complete Monthly Package")}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Full Monthly Pack</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportList.map((rep) => {
          const Icon = rep.icon;
          const isCurrent = generatingReport === rep.title;

          return (
            <div key={rep.id} className="card report-card flex flex-col justify-between">
              <div>
                <div className="report-icon">
                  <Icon className="w-5 h-5 text-[var(--ochre-soft)]" />
                </div>
                <h3>{rep.title}</h3>
                <p>{rep.desc}</p>
              </div>

              <div className="report-foot mt-4">
                <span>Last: {rep.lastGenerated}</span>
                <button
                  className="btn-ghost flex items-center gap-1 font-semibold text-xs"
                  onClick={() => handleGenerate(rep.title)}
                  disabled={isCurrent}
                >
                  {isCurrent ? (
                    <span className="text-[var(--green)] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 animate-spin" /> Generating...
                    </span>
                  ) : (
                    <span>Generate →</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
