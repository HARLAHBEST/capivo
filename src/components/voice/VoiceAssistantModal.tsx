"use client";

import React from "react";
import { useVoice } from "../../context/VoiceContext";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Mic, Volume2, VolumeX, Sparkles, X, Terminal, ArrowRight } from "lucide-react";

export function VoiceAssistantModal() {
  const {
    isListening,
    transcript,
    feedbackText,
    audioFeedbackEnabled,
    setAudioFeedbackEnabled,
    startListening,
    stopListening,
    processCommand,
    voiceLogs,
  } = useVoice();

  const { isVoiceModalOpen, closeVoiceModal } = useAppState();
  const { language } = useLanguage();

  if (!isVoiceModalOpen) return null;

  const sampleCommandsByLang = {
    en: [
      "Go to inventory",
      "Record new sale",
      "What is our estimated profit?",
      "Switch to Branch Manager view",
      "Open Receipt Archive",
      "Check low stock",
      "Switch language to Yoruba",
    ],
    ha: [
      "Bude kayan kanti (Go to inventory)",
      "Rubuta ciniki (Record sale)",
      "Nawa ne ribar da aka kiyasta? (What is profit?)",
      "Koma dandalin manaja (Manager view)",
      "Canza zuwa Turanci (Switch to English)",
    ],
    yo: [
      "Lọ sí àkójọ ọjà (Go to inventory)",
      "Kọ títà sílẹ̀ (Record sale)",
      "Iye èrè wo la ní? (What is profit?)",
      "Yípadà sí Olùdarí Ẹ̀ka (Branch Manager)",
      "Yípadà sí Èdè Gẹ̀ẹ́sì (Switch to English)",
    ],
    ig: [
      "Gaa na ngwaahịa (Go to inventory)",
      "Dekọọ ahịa (Record sale)",
      "Gịnị bụ ururu anyị? (What is profit?)",
      "Gbanwee gaa na Bekee (Switch to English)",
    ],
    pcm: [
      "Open inventory",
      "Record sale",
      "How much profit we get?",
      "Switch to Branch Manager",
      "Check low stock goods",
      "Change language to Pidgin",
    ],
  };

  const sampleList = sampleCommandsByLang[language] || sampleCommandsByLang.en;

  return (
    <>
      <div className="overlay" onClick={closeVoiceModal} />
      <div className="modal-card max-w-xl" style={{ width: "560px" }}>
        <div className="drawer-head">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--indigo-900)] text-[var(--ochre-soft)] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--indigo-900)]">Capivo Voice AI Assistant</h2>
              <div className="text-[11px] text-[var(--ink-soft)]">
                Control Capivo with your voice in English, Hausa, Yoruba, Igbo, or Pidgin
              </div>
            </div>
          </div>
          <button className="drawer-close" onClick={closeVoiceModal}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="drawer-body space-y-5">
          {/* Main Voice Hub Banner */}
          <div className="p-6 rounded-2xl bg-[var(--indigo-900)] text-[#EFE9D8] flex flex-col items-center text-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--ochre),transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-center">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition transform active:scale-95 shadow-xl ${
                  isListening
                    ? "bg-[var(--terracotta)] text-white voice-pulse ring-8 ring-red-400/30"
                    : "bg-[var(--ochre)] text-[var(--indigo-900)] hover:bg-[var(--ochre-soft)]"
                }`}
              >
                <Mic className="w-9 h-9" />
              </button>

              <div className="mt-4 font-semibold text-sm">
                {isListening ? (
                  <span className="text-[var(--ochre-soft)] animate-pulse">
                    🎙️ Listening to your voice... (Speak now)
                  </span>
                ) : (
                  <span>Click microphone to speak</span>
                )}
              </div>

              {transcript && (
                <div className="mt-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg text-white font-mono max-w-sm">
                  &ldquo;{transcript}&rdquo;
                </div>
              )}

              {feedbackText && (
                <div className="mt-3 text-xs text-[var(--ochre-soft)] font-medium bg-black/30 px-3 py-1.5 rounded-lg border border-[var(--ochre)]/30">
                  {feedbackText}
                </div>
              )}
            </div>
          </div>

          {/* Audio Output Settings */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--line)] bg-white text-xs">
            <div className="flex items-center gap-2">
              {audioFeedbackEnabled ? (
                <Volume2 className="w-4 h-4 text-[var(--green)]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[var(--ink-soft)]" />
              )}
              <div>
                <div className="font-semibold text-[var(--ink)]">Spoken Voice Feedback (TTS)</div>
                <div className="text-[10px] text-[var(--ink-soft)]">
                  Capivo speaks back financial answers and confirmation aloud
                </div>
              </div>
            </div>
            <button
              onClick={() => setAudioFeedbackEnabled(!audioFeedbackEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                audioFeedbackEnabled
                  ? "bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {audioFeedbackEnabled ? "Enabled" : "Muted"}
            </button>
          </div>

          {/* Quick Click-to-Test Sample Commands */}
          <div>
            <div className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Try or Click Sample Commands:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleList.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => {
                    processCommand(cmd.split(" (")[0]);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--line)] bg-white hover:bg-[var(--paper-deep)] text-left text-xs transition group"
                >
                  <span className="font-medium text-[var(--ink)]">{cmd}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Voice Activity Log */}
          {voiceLogs.length > 0 && (
            <div>
              <div className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-2">
                Recent Voice Logs
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {voiceLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2 rounded border border-[var(--line)] bg-white text-[11px] flex justify-between items-start"
                  >
                    <div>
                      <div className="font-semibold text-[var(--ink)]">
                        &ldquo;{log.transcript}&rdquo;
                      </div>
                      <div className="text-[10px] text-[var(--indigo-700)]">
                        {log.intent}
                      </div>
                    </div>
                    <div className="text-[9.5px] text-[var(--ink-soft)] font-mono">
                      {log.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="drawer-foot">
          <button className="btn-secondary w-full justify-center" onClick={closeVoiceModal}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}
