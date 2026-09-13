"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Shield, Lock, Wifi, RefreshCw } from "lucide-react";

export function SecurityView() {
  const { auditLogs, branches, showToast } = useAppState();
  const { t } = useLanguage();

  const [toggles, setToggles] = useState({
    twoFactor: true,
    rbac: true,
    encryption: true,
    backup: true,
  });

  const handleToggle = (key: keyof typeof toggles, label: string) => {
    const nextState = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: nextState }));
    showToast(`${label} ${nextState ? "enabled" : "disabled"}.`);
  };

  return (
    <div className="space-y-6">
      {/* Security Switches Panel */}
      <div className="card panel">
        <div className="panel-head">
          <h2>Enterprise Security & Access Controls</h2>
          <div className="pill">AES-256 Enabled</div>
        </div>

        <div className="divide-y divide-[var(--line)]">
          <div className="toggle-row flex items-center justify-between py-3.5">
            <div>
              <div className="tt">Two-Factor Authentication (2FA)</div>
              <div className="td">Require SMS / Authenticator code verification upon login</div>
            </div>
            <div
              className={`switch cursor-pointer ${toggles.twoFactor ? "on" : ""}`}
              onClick={() => handleToggle("twoFactor", "Two-Factor Authentication")}
            />
          </div>

          <div className="toggle-row flex items-center justify-between py-3.5">
            <div>
              <div className="tt">Role-Based Access Control (RBAC)</div>
              <div className="td">Enforce branch-scoped permissions on inventory, cash and reports</div>
            </div>
            <div
              className={`switch cursor-pointer ${toggles.rbac ? "on" : ""}`}
              onClick={() => handleToggle("rbac", "Role-Based Access Control")}
            />
          </div>

          <div className="toggle-row flex items-center justify-between py-3.5">
            <div>
              <div className="tt">Offline SQLite / IndexedDB Encryption</div>
              <div className="td">Encrypt locally stored offline ledger entries before synchronization</div>
            </div>
            <div
              className={`switch cursor-pointer ${toggles.encryption ? "on" : ""}`}
              onClick={() => handleToggle("encryption", "Offline Data Encryption")}
            />
          </div>

          <div className="toggle-row flex items-center justify-between py-3.5">
            <div>
              <div className="tt">Automated Cloud Backups</div>
              <div className="td">Nightly encrypted snapshot backups of all business ledgers</div>
            </div>
            <div
              className={`switch cursor-pointer ${toggles.backup ? "on" : ""}`}
              onClick={() => handleToggle("backup", "Automated Cloud Backups")}
            />
          </div>
        </div>
      </div>

      {/* Offline Sync State Per Branch */}
      <div className="card panel">
        <div className="panel-head">
          <h2>Offline Sync Status by Branch</h2>
          <div className="pill">4 Locations</div>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {branches.map((b) => (
            <div key={b.id} className="branch-row py-3 flex items-center justify-between">
              <div className="branch-name font-semibold text-xs text-[var(--ink)]">{b.name}</div>
              <div
                className={`text-xs ${
                  b.isOffline ? "text-[var(--terracotta)] font-medium" : "text-[var(--ink-soft)]"
                }`}
              >
                {b.syncStatus}
              </div>
              <div
                className={`sync-dot ${b.isOffline ? "offline" : ""}`}
                style={{ position: "static" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="card overflow-x-auto">
        <div className="panel-head px-5 pt-5 pb-0">
          <h2>Immutable Financial Audit Trail</h2>
        </div>
        <div className="audit-row bg-[var(--paper-deep)] text-[10.7px] uppercase tracking-wider text-[var(--ink-soft)] font-bold mt-4">
          <div>Recorded Action</div>
          <div>Authorized User</div>
          <div>Timestamp</div>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {auditLogs.map((log) => (
            <div key={log.id} className="audit-row hover:bg-black/[0.01]">
              <div className="font-medium text-xs text-[var(--ink)]">{log.action}</div>
              <div className="text-xs text-[var(--indigo-800)]">{log.user}</div>
              <div className="mono text-xs text-[var(--ink-soft)]">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
