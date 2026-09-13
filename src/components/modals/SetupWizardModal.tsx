"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { X, ShoppingBag, Package, Store, Layers, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function SetupWizardModal() {
  const { isWizardOpen, closeWizard, setBusinessMode, showToast } = useAppState();
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [bizType, setBizType] = useState<"shop" | "store">("store");
  const [structure, setStructure] = useState<"single" | "multi">("multi");

  // Step 3 Financial Baseline
  const [capital, setCapital] = useState("₦8,500,000");
  const [stockVal, setStockVal] = useState("₦4,000,000");
  const [cashShop, setCashShop] = useState("₦500,000");
  const [bankBalance, setBankBalance] = useState("₦2,500,000");
  const [customerCredit, setCustomerCredit] = useState("₦1,800,000");
  const [supplierCredit, setSupplierCredit] = useState("₦900,000");

  if (!isWizardOpen) return null;

  const handleFinish = () => {
    setBusinessMode(bizType);
    closeWizard();
    showToast("Business setup locked successfully — welcome to Capivo!");

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C08A1E", "#161F38", "#2E6B4A"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="wizard-overlay open">
      <div className="wizard-shell">
        <button className="wizard-close" onClick={closeWizard}>
          <X className="w-4 h-4" />
        </button>

        {/* Progress Dots */}
        <div className="wizard-progress">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div
                className={`wizard-dot ${
                  step === i ? "current" : step > i ? "done" : ""
                }`}
              >
                {step > i ? "✓" : i}
              </div>
              {i < 4 && (
                <div
                  className={`wizard-line ${step > i ? "done" : ""}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Business Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="wizard-step-label">Step 1 of 4</div>
            <div className="wizard-title">What kind of business is this?</div>
            <div className="wizard-sub">
              This determines whether Capivo enables granular SKU inventory or streamlined cash ledger modules.
            </div>

            <div className="wizard-cards">
              <div
                className={`wizard-card ${bizType === "shop" ? "selected" : ""}`}
                onClick={() => setBizType("shop")}
              >
                <div className="wizard-card-icon">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3>Shop / Retail</h3>
                <p>
                  Financial health and daily cash movements without forcing you to log every individual sale.
                </p>
              </div>

              <div
                className={`wizard-card ${bizType === "store" ? "selected" : ""}`}
                onClick={() => setBizType("store")}
              >
                <div className="wizard-card-icon">
                  <Package className="w-5 h-5" />
                </div>
                <h3>Store / Wholesale</h3>
                <p>
                  Inventory tracking + itemized sales + COGS profit margin calculation.
                </p>
              </div>
            </div>

            <div className="wizard-foot">
              <div />
              <button className="btn-primary" onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Branch Structure */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="wizard-step-label">Step 2 of 4</div>
            <div className="wizard-title">Single location or multiple branches?</div>
            <div className="wizard-sub">
              You can easily add more branches later — this sets up your starting structure.
            </div>

            <div className="wizard-cards">
              <div
                className={`wizard-card ${structure === "single" ? "selected" : ""}`}
                onClick={() => setStructure("single")}
              >
                <div className="wizard-card-icon">
                  <Store className="w-5 h-5" />
                </div>
                <h3>Single Branch</h3>
                <p>One business location. Simple, fast setup with all numbers combined.</p>
              </div>

              <div
                className={`wizard-card ${structure === "multi" ? "selected" : ""}`}
                onClick={() => setStructure("multi")}
              >
                <div className="wizard-card-icon">
                  <Layers className="w-5 h-5" />
                </div>
                <h3>Multi-Branch Network</h3>
                <p>
                  Two or more locations. View each branch separately or consolidated as owner.
                </p>
              </div>
            </div>

            <div className="wizard-foot">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Initial Baseline Reconciliation */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="wizard-step-label">Step 3 of 4</div>
            <div className="wizard-title">Set your Initial Financial Baseline</div>
            <div className="wizard-sub">
              This forms your benchmark — Capivo compares your capital growth and profit health against this baseline.
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Opening Capital Position</label>
                <input
                  type="text"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Opening Stock Valuation</label>
                <input
                  type="text"
                  value={stockVal}
                  onChange={(e) => setStockVal(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cash in Drawers / Shop</label>
                <input
                  type="text"
                  value={cashShop}
                  onChange={(e) => setCashShop(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Account Balances</label>
                <input
                  type="text"
                  value={bankBalance}
                  onChange={(e) => setBankBalance(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Existing Customer Credit Owed</label>
                <input
                  type="text"
                  value={customerCredit}
                  onChange={(e) => setCustomerCredit(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Existing Supplier Debt Owing</label>
                <input
                  type="text"
                  value={supplierCredit}
                  onChange={(e) => setSupplierCredit(e.target.value)}
                />
              </div>
            </div>

            <div className="wizard-foot">
              <button className="btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="btn-primary" onClick={() => setStep(4)}>
                Review & Lock Baseline →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Lock */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="wizard-step-label">Step 4 of 4</div>
            <div className="wizard-title">Review & Lock Baseline</div>
            <div className="wizard-sub">
              Once locked, this baseline establishes your starting point and informs your Business Health Score and Capital Trend.
            </div>

            <div className="card panel p-4 mb-4">
              <div className="wizard-review-row">
                <span className="rv-label">Business Type</span>
                <span className="rv-val">
                  {bizType === "store" ? "Store / Wholesale" : "Shop / Retail"}
                </span>
              </div>
              <div className="wizard-review-row">
                <span className="rv-label">Structure</span>
                <span className="rv-val">
                  {structure === "multi" ? "Multi-Branch Network" : "Single Branch"}
                </span>
              </div>
              <div className="wizard-review-row">
                <span className="rv-label">Opening Capital</span>
                <span className="rv-val">{capital}</span>
              </div>
              <div className="wizard-review-row">
                <span className="rv-label">Stock Value</span>
                <span className="rv-val">{stockVal}</span>
              </div>
              <div className="wizard-review-row">
                <span className="rv-label">Cash in Shop</span>
                <span className="rv-val">{cashShop}</span>
              </div>
              <div className="wizard-review-row">
                <span className="rv-label">Bank Balance</span>
                <span className="rv-val">{bankBalance}</span>
              </div>
            </div>

            <div className="insight-box" style={{ borderLeftColor: "var(--green)", background: "var(--green-soft)" }}>
              <div className="k" style={{ color: "var(--green)" }}>Ready to Launch</div>
              <p className="text-xs">
                Your Owner Dashboard, Capital Trend, and Score Engine will begin tracking immediately.
              </p>
            </div>

            <div className="wizard-foot">
              <button className="btn-secondary" onClick={() => setStep(3)}>
                Back
              </button>
              <button className="btn-primary" onClick={handleFinish}>
                Lock Baseline & Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
