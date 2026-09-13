"use client";

import React from "react";
import { useVoice } from "../../context/VoiceContext";
import { useAppState } from "../../context/AppStateContext";
import { Mic, MicOff } from "lucide-react";

export function VoiceMicButton({ variant = "topbar" }: { variant?: "topbar" | "floating" }) {
  const { isListening, toggleListening, isSupported } = useVoice();
  const { openVoiceModal } = useAppState();

  if (!isSupported && variant === "floating") return null;

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <button
          onClick={toggleListening}
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 ${
            isListening
              ? "bg-[var(--terracotta)] text-white voice-pulse ring-4 ring-red-300"
              : "bg-[var(--indigo-900)] text-[var(--ochre-soft)] hover:bg-[var(--indigo-800)] border-2 border-[var(--ochre)]"
          }`}
          title={isListening ? "Listening... Click to stop" : "Click to speak voice command"}
        >
          {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={toggleListening}
        className={`icon-btn transition ${
          isListening
            ? "bg-[var(--terracotta)] text-white border-[var(--terracotta)] voice-pulse"
            : "text-[var(--indigo-900)] hover:text-[var(--ochre)]"
        }`}
        title={isListening ? "Listening... Click to stop" : "Voice Assistant — Click to speak"}
      >
        {isListening ? (
          <Mic className="w-4 h-4 animate-bounce" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={openVoiceModal}
        className="hidden md:inline-flex items-center text-[11px] font-semibold text-[var(--ink-soft)] hover:text-[var(--indigo-900)] px-1.5 py-0.5 rounded transition"
        title="Voice Commands Help"
      >
        Voice AI
      </button>
    </div>
  );
}
