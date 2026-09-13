"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { VoiceMicButton } from "../voice/VoiceMicButton";
import { Search, Bell, Plus, Menu, LogOut } from "lucide-react";

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const {
    currentPage,
    userRole,
    businessMode,
    selectedBranch,
    openDrawer,
    alerts,
  } = useAppState();

  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageHeadings: Record<string, { title: string; breadcrumb: string }> = {
    dashboard: {
      title:
        userRole === "owner"
          ? t("ownerDashboard")
          : userRole === "worker"
          ? `${selectedBranch} · ${t("branchManagerDashboard")}`
          : t("auditTeamDashboard"),
      breadcrumb: `Ilé Provisions · ${
        businessMode === "store" ? t("storeWholesale") : t("shopRetail")
      } · ${userRole === "worker" ? selectedBranch : t("allBranches")} · 11 Aug 2026`,
    },
    inventory: {
      title: t("inventory"),
      breadcrumb: "128 SKUs · 9 low stock · 3 out of stock",
    },
    sales: {
      title: t("sales"),
      breadcrumb: "Today · 19 transactions across 4 branches",
    },
    profit: {
      title: t("profitAndCogs"),
      breadcrumb: "August 2026 · Revenue, COGS, and profit margin",
    },
    receipts: {
      title: t("receiptArchive"),
      breadcrumb: "Ilé Provisions · 218 receipts verified and stored",
    },
    reports: {
      title: t("reports"),
      breadcrumb: "Financial & operational reports generator",
    },
    alerts: {
      title: t("alertsAndInsights"),
      breadcrumb: "Active business alerts and growth recommendations",
    },
    lissafi: {
      title: t("monthlyReconciliation"),
      breadcrumb: "August 2026 · Books closing and variance verification",
    },
    users: {
      title: t("usersAndBranches"),
      breadcrumb: "5 staff accounts · 4 business locations",
    },
    security: {
      title: t("securityAndAudit"),
      breadcrumb: "2FA, offline data encryption and immutable audit logs",
    },
  };

  const currentHeading = pageHeadings[currentPage] || {
    title: t("dashboard"),
    breadcrumb: "Ilé Provisions",
  };

  return (
    <header className="topbar">
      {/* Topbar Left: Mobile Menu & Titles */}
      <div className="topbar-left">
        <button
          className="menu-btn md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5 text-[var(--ink)]" />
        </button>

        <div>
          <h1 className="leading-tight">{currentHeading.title}</h1>
          <div className="breadcrumb">{currentHeading.breadcrumb}</div>
        </div>
      </div>

      {/* Topbar Right: Search, Language, Voice, Notifications & Action */}
      <div className="topbar-right">
        {/* Search */}
        <div className="search-box">
          <Search className="w-3.5 h-3.5 text-[var(--ink-soft)]" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Language Selector */}
        <LanguageSelector />

        {/* Voice AI Mic */}
        <div className="hidden sm:flex">
          <VoiceMicButton variant="topbar" />
        </div>

        {/* Notification Bell & Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            className="icon-btn"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[var(--ink)]" />
            {alerts.length > 0 && <span className="dot-badge" />}
          </button>

          {isNotifOpen && (
            <div className="dropdown open">
              <div className="dropdown-head">
                <span>{t("notifications")}</span>
                <button
                  className="btn-ghost text-[11px]"
                  onClick={() => setIsNotifOpen(false)}
                >
                  {t("markAllRead")}
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {alerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="dropdown-item">
                    <div className={`alert-dot ${alert.level}`} />
                    <div>
                      <div className="font-semibold text-xs text-[var(--ink)]">
                        {alert.title}
                      </div>
                      <div className="text-[11px] text-[var(--ink-soft)] leading-snug">
                        {alert.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Entry Button */}
        <button className="btn-primary px-3 py-2 sm:px-4" onClick={() => openDrawer("stock")}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{t("newEntry")}</span>
        </button>

        {/* User avatar + logout */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-2 border-l border-[var(--line)]">
            <div
              className="w-7 h-7 rounded-full bg-[var(--indigo-900)] text-[var(--ochre-soft)] flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              title={currentUser.name}
            >
              {currentUser.initials}
            </div>
            <button
              onClick={logout}
              className="icon-btn text-[var(--ink-soft)] hover:text-[var(--terracotta)] transition"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
