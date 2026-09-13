"use client";

import React, { useEffect, useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

export function Toast() {
  const { toasts, removeToast } = useAppState();

  if (!toasts.length) return null;

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item ${toast.type === "warning" ? "warn" : ""}`}
        >
          {toast.type === "warning" ? (
            <AlertTriangle className="w-4 h-4 text-[var(--terracotta)] flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-[var(--green)] flex-shrink-0" />
          )}
          <span className="flex-1 text-xs">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-50 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
