"use client";

import React from "react";
import { useAppState } from "../../context/AppStateContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { PageId } from "../../types";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  FileText,
  BarChart3,
  ShieldAlert,
  Scale,
  Users,
  ShieldCheck,
  PlusCircle,
  LogOut,
} from "lucide-react";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    currentPage,
    setCurrentPage,
    businessMode,
    setBusinessMode,
    alerts,
  } = useAppState();

  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();

  const userRole = currentUser?.role ?? "owner";
  const isStore = businessMode === "store";
  const isOwner = userRole === "owner";
  const isAudit = userRole === "lissafiTeam";

  const activeAlertCount = alerts.filter(
    (a) => a.level === "warn" && (!a.storeOnly || isStore)
  ).length;

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    onClose();
  };

  const handleModeChange = (mode: "shop" | "store") => {
    setBusinessMode(mode);
    if (mode === "shop" && (currentPage === "inventory" || currentPage === "sales" || currentPage === "profit")) {
      setCurrentPage("dashboard");
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      {/* Brand Logo */}
      <div className="logo cursor-pointer" onClick={() => handleNavClick("dashboard")}>
        <div className="logo-mark">C</div>
        <div>
          <div className="logo-text">{t("appName")}</div>
          <div className="logo-sub">
            {isStore ? t("storeWholesale") : t("shopRetail")}
          </div>
        </div>
      </div>

      {/* Business Mode Toggle (Shop vs. Store) — owner/worker only */}
      {!isAudit && (
        <div className="mode-toggle">
          <button
            className={businessMode === "shop" ? "active" : ""}
            onClick={() => handleModeChange("shop")}
          >
            Shop
          </button>
          <button
            className={businessMode === "store" ? "active" : ""}
            onClick={() => handleModeChange("store")}
          >
            Store
          </button>
        </div>
      )}

      {/* Navigation - Overview (hidden for audit team except dashboard) */}
      {!isAudit && (
        <>
          <div className="nav-label">{t("navOverview")}</div>
          <div className="nav">
            <div
              className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
              onClick={() => handleNavClick("dashboard")}
            >
              <LayoutDashboard />
              <span>{t("dashboard")}</span>
            </div>

            {isStore && (
              <>
                <div
                  className={`nav-item ${currentPage === "inventory" ? "active" : ""}`}
                  onClick={() => handleNavClick("inventory")}
                >
                  <Package />
                  <span>{t("inventory")}</span>
                </div>

                <div
                  className={`nav-item ${currentPage === "sales" ? "active" : ""}`}
                  onClick={() => handleNavClick("sales")}
                >
                  <ShoppingCart />
                  <span>{t("sales")}</span>
                </div>

                {/* Profit visible to owner only */}
                {isOwner && (
                  <div
                    className={`nav-item ${currentPage === "profit" ? "active" : ""}`}
                    onClick={() => handleNavClick("profit")}
                  >
                    <TrendingUp />
                    <span>{t("profitAndCogs")}</span>
                  </div>
                )}
              </>
            )}

            <div
              className={`nav-item ${currentPage === "receipts" ? "active" : ""}`}
              onClick={() => handleNavClick("receipts")}
            >
              <FileText />
              <span>{t("receiptArchive")}</span>
            </div>

            {isOwner && (
              <div
                className={`nav-item ${currentPage === "reports" ? "active" : ""}`}
                onClick={() => handleNavClick("reports")}
              >
                <BarChart3 />
                <span>{t("reports")}</span>
              </div>
            )}

            <div
              className={`nav-item ${currentPage === "alerts" ? "active" : ""}`}
              onClick={() => handleNavClick("alerts")}
            >
              <ShieldAlert />
              <span>{t("alertsAndInsights")}</span>
              {activeAlertCount > 0 && (
                <span className="nav-badge">{activeAlertCount}</span>
              )}
            </div>
          </div>

          <div className="nav-divider" />
        </>
      )}

      {/* Navigation - Operations */}
      <div className="nav-label">{t("navOperations")}</div>
      <div className="nav">
        {isAudit && (
          <div
            className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => handleNavClick("dashboard")}
          >
            <LayoutDashboard />
            <span>{t("dashboard")}</span>
          </div>
        )}

        <div
          className={`nav-item ${currentPage === "lissafi" ? "active" : ""}`}
          onClick={() => handleNavClick("lissafi")}
        >
          <Scale />
          <span>{t("monthlyReconciliation")}</span>
        </div>

        {/* Users & Branches — owner only */}
        {isOwner && (
          <div
            className={`nav-item ${currentPage === "users" ? "active" : ""}`}
            onClick={() => handleNavClick("users")}
          >
            <Users />
            <span>{t("usersAndBranches")}</span>
          </div>
        )}

        <div
          className={`nav-item ${currentPage === "security" ? "active" : ""}`}
          onClick={() => handleNavClick("security")}
        >
          <ShieldCheck />
          <span>{t("securityAndAudit")}</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* New Business Wizard Trigger — owner only */}
      {isOwner && (
        <button
          onClick={() => {
            onClose();
          }}
          className="text-[11.5px] text-[#9CA6C4] hover:text-[var(--ochre-soft)] py-2 text-center transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{t("setupNewBusiness")}</span>
        </button>
      )}

      {/* Offline / Online Sync Indicator */}
      <div className="sync-pill">
        <div className="sync-dot" />
        <span>{t("syncedJustNow")}</span>
      </div>

      {/* User Footer */}
      <div className="sidebar-foot">
        <div className="avatar">{currentUser?.initials ?? "??"}</div>
        <div className="flex-1 min-w-0">
          <div className="text-[#EFE9D8] font-medium text-[12.3px] truncate">
            {currentUser?.name ?? "User"}
          </div>
          <div className="text-[10.8px] text-[#8B94AC] truncate">
            {currentUser?.roleLabel} · {currentUser?.businessName?.split(" · ")[0]}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex-shrink-0 text-[#6B7492] hover:text-[var(--ochre-soft)] transition p-1 rounded"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
