"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { X, AlertTriangle, FileText, Sparkles } from "lucide-react";

export function OCRReviewModal() {
  const { isOcrModalOpen, closeOcrModal, addReceipt, showToast } = useAppState();
  const { t } = useLanguage();

  const [supplier, setSupplier] = useState("Delta Foods Ltd.");
  const [amount, setAmount] = useState("₦184,000");
  const [date, setDate] = useState("10 Aug 2026");
  const [branch, setBranch] = useState("Yaba Main");

  if (!isOcrModalOpen) return null;

  const handleConfirm = () => {
    const numericAmt = parseFloat(amount.replace(/[^0-9.]/g, "")) || 184000;
    addReceipt({
      type: "Purchase",
      supplier: supplier || "Delta Foods Ltd.",
      branch: branch || "Yaba Main",
      date: date || "10 Aug 2026",
      amount: numericAmt,
    });
    showToast(t("toastReceiptSaved"));
    closeOcrModal();
  };

  return (
    <>
      <div className="overlay" onClick={closeOcrModal} />
      <div className="modal-card" style={{ width: "460px" }}>
        <div className="drawer-head">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--ochre)]" />
            <h2>{t("reviewScannedReceipt")}</h2>
          </div>
          <button className="drawer-close" onClick={closeOcrModal}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="drawer-body space-y-4">
          {/* Progress Steps */}
          <div className="ocr-steps">
            <div className="ocr-step done">
              <div className="dot">✓</div>
              <span>{t("scan")}</span>
            </div>
            <div className="ocr-step-line" />
            <div className="ocr-step done">
              <div className="dot">✓</div>
              <span>{t("extract")}</span>
            </div>
            <div className="ocr-step-line" />
            <div className="ocr-step current">
              <div className="dot">3</div>
              <span>{t("review")}</span>
            </div>
            <div className="ocr-step-line" />
            <div className="ocr-step">
              <div className="dot">4</div>
              <span>{t("confirm")}</span>
            </div>
          </div>

          {/* Scanned Image Preview Representation */}
          <div className="receipt-preview">
            <FileText className="w-7 h-7 text-[var(--indigo-800)]" />
            <span className="text-xs font-mono text-[var(--ink-soft)]">
              Delta_Foods_Receipt_10Aug.jpg
            </span>
          </div>

          {/* Supplier Field (High Confidence) */}
          <div className="ocr-field">
            <div className="ocr-field-head">
              <label>Supplier / Vendor</label>
              <span className="confidence-badge high">{t("highConfidence")}</span>
            </div>
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </div>

          {/* Purchase Amount Field (Low Confidence - Highlighted Warning) */}
          <div className="ocr-field low-confidence">
            <div className="ocr-field-head">
              <label>Purchase Amount (₦)</label>
              <span className="confidence-badge low">{t("lowConfidence")}</span>
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="ocr-warn-note">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t("smudgeWarning")}</span>
            </div>
          </div>

          {/* Date Field (High Confidence) */}
          <div className="ocr-field">
            <div className="ocr-field-head">
              <label>Receipt Date</label>
              <span className="confidence-badge high">{t("highConfidence")}</span>
            </div>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Branch Field (Medium Confidence) */}
          <div className="ocr-field">
            <div className="ocr-field-head">
              <label>Branch Assignment</label>
              <span className="confidence-badge medium">{t("mediumConfidence")}</span>
            </div>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border border-[var(--line)] rounded-md px-2.5 py-2 text-xs bg-white"
            >
              <option value="Yaba Main">Yaba Main</option>
              <option value="Surulere">Surulere</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Ajah">Ajah</option>
            </select>
          </div>

          <div className="insight-box" style={{ borderLeftColor: "var(--terracotta)", background: "#FDF4F1" }}>
            <div className="k" style={{ color: "var(--terracotta)" }}>Notice Before Confirming</div>
            <p className="text-xs text-[var(--ink)]">
              One field was flagged with low confidence due to faint receipt print. Please double-check the highlighted purchase amount.
            </p>
          </div>
        </div>

        <div className="drawer-foot">
          <button className="btn-secondary" onClick={closeOcrModal}>
            {t("rescan")}
          </button>
          <button className="btn-primary flex-1 justify-center" onClick={handleConfirm}>
            {t("confirmAndSave")}
          </button>
        </div>
      </div>
    </>
  );
}
