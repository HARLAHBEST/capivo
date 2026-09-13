"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { UserPlus, Plus, MapPin, User } from "lucide-react";

export function UsersView() {
  const { openUserModal, branches, setCurrentPage, setUserRole, setSelectedBranch } = useAppState();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"users" | "branches">("users");

  const handleViewBranchManager = (branchName: string) => {
    setSelectedBranch(branchName);
    setUserRole("worker");
    setCurrentPage("dashboard");
  };

  const usersList = [
    {
      id: "u1",
      name: "Amina Okafor",
      initials: "AO",
      role: "Owner",
      roleTag: "owner",
      branchAccess: "All branches",
      status: "Active",
      avatarBg: "var(--ochre)",
    },
    {
      id: "u2",
      name: "Tunde Balogun",
      initials: "TB",
      role: "Branch Manager",
      roleTag: "worker",
      branchAccess: "Yaba Main",
      status: "Active",
      avatarBg: "var(--green)",
    },
    {
      id: "u3",
      name: "Kemi Adeyemi",
      initials: "KA",
      role: "Branch Manager",
      roleTag: "worker",
      branchAccess: "Ikeja",
      status: "Active",
      avatarBg: "var(--green)",
    },
    {
      id: "u4",
      name: "Audit & Lissafi Team — Central",
      initials: "LT",
      role: "Audit Team",
      roleTag: "lissafi",
      branchAccess: "All branches",
      status: "Active",
      avatarBg: "var(--indigo-700)",
    },
    {
      id: "u5",
      name: "Chidi Nwosu",
      initials: "CN",
      role: "Branch Manager",
      roleTag: "worker",
      branchAccess: "Ajah",
      status: "Invited",
      avatarBg: "var(--green)",
      isInvited: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Segment Switch */}
      <div className="segmented">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Staff & Managers
        </button>
        <button
          className={activeTab === "branches" ? "active" : ""}
          onClick={() => setActiveTab("branches")}
        >
          Branches & Locations
        </button>
      </div>

      {activeTab === "users" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="card panel bg-[var(--paper-deep)] border-dashed p-4">
            <div className="text-xs text-[var(--ink-soft)] leading-relaxed">
              <strong className="text-[var(--ink)]">As business owner, you hold master administrative control.</strong>{" "}
              You automatically have full live visibility into every branch manager&apos;s daily log and cash reconciliations.
              Invite branch managers and assign specific daily operational privileges below.
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary" onClick={openUserModal}>
              <UserPlus className="w-4 h-4" />
              <span>Create Branch Manager Account</span>
            </button>
          </div>

          <div className="card overflow-x-auto">
            <div className="user-row bg-[var(--paper-deep)] text-[10.7px] uppercase tracking-wider text-[var(--ink-soft)] font-bold">
              <div>Name & Identity</div>
              <div>Role Assignment</div>
              <div>Branch Access</div>
              <div>Status / Action</div>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {usersList.map((user) => (
                <div key={user.id} className="user-row hover:bg-black/[0.01]">
                  <div className="user-head flex items-center gap-2.5">
                    <div
                      className="avatar w-7 h-7 text-xs text-white"
                      style={{ background: user.avatarBg }}
                    >
                      {user.initials}
                    </div>
                    <span className="font-semibold text-xs text-[var(--ink)]">{user.name}</span>
                  </div>

                  <div>
                    <span className={`role-tag ${user.roleTag}`}>{user.role}</span>
                  </div>

                  <div className="text-xs text-[var(--ink-soft)]">{user.branchAccess}</div>

                  <div className="text-xs">
                    {user.isInvited ? (
                      <span className="text-[var(--terracotta)] font-medium">Invited</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--green)] font-semibold">Active</span>
                        {user.roleTag === "worker" && (
                          <button
                            className="btn-ghost text-[11px] p-0"
                            onClick={() => handleViewBranchManager(user.branchAccess)}
                          >
                            {t("viewDashboard")} →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "branches" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex justify-end">
            <button className="btn-secondary" onClick={openUserModal}>
              <Plus className="w-4 h-4" />
              <span>Add New Branch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((b) => (
              <div key={b.id} className="card report-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[var(--indigo-900)]">{b.name}</h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        b.status === "active"
                          ? "bg-[var(--green-soft)] text-[var(--green)]"
                          : "bg-[var(--terracotta-soft)] text-[var(--terracotta)]"
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--ink-soft)] mb-1">
                    <MapPin className="w-3 h-3 inline mr-1 opacity-60" />
                    {b.location}
                  </div>
                  <div className="text-xs text-[var(--ink-soft)]">
                    <User className="w-3 h-3 inline mr-1 opacity-60" />
                    Manager: {b.manager}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--line)]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[var(--ink-soft)]">Health Score</span>
                    <span
                      className={`font-mono font-bold ${
                        b.score >= 75
                          ? "text-[var(--green)]"
                          : b.score >= 60
                          ? "text-[var(--ochre)]"
                          : "text-[var(--terracotta)]"
                      }`}
                    >
                      {b.score} / 100
                    </span>
                  </div>
                  <button
                    className="btn-ghost w-full text-left text-xs p-0"
                    onClick={() => handleViewBranchManager(b.name)}
                  >
                    View Manager Dashboard →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
