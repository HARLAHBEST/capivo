"use client";

import React from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Lock, Check, TrendingUp, TrendingDown, Scale } from "lucide-react";

export function ReconciliationView() {
  const { isMonthLocked, lockCurrentMonth, branches } = useAppState();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Month Closing Status Bar */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <span className={`status-badge ${isMonthLocked ? "closed" : ""}`}>
          {isMonthLocked
            ? "Closed & Locked · August 2026 Books Finalized"
            : t("underReviewCloses")}
        </span>

        <div className="flex gap-2">
          <button className="btn-secondary text-xs">
            {t("comparePreviousMonths")}
          </button>
          {!isMonthLocked && (
            <button className="btn-primary" onClick={lockCurrentMonth}>
              <Lock className="w-3.5 h-3.5" />
              <span>{t("closeAndLockMonth")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Financial Metrics Variance Comparison Table */}
      <div className="card overflow-x-auto">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Financial Metric</th>
              <th>This Month (Aug 2026)</th>
              <th>Previous Month (Jul 2026)</th>
              <th>Variance Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">{t("estimatedProfit")}</td>
              <td>₦1,284,600</td>
              <td>₦1,209,800</td>
              <td className="text-[var(--green)] font-semibold">+6.2%</td>
            </tr>
            <tr>
              <td className="font-semibold">{t("capitalPosition")}</td>
              <td>₦8,940,000</td>
              <td>₦8,610,000</td>
              <td className="text-[var(--green)] font-semibold">+3.8%</td>
            </tr>
            <tr>
              <td className="font-semibold">Total Stock Purchases</td>
              <td>₦2,940,000</td>
              <td>₦2,715,000</td>
              <td className="text-[var(--ink-soft)] font-semibold">+8.3%</td>
            </tr>
            <tr>
              <td className="font-semibold">Operating Expenses</td>
              <td>₦418,200</td>
              <td>₦363,600</td>
              <td className="text-[var(--terracotta)] font-semibold">+15.0%</td>
            </tr>
            <tr>
              <td className="font-semibold">Customer Credit Owed</td>
              <td>₦2,105,000</td>
              <td>₦1,784,000</td>
              <td className="text-[var(--terracotta)] font-semibold">+18.0%</td>
            </tr>
            <tr>
              <td className="font-semibold">Supplier Debt Owing</td>
              <td>₦940,000</td>
              <td>₦1,012,000</td>
              <td className="text-[var(--green)] font-semibold">−7.1%</td>
            </tr>
            <tr>
              <td className="font-semibold">Bank Deposits Verified</td>
              <td>₦1,860,000</td>
              <td>₦1,704,000</td>
              <td className="text-[var(--green)] font-semibold">+9.2%</td>
            </tr>
            <tr>
              <td className="font-semibold">Loss & Spoilage Incidents</td>
              <td>₦38,200</td>
              <td>₦43,400</td>
              <td className="text-[var(--green)] font-semibold">−12.0%</td>
            </tr>
            <tr>
              <td className="font-semibold">Overall Business Health Score</td>
              <td>78 / 100</td>
              <td>74 / 100</td>
              <td className="text-[var(--green)] font-semibold">+4 pts</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Branch Performance Summary This Month */}
      <div className="card panel">
        <div className="panel-head">
          <h2>{t("branchPerformance")} — This Period</h2>
          <div className="pill">4 Locations</div>
        </div>
        <div className="space-y-3">
          {branches.map((b) => (
            <div key={b.id} className="branch-row">
              <div className="branch-name">{b.name}</div>
              <div className="branch-bar-track">
                <div
                  className={`branch-bar-fill ${
                    b.score >= 75 ? "" : b.score >= 60 ? "mid" : "bg-[var(--terracotta)]"
                  }`}
                  style={{ width: `${b.score}%` }}
                />
              </div>
              <div className="branch-score">{b.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
