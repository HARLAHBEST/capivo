"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";

export function AlertsView() {
  const { alerts, businessMode, setCurrentPage } = useAppState();

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const isStore = businessMode === "store";
  const visibleAlerts = alerts.filter(
    (a) => (!a.storeOnly || isStore) && (activeCategory === "All" || a.category === activeCategory)
  );

  const categories = ["All", "Capital", "Credit", "Expense", "Branch", "Inventory", "Operational"];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <div className="filter-bar">
          {categories.map((cat) => {
            if (cat === "Inventory" && !isStore) return null;
            const count = alerts.filter(
              (a) => (!a.storeOnly || isStore) && (cat === "All" || a.category === cat)
            ).length;
            return (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} {cat === "All" ? `(${visibleAlerts.length})` : `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Alert Cards List */}
      <div className="card divide-y divide-[var(--line)]">
        {visibleAlerts.map((alert) => (
          <div key={alert.id} className="alert-full flex gap-3.5 p-4 items-start">
            <span className={`alert-badge ${alert.level}`}>{alert.category}</span>
            <div className="flex-1">
              <div className="at text-sm font-semibold">{alert.title}</div>
              <div className="ab text-xs text-[var(--ink-soft)] mt-0.5">{alert.body}</div>
              <div className="meta text-[11px] text-[var(--ink-soft)] mt-1.5 font-mono">
                {alert.meta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Insights Section */}
      <div>
        <h2 className="display text-base font-semibold mb-3">Strategic Action Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card panel">
            <div className="insight-box">
              <div className="k">Expense Trend Diagnostics</div>
              <p>
                Operating expenses increased 15% this month while gross margins tightened.
                Fuel and transport overhead at the Ajah branch were the largest contributing factor.
              </p>
              <div
                className="action"
                onClick={() => setCurrentPage("reports")}
              >
                → Review transport logs and optimize logistics routing
              </div>
            </div>
          </div>

          <div className="card panel">
            <div className="insight-box">
              <div className="k">Credit Liquidity Diagnostics</div>
              <p>
                Customer receivables grew faster than debt recoveries for two consecutive months,
                tying up ₦2.1M in idle capital that could otherwise purchase fast-moving inventory.
              </p>
              <div
                className="action"
                onClick={() => setCurrentPage("dashboard")}
              >
                → Tighten credit limits for accounts overdue beyond 14 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
