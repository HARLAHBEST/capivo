"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { X } from "lucide-react";

export function CreateUserModal() {
  const { isUserModalOpen, closeUserModal, showToast, addAuditLog } = useAppState();
  const { t } = useLanguage();
  const { createManagedUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("Surulere");
  const [generatedCredentials, setGeneratedCredentials] = useState<{ email: string; password: string } | null>(null);

  const [permissions, setPermissions] = useState({
    stockPurchase: true,
    dailyCash: true,
    customerCredit: true,
    supplierCredit: true,
    expenses: true,
    lossDamage: true,
    bankDeposit: true,
    viewReports: false,
  });

  if (!isUserModalOpen) return null;

  const handleSendInvite = () => {
    if (!fullName) {
      showToast("Please enter manager name", "warning");
      return;
    }

    const targetEmail = email.trim() || `${fullName.toLowerCase().replace(/\s+/g, ".")}@capivo.ng`;

    const result = createManagedUser({
      name: fullName,
      email: targetEmail,
      password: `${fullName.toLowerCase().replace(/\s+/g, "")}123`,
      businessName: "Capivo Workspace",
      role: "worker",
    });

    if (!result.success) {
      showToast(result.error || "Unable to create account", "warning");
      return;
    }

    setGeneratedCredentials({
      email: targetEmail,
      password: result.generatedPassword || "",
    });

    addAuditLog(`Branch Manager account created: ${fullName} assigned to ${branch}`);
    showToast("Branch manager account created successfully", "success");
  };

  return (
    <>
      <div className="overlay" onClick={closeUserModal} />
      <div className="modal-card">
        <div className="drawer-head">
          <h2>Create Branch Manager Account</h2>
          <button className="drawer-close" onClick={closeUserModal}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="drawer-body space-y-4">
          {generatedCredentials && (
            <div className="insight-box" style={{ borderLeftColor: "var(--green)", background: "var(--green-soft)" }}>
              <div className="k">Login details ready</div>
              <p className="text-xs mt-1">
                Email: <strong>{generatedCredentials.email}</strong>
              </p>
              <p className="text-xs mt-1">
                Password: <strong>{generatedCredentials.password}</strong>
              </p>
              <p className="text-xs mt-2 text-[var(--ink-soft)]">
                Share these credentials with the branch manager so they can sign in.
              </p>
            </div>
          )}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ngozi Eze"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number (for SMS & Login)</label>
              <input
                type="text"
                placeholder="+234 800 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Address (optional)</label>
              <input
                type="email"
                placeholder="name@business.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Assign to Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="Surulere">Surulere — Currently Unassigned</option>
              <option value="Yaba Main">Yaba Main — Reassign</option>
              <option value="Ikeja">Ikeja — Reassign</option>
              <option value="Ajah">Ajah — Reassign</option>
              <option value="+ Create New Branch">+ Create New Location</option>
            </select>
          </div>

          <div className="form-group">
            <label className="mb-2 block">Daily Operations Permissions</label>
            <div className="p-3 bg-white border border-[var(--line)] rounded-lg space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.stockPurchase}
                  onChange={(e) =>
                    setPermissions({ ...permissions, stockPurchase: e.target.checked })
                  }
                  className="rounded accent-[var(--indigo-900)]"
                />
                <span>Record Stock Purchases & Receipts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.dailyCash}
                  onChange={(e) =>
                    setPermissions({ ...permissions, dailyCash: e.target.checked })
                  }
                  className="rounded accent-[var(--indigo-900)]"
                />
                <span>Log Daily Cash Drawers</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.customerCredit}
                  onChange={(e) =>
                    setPermissions({ ...permissions, customerCredit: e.target.checked })
                  }
                  className="rounded accent-[var(--indigo-900)]"
                />
                <span>Customer Credit & Debt Payments</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.expenses}
                  onChange={(e) =>
                    setPermissions({ ...permissions, expenses: e.target.checked })
                  }
                  className="rounded accent-[var(--indigo-900)]"
                />
                <span>Record Expenses & Fuel Receipts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.bankDeposit}
                  onChange={(e) =>
                    setPermissions({ ...permissions, bankDeposit: e.target.checked })
                  }
                  className="rounded accent-[var(--indigo-900)]"
                />
                <span>Log Bank Deposits</span>
              </label>

              <div className="pt-2 border-t border-[var(--line)]">
                <label className="flex items-center gap-2 cursor-pointer text-[var(--ink-soft)]">
                  <input
                    type="checkbox"
                    checked={permissions.viewReports}
                    onChange={(e) =>
                      setPermissions({ ...permissions, viewReports: e.target.checked })
                    }
                    className="rounded accent-[var(--indigo-900)]"
                  />
                  <span>Allow Viewing Branch Financial Health & Margin Reports</span>
                </label>
              </div>
            </div>
          </div>

          <div className="insight-box" style={{ borderLeftColor: "var(--indigo-700)", background: "var(--paper-deep)" }}>
            <div className="k">Owner Visibility Notice</div>
            <p className="text-xs">
              As business owner, you will automatically have continuous oversight of this branch manager&apos;s daily activity.
            </p>
          </div>
        </div>

        <div className="drawer-foot">
          <button className="btn-secondary" onClick={closeUserModal}>
            {t("cancel")}
          </button>
          <button className="btn-primary flex-1 justify-center" onClick={handleSendInvite}>
            Create Manager Account
          </button>
        </div>
      </div>
    </>
  );
}
