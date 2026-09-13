"use client";

import React from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Clock,
  UserCheck,
  CreditCard,
  Truck,
  AlertTriangle,
  Building2,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";

export function DashboardView() {
  const {
    userRole,
    setUserRole,
    businessMode,
    selectedBranch,
    setSelectedBranch,
    openDrawer,
    setCurrentPage,
    receipts,
    alerts,
    branches,
  } = useAppState();

  const { t } = useLanguage();
  const isStore = businessMode === "store";

  return (
    <div className="space-y-6">
      {/* Top Role Selector and Branch Filter */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        {userRole === "worker" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--ink-soft)] font-medium">
              {t("viewingAsManager")}
            </span>
            <select
              className="border border-[var(--line)] bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--ink)]"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name} — {b.manager}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="ml-auto role-switch">
          <button
            className={userRole === "owner" ? "active" : ""}
            onClick={() => setUserRole("owner")}
          >
            {t("roleOwner")}
          </button>
          <button
            className={userRole === "worker" ? "active" : ""}
            onClick={() => setUserRole("worker")}
          >
            {t("roleBranchManager")}
          </button>
          <button
            className={userRole === "lissafiTeam" ? "active" : ""}
            onClick={() => setUserRole("lissafiTeam")}
          >
            {t("roleAuditTeam")}
          </button>
        </div>
      </div>

      {/* ================= 1. OWNER VIEW ================= */}
      {userRole === "owner" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hero Row: Health Score Seal & Primary Financial Stats */}
          <div className="hero-row">
            <div className="card score-card">
              <div className="seal">
                <div className="num">78</div>
                <div className="max">{t("healthScoreOutOf")}</div>
              </div>
              <div className="score-status">{t("scoreStable")}</div>
              <div className="score-note">{t("scoreNote")}</div>
            </div>

            <div className="stat-grid">
              <div className="card stat-card">
                <div className="stat-label">{t("estimatedProfit")}</div>
                <div className="stat-value">₦1,284,600</div>
                <div className="stat-delta up">
                  <TrendingUp className="w-3.5 h-3.5 inline" /> ↑ 6.2% vs last month
                </div>
                <div className="stat-caption">Estimate — based on recorded entries</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("capitalPosition")}</div>
                <div className="stat-value">₦8,940,000</div>
                <div className="stat-delta up">
                  <TrendingUp className="w-3.5 h-3.5 inline" /> ↑ ₦410,000 vs baseline
                </div>
                <div className="stat-caption">Cash + Bank + Stock + Credit − Owing</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("cashPosition")}</div>
                <div className="stat-value">₦612,000</div>
                <div className="stat-delta down">
                  <TrendingDown className="w-3.5 h-3.5 inline" /> ↓ 3 branches below average
                </div>
                <div className="stat-caption">In-shop + bank, today</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("customerCreditOwed")}</div>
                <div className="stat-value">₦2,105,000</div>
                <div className="stat-delta down">
                  <TrendingDown className="w-3.5 h-3.5 inline" /> ↑ 18% — above comfort range
                </div>
                <div className="stat-caption">Across 47 open accounts</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("supplierCreditOwing")}</div>
                <div className="stat-value">₦940,000</div>
                <div className="stat-delta up">
                  <ShieldCheck className="w-3.5 h-3.5 inline text-[var(--green)]" /> On schedule
                </div>
                <div className="stat-caption">2 payments due this week</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("lossAndDamage")}</div>
                <div className="stat-value">₦38,200</div>
                <div className="stat-delta up">
                  <TrendingDown className="w-3.5 h-3.5 inline" /> ↓ 12% vs last month
                </div>
                <div className="stat-caption">4 incidents recorded</div>
              </div>
            </div>
          </div>

          {/* Store-only Extra SKUs and Sales Row */}
          {isStore && (
            <div className="stat-grid">
              <div className="card stat-card">
                <div className="stat-label">{t("todaysSales")}</div>
                <div className="stat-value">₦296,400</div>
                <div className="stat-delta up">↑ 19 transactions today</div>
                <div className="stat-caption">Across 4 branches</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("stockValue")}</div>
                <div className="stat-value">₦4,120,000</div>
                <div className="stat-delta up">128 products tracked</div>
                <div className="stat-caption">Purchase-price basis</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("availableProducts")}</div>
                <div className="stat-value">112</div>
                <div className="stat-delta up">of 128 total SKUs</div>
                <div className="stat-caption">In stock across branches</div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("lowStock")}</div>
                <div className="stat-value text-[var(--ochre)]">9</div>
                <div className="stat-delta down">Needs reorder soon</div>
                <div className="stat-caption">
                  <button
                    className="btn-ghost p-0"
                    onClick={() => setCurrentPage("inventory")}
                  >
                    View products →
                  </button>
                </div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("outOfStock")}</div>
                <div className="stat-value text-[var(--terracotta)]">3</div>
                <div className="stat-delta down">Losing potential sales</div>
                <div className="stat-caption">
                  <button
                    className="btn-ghost p-0"
                    onClick={() => setCurrentPage("inventory")}
                  >
                    View products →
                  </button>
                </div>
              </div>

              <div className="card stat-card">
                <div className="stat-label">{t("grossProfitMonth")}</div>
                <div className="stat-value">₦1,860,000</div>
                <div className="stat-delta up">Margin: 31.4%</div>
                <div className="stat-caption">Revenue − Cost of Goods Sold</div>
              </div>
            </div>
          )}

          {/* Body Grid: Trends, Branch Comparison, Recent Receipts & Alerts */}
          <div className="body-grid">
            <div className="space-y-5">
              {/* Capital Trend Chart */}
              <div className="card panel">
                <div className="panel-head">
                  <h2>{t("capitalTrend")}</h2>
                  <div className="pill">Last 6 months</div>
                </div>
                <svg className="trend-svg" viewBox="0 0 560 120" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="560" y2="30" stroke="#DED4B9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="560" y2="60" stroke="#DED4B9" strokeWidth="1" />
                  <line x1="0" y1="90" x2="560" y2="90" stroke="#DED4B9" strokeWidth="1" />
                  <polyline
                    points="10,85 100,78 190,66 280,70 370,48 460,40 550,22"
                    fill="none"
                    stroke="#C08A1E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="550" cy="22" r="4.5" fill="#161F38" />
                </svg>
                <div className="trend-labels">
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY</span>
                  <span>JUN</span>
                  <span>JUL</span>
                  <span>AUG</span>
                </div>
              </div>

              {/* Branch Performance Comparison */}
              <div className="card panel">
                <div className="panel-head">
                  <h2>{t("branchPerformance")}</h2>
                  <div className="pill">4 branches</div>
                </div>
                <div className="space-y-2.5">
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

              {/* Recent Receipts Strip */}
              <div className="card panel">
                <div className="panel-head">
                  <h2>{t("recentReceipts")}</h2>
                  <button
                    className="pill cursor-pointer hover:bg-white"
                    onClick={() => setCurrentPage("receipts")}
                  >
                    {t("viewArchive")}
                  </button>
                </div>
                <div className="receipt-strip">
                  {receipts.slice(0, 5).map((rc) => (
                    <div key={rc.id} className="receipt-chip">
                      <div className="rc-top">
                        <span>{rc.date.slice(0, 6)}</span>
                        <span>{rc.branch.split(" ")[0]}</span>
                      </div>
                      <div className="rc-amt">₦{rc.amount.toLocaleString()}</div>
                      <div className="rc-name">{rc.supplier}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Alerts & Smart Insight */}
            <div className="space-y-5">
              <div className="card panel">
                <div className="panel-head">
                  <h2>Alerts</h2>
                  <button
                    className="pill cursor-pointer hover:bg-white"
                    onClick={() => setCurrentPage("alerts")}
                  >
                    {t("viewAll")}
                  </button>
                </div>
                <div className="divide-y divide-[var(--line)]">
                  {alerts.slice(0, 4).map((alert) => (
                    <div key={alert.id} className="alert-item py-3">
                      <div className={`alert-dot ${alert.level}`} />
                      <div>
                        <div className="alert-title">{alert.title}</div>
                        <div className="alert-body">{alert.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card panel">
                <div className="panel-head">
                  <h2>{t("insight")}</h2>
                </div>
                <div className="insight-box">
                  <div className="k">{t("thisMonth")}</div>
                  <p>
                    Expenses increased 15% while estimated profit grew moderately.
                    Transport and fuel costs at the Ajah branch were the largest
                    contributor to overhead.
                  </p>
                  <div
                    className="action"
                    onClick={() => setCurrentPage("reports")}
                  >
                    → Review transport & delivery costs at Ajah
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. BRANCH MANAGER VIEW ================= */}
      {userRole === "worker" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="card panel bg-[var(--paper-deep)] border-dashed flex items-center gap-3 p-4">
            <Building2 className="w-5 h-5 text-[var(--indigo-800)] flex-shrink-0" />
            <div className="text-xs text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)]">Owner / Manager View</strong> — you are
              managing operations for <span className="font-bold text-[var(--indigo-900)]">{selectedBranch}</span>.
              Use quick actions below to log daily cash, purchases, sales, and expenses.
            </div>
          </div>

          <div className="card today-strip">
            <div className="today-item">
              <div className="tl">{t("todaysCash")}</div>
              <div className="tv">₦148,000</div>
            </div>
            <div className="today-item">
              <div className="tl">Branch</div>
              <div className="tv text-[15px]">{selectedBranch}</div>
            </div>
            <div className="today-item">
              <div className="tl">{t("openCustomerCredit")}</div>
              <div className="tv">₦412,000</div>
            </div>
            <div className="today-item">
              <div className="tl">{t("pendingSync")}</div>
              <div className="tv text-[var(--terracotta)]">2 records</div>
            </div>
          </div>

          <div>
            <h2 className="display text-base font-semibold mb-3">
              {t("recordTodaysActivity")}
            </h2>
          </div>

          <div className="action-grid">
            <div className="card action-tile" onClick={() => openDrawer("stock")}>
              <div className="action-icon">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3>{t("stockPurchase")}</h3>
              <p>{t("stockPurchaseSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("cash")}>
              <div className="action-icon">
                <Clock className="w-5 h-5" />
              </div>
              <h3>{t("dailyCash")}</h3>
              <p>{t("dailyCashSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("ccredit")}>
              <div className="action-icon">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3>{t("customerCredit")}</h3>
              <p>{t("customerCreditSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("cpay")}>
              <div className="action-icon">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3>{t("customerPayment")}</h3>
              <p>{t("customerPaymentSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("scredit")}>
              <div className="action-icon">
                <Truck className="w-5 h-5" />
              </div>
              <h3>{t("supplierCredit")}</h3>
              <p>{t("supplierCreditSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("expense")}>
              <div className="action-icon">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3>{t("expenses")}</h3>
              <p>{t("expensesSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("loss")}>
              <div className="action-icon">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3>{t("lossAndDamageAction")}</h3>
              <p>{t("lossAndDamageSub")}</p>
            </div>

            <div className="card action-tile" onClick={() => openDrawer("deposit")}>
              <div className="action-icon">
                <Building2 className="w-5 h-5" />
              </div>
              <h3>{t("bankDeposit")}</h3>
              <p>{t("bankDepositSub")}</p>
            </div>

            {isStore && (
              <>
                <div className="card action-tile" onClick={() => openDrawer("sale")}>
                  <div className="action-icon">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3>{t("recordSale")}</h3>
                  <p>{t("recordSaleSub")}</p>
                </div>

                <div
                  className="card action-tile"
                  onClick={() => setCurrentPage("inventory")}
                >
                  <div className="action-icon">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3>{t("productSearch")}</h3>
                  <p>{t("productSearchSub")}</p>
                </div>

                <div className="card action-tile" onClick={() => openDrawer("stockin")}>
                  <div className="action-icon">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3>{t("stockIn")}</h3>
                  <p>{t("stockInSub")}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. AUDIT / LISSAFI TEAM VIEW ================= */}
      {userRole === "lissafiTeam" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="card stat-card">
              <div className="stat-label">{t("recordsToReview")}</div>
              <div className="stat-value">142</div>
              <div className="stat-caption">Across 4 branches, this month</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">{t("reviewed")}</div>
              <div className="stat-value text-[var(--green)]">96</div>
              <div className="stat-caption">68% complete</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">{t("flaggedForQuery")}</div>
              <div className="stat-value text-[var(--terracotta)]">5</div>
              <div className="stat-caption">Missing receipt or mismatch</div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">{t("reconciliationClosesIn")}</div>
              <div className="stat-value">4 days</div>
              <div className="stat-caption">31 Aug 2026</div>
            </div>
          </div>

          <div className="card overflow-x-auto">
            <div className="table-head-row">
              <div>Record</div>
              <div>Branch</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            <div className="table-row">
              <div>Stock Purchase — Delta Foods Ltd.</div>
              <div>Yaba Main</div>
              <div className="mono">10 Aug</div>
              <div className="mono font-semibold">₦184,000</div>
              <div>
                <span className="status-tag reviewed">Reviewed</span>
              </div>
            </div>
            <div className="table-row">
              <div>Expense — Transport</div>
              <div>Ajah</div>
              <div className="mono">10 Aug</div>
              <div className="mono font-semibold">₦22,400</div>
              <div>
                <span className="status-tag pending">Pending</span>
              </div>
            </div>
            <div className="table-row">
              <div>Bank Deposit</div>
              <div>Ikeja</div>
              <div className="mono">09 Aug</div>
              <div className="mono font-semibold">₦300,000</div>
              <div>
                <span className="status-tag reviewed">Reviewed</span>
              </div>
            </div>
            <div className="table-row">
              <div>Stock Purchase — Coastal Dist.</div>
              <div>Surulere</div>
              <div className="mono">09 Aug</div>
              <div className="mono font-semibold">₦312,000</div>
              <div>
                <span className="status-tag pending">Pending</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
