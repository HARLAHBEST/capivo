"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "../context/AppStateContext";
import { useAuth } from "../context/AuthContext";

import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { VoiceMicButton } from "../components/voice/VoiceMicButton";
import { VoiceAssistantModal } from "../components/voice/VoiceAssistantModal";
import { QuickAddDrawer } from "../components/modals/QuickAddDrawer";
import { OCRReviewModal } from "../components/modals/OCRReviewModal";
import { CreateUserModal } from "../components/modals/CreateUserModal";
import { SetupWizardModal } from "../components/modals/SetupWizardModal";
import { Toast } from "../components/ui/Toast";

import { DashboardView } from "../components/pages/DashboardView";
import { InventoryView } from "../components/pages/InventoryView";
import { SalesView } from "../components/pages/SalesView";
import { ProfitView } from "../components/pages/ProfitView";
import { ReceiptsView } from "../components/pages/ReceiptsView";
import { ReportsView } from "../components/pages/ReportsView";
import { AlertsView } from "../components/pages/AlertsView";
import { ReconciliationView } from "../components/pages/ReconciliationView";
import { UsersView } from "../components/pages/UsersView";
import { SecurityView } from "../components/pages/SecurityView";

function PageContent() {
  const { currentPage } = useAppState();

  switch (currentPage) {
    case "dashboard":
      return <DashboardView />;
    case "inventory":
      return <InventoryView />;
    case "sales":
      return <SalesView />;
    case "profit":
      return <ProfitView />;
    case "receipts":
      return <ReceiptsView />;
    case "reports":
      return <ReportsView />;
    case "alerts":
      return <AlertsView />;
    case "lissafi":
      return <ReconciliationView />;
    case "users":
      return <UsersView />;
    case "security":
      return <SecurityView />;
    default:
      return <DashboardView />;
  }
}

export default function Page() {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const { setUserRole } = useAppState();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync role from auth user into AppState
  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role);
    }
  }, [currentUser, setUserRole]);

  // Redirect to login if not authenticated and not on signup page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show nothing while checking auth (avoid flash)
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--paper)]">
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "2px solid rgba(192,138,30,0.2)",
              borderTopColor: "var(--ochre)",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span className="text-sm text-[var(--ink-soft)]">Loading Capivo…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <div className="main-area">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="page-content">
          <PageContent />
        </main>
      </div>

      {/* Floating voice mic button */}
      <VoiceMicButton />

      {/* Overlays & Modals */}
      <VoiceAssistantModal />
      <QuickAddDrawer />
      <OCRReviewModal />
      <CreateUserModal />
      <SetupWizardModal />

      {/* Toast notifications */}
      <Toast />
    </div>
  );
}
