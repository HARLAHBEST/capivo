"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import { useAppState } from "./AppStateContext";
import { Language } from "../types";

export interface VoiceLog {
  id: string;
  transcript: string;
  intent: string;
  feedback: string;
  time: string;
}

interface VoiceContextType {
  isListening: boolean;
  transcript: string;
  feedbackText: string;
  isSupported: boolean;
  voiceLogs: VoiceLog[];
  audioFeedbackEnabled: boolean;
  setAudioFeedbackEnabled: (enabled: boolean) => void;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  processCommand: (text: string) => void;
  speak: (text: string) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const {
    setCurrentPage,
    setUserRole,
    openDrawer,
    openOcrModal,
    lockCurrentMonth,
    showToast,
  } = useAppState();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSupported, setIsSupported] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    return !!SpeechRecognition;
  });
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
  const [voiceLogs, setVoiceLogs] = useState<VoiceLog[]>([]);

  const recognitionRef = useRef<unknown>(null);

  // Text to Speech
  const speak = useCallback((text: string) => {
    if (!audioFeedbackEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick appropriate voice or fallback
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.includes("en-NG") || v.lang.includes("en-GB") || v.lang.includes("en")
    );
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
  }, [audioFeedbackEnabled]);

  // Natural Language Command Processing Engine
  // Using useCallback so it can be referenced safely in event handlers
  const processCommand = useCallback((rawText: string) => {
    const text = rawText.toLowerCase().trim();
    if (!text) return;

    let recognizedIntent = "Unknown";
    let reply = "";

    // 1. Language Switching
    if (
      text.includes("yoruba") ||
      text.includes("ede yoruba") ||
      text.includes("yi si yoruba")
    ) {
      setLanguage("yo");
      recognizedIntent = "Switch Language → Yoruba";
      reply = "Èdè ti yípadà sí Èdè Yorùbá.";
    } else if (
      text.includes("hausa") ||
      text.includes("harshen hausa") ||
      text.includes("koma hausa") ||
      text.includes("canza zuwa hausa")
    ) {
      setLanguage("ha");
      recognizedIntent = "Switch Language → Hausa";
      reply = "An canza harshe zuwa Harshen Hausa.";
    } else if (
      text.includes("igbo") ||
      text.includes("asusu igbo") ||
      text.includes("gbanwee gaa igbo")
    ) {
      setLanguage("ig");
      recognizedIntent = "Switch Language → Igbo";
      reply = "Agbanweela asụsụ gaa n'Asụsụ Igbo.";
    } else if (
      text.includes("pidgin") ||
      text.includes("naija pidgin") ||
      text.includes("change to pidgin") ||
      text.includes("turn to pidgin")
    ) {
      setLanguage("pcm");
      recognizedIntent = "Switch Language → Pidgin";
      reply = "We don switch language to Naija Pidgin!";
    } else if (
      text.includes("english") ||
      text.includes("turanci") ||
      text.includes("bekee") ||
      text.includes("geesi") ||
      text.includes("switch to english")
    ) {
      setLanguage("en");
      recognizedIntent = "Switch Language → English";
      reply = "Language switched to English.";
    }

    // 2. Navigation
    else if (
      text.includes("inventory") ||
      text.includes("stock") ||
      text.includes("kayan kanti") ||
      text.includes("akojo oja") ||
      text.includes("ngwaahia")
    ) {
      setCurrentPage("inventory");
      recognizedIntent = "Navigate → Inventory";
      reply = "Opening inventory and stock tracking.";
    } else if (
      text.includes("sales") ||
      text.includes("ciniki") ||
      text.includes("tita oja") ||
      text.includes("ahia")
    ) {
      setCurrentPage("sales");
      recognizedIntent = "Navigate → Sales";
      reply = "Navigating to sales records.";
    } else if (
      text.includes("profit") ||
      text.includes("cogs") ||
      text.includes("riba") ||
      text.includes("ere") ||
      text.includes("ururu")
    ) {
      setCurrentPage("profit");
      recognizedIntent = "Navigate → Profit & COGS";
      reply = "Showing Profit and Cost of Goods Sold analysis.";
    } else if (
      text.includes("receipt") ||
      text.includes("archive") ||
      text.includes("rasit") ||
      text.includes("risiti") ||
      text.includes("iwe eri")
    ) {
      setCurrentPage("receipts");
      recognizedIntent = "Navigate → Receipt Archive";
      reply = "Opening Receipt Archive.";
    } else if (
      text.includes("report") ||
      text.includes("rahot") ||
      text.includes("ijabo") ||
      text.includes("akuko")
    ) {
      setCurrentPage("reports");
      recognizedIntent = "Navigate → Reports";
      reply = "Showing business reports centre.";
    } else if (
      text.includes("alert") ||
      text.includes("insight") ||
      text.includes("fadakarwa") ||
      text.includes("ikilo") ||
      text.includes("ido aka")
    ) {
      setCurrentPage("alerts");
      recognizedIntent = "Navigate → Alerts & Insights";
      reply = "Viewing alerts and business insights.";
    } else if (
      text.includes("reconciliation") ||
      text.includes("lissafi") ||
      text.includes("balancing") ||
      text.includes("isiro") ||
      text.includes("nchikota")
    ) {
      setCurrentPage("lissafi");
      recognizedIntent = "Navigate → Monthly Reconciliation";
      reply = "Opening Monthly Financial Reconciliation.";
    } else if (
      text.includes("user") ||
      text.includes("branch") ||
      text.includes("staff") ||
      text.includes("reshe") ||
      text.includes("alaka")
    ) {
      setCurrentPage("users");
      recognizedIntent = "Navigate → Users & Branches";
      reply = "Opening Users and Multi-Branch Management.";
    } else if (
      text.includes("security") ||
      text.includes("audit") ||
      text.includes("tsaro") ||
      text.includes("aabo") ||
      text.includes("nchedo")
    ) {
      setCurrentPage("security");
      recognizedIntent = "Navigate → Security & Audit";
      reply = "Opening Security settings and Audit log.";
    } else if (
      text.includes("dashboard") ||
      text.includes("home") ||
      text.includes("dandali") ||
      text.includes("ojule") ||
      text.includes("doshboodu")
    ) {
      setCurrentPage("dashboard");
      recognizedIntent = "Navigate → Dashboard";
      reply = "Navigating to Dashboard.";
    }

    // 3. Quick Actions & Drawers
    else if (
      text.includes("record sale") ||
      text.includes("new sale") ||
      text.includes("sell")
    ) {
      openDrawer("sale");
      recognizedIntent = "Action → Open Record Sale";
      reply = "Opening Record Sale form.";
    } else if (
      text.includes("stock purchase") ||
      text.includes("buy stock") ||
      text.includes("purchase")
    ) {
      openDrawer("stock");
      recognizedIntent = "Action → Open Stock Purchase";
      reply = "Opening Stock Purchase form.";
    } else if (
      text.includes("daily cash") ||
      text.includes("record cash") ||
      text.includes("cash today")
    ) {
      openDrawer("cash");
      recognizedIntent = "Action → Open Daily Cash";
      reply = "Opening Daily Cash form.";
    } else if (
      text.includes("expense") ||
      text.includes("inawon") ||
      text.includes("kudin kashewa")
    ) {
      openDrawer("expense");
      recognizedIntent = "Action → Open Expense";
      reply = "Opening Expense entry form.";
    } else if (
      text.includes("customer credit") ||
      text.includes("bashi") ||
      text.includes("gbese") ||
      text.includes("ugwo")
    ) {
      openDrawer("ccredit");
      recognizedIntent = "Action → Open Customer Credit";
      reply = "Opening Customer Credit form.";
    } else if (
      text.includes("new entry") ||
      text.includes("quick add") ||
      text.includes("add entry")
    ) {
      openDrawer("stock");
      recognizedIntent = "Action → Open Quick Add Drawer";
      reply = "Opening New Entry Drawer.";
    } else if (
      text.includes("scan receipt") ||
      text.includes("ocr") ||
      text.includes("review receipt")
    ) {
      openOcrModal();
      recognizedIntent = "Action → Open AI OCR Scanner";
      reply = "Opening AI OCR Scanned Receipt Review.";
    } else if (text.includes("lock month") || text.includes("close month")) {
      lockCurrentMonth();
      recognizedIntent = "Action → Close & Lock Month";
      reply = "August financial reconciliation closed and locked.";
    }

    // 4. Role Switching
    else if (text.includes("owner view") || text.includes("switch to owner")) {
      setUserRole("owner");
      recognizedIntent = "Switch Role → Owner";
      reply = "Switched to Business Owner view.";
    } else if (
      text.includes("branch manager") ||
      text.includes("worker view") ||
      text.includes("manager view")
    ) {
      setUserRole("worker");
      recognizedIntent = "Switch Role → Branch Manager";
      reply = "Switched to Branch Manager operational view.";
    } else if (
      text.includes("audit team") ||
      text.includes("reconciliation team")
    ) {
      setUserRole("lissafiTeam");
      recognizedIntent = "Switch Role → Audit Team";
      reply = "Switched to Audit and Reconciliation team view.";
    }

    // 5. Spoken Business Health Queries (Q&A)
    else if (
      text.includes("how much profit") ||
      text.includes("what is our profit") ||
      text.includes("profit today")
    ) {
      recognizedIntent = "Query → Estimated Profit";
      reply =
        "Your estimated profit this month is 1,284,600 Naira, which is up 6.2% compared to last month.";
    } else if (
      text.includes("what is our capital") ||
      text.includes("capital position")
    ) {
      recognizedIntent = "Query → Capital Position";
      reply =
        "Your capital position is 8,940,000 Naira, which is 410,000 Naira above your baseline.";
    } else if (
      text.includes("health score") ||
      text.includes("how is business") ||
      text.includes("business score")
    ) {
      recognizedIntent = "Query → Health Score";
      reply =
        "Your Business Health Score is 78 out of 100. Capital is stable, though customer credit is slightly high.";
    } else if (
      text.includes("low stock") ||
      text.includes("which product is low")
    ) {
      recognizedIntent = "Query → Low Stock Alert";
      reply =
        "You have 9 products below minimum level, including 25kg Rice and Detergent Powder, and 3 items out of stock.";
    } else {
      recognizedIntent = "Unmatched Command";
      reply = `Command received: "${rawText}". Try saying 'Go to inventory', 'Record sale', or 'Switch to Yoruba'.`;
    }

    setFeedbackText(reply);
    showToast(reply, "info");
    speak(reply);

    const logItem: VoiceLog = {
      id: "v_" + Date.now(),
      transcript: rawText,
      intent: recognizedIntent,
      feedback: reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    setVoiceLogs((prev) => [logItem, ...prev.slice(0, 15)]);
  }, [
    setLanguage,
    setCurrentPage,
    setUserRole,
    openDrawer,
    openOcrModal,
    lockCurrentMonth,
    showToast,
    speak,
  ]);

  // Initialize Speech Recognition — re-runs when language changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    // Abort any existing recognition before reinitialising
    if (recognitionRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (recognitionRef.current as any).abort();
      } catch {
        // ignore
      }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang =
      language === "ha"
        ? "ha-NG"
        : language === "yo"
        ? "yo-NG"
        : language === "ig"
        ? "ig-NG"
        : "en-NG";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let current = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);

      if (event.results[event.results.length - 1].isFinal) {
        processCommand(current);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      setIsListening(false);
      const errType: string = event.error ?? "unknown";

      if (errType === "not-allowed" || errType === "service-not-allowed") {
        showToast("Microphone access was denied. Please allow mic permission in your browser.", "warning");
        setIsSupported(false);
      } else if (errType === "network") {
        showToast("Voice recognition requires an internet connection.", "warning");
      } else if (errType === "no-speech") {
        setFeedbackText("No speech detected. Try again.");
      } else if (errType !== "aborted") {
        showToast(`Voice error: ${errType}`, "warning");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  // processCommand is stable via useCallback — safe to include
  }, [language, processCommand, showToast]);

  const startListening = () => {
    if (!recognitionRef.current) {
      setIsSupported(false);
      return;
    }
    try {
      setTranscript("");
      setFeedbackText(t("listening"));
      setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any).start();
    } catch {
      // Recognition may already be started — stop and retry
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (recognitionRef.current as any).stop();
      } catch {
        // ignore
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (recognitionRef.current as any).stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        transcript,
        feedbackText,
        isSupported,
        voiceLogs,
        audioFeedbackEnabled,
        setAudioFeedbackEnabled,
        startListening,
        stopListening,
        toggleListening,
        processCommand,
        speak,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
