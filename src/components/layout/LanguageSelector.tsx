"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Language } from "../../types";
import { Globe, Check } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-white hover:bg-[var(--paper-deep)] transition text-xs font-semibold text-[var(--ink)] shadow-xs"
        title="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[var(--ochre)]" />
        <span className="hidden sm:inline">{languages[language].name}</span>
        <span className="text-[11px] opacity-75 font-mono">
          {language.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--line)] bg-white shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-[var(--line)] text-[11px] font-semibold text-[var(--ink-soft)] uppercase tracking-wider">
            Choose Preferred Language
          </div>
          {(Object.keys(languages) as Language[]).map((langKey) => {
            const item = languages[langKey];
            const isSelected = language === langKey;
            return (
              <button
                key={langKey}
                onClick={() => {
                  setLanguage(langKey);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition hover:bg-[var(--paper-deep)] ${
                  isSelected ? "bg-[rgba(192,138,30,0.12)] font-semibold text-[var(--indigo-900)]" : "text-[var(--ink)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div className="leading-tight">{item.name}</div>
                    <div className="text-[10px] text-[var(--ink-soft)]">
                      {item.nativeName}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--ochre)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
