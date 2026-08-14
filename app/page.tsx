"use client";
import React, { useState, useEffect } from "react";
import { Mic, MicOff, MessageSquare, Globe, ArrowRight, Activity, ShoppingCart, Cpu, ShieldCheck } from "lucide-react";

export default function AIPlatformHome() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedSector, setSelectedSector] = useState("ecommerce");
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(83); 
  const [chatLogs, setChatLogs] = useState<{ role: string; text: string }[]>([]);

  useEffect(() => {
    const userLang = navigator.language;
    if (!userLang.includes("IN") && !userLang.includes("hi")) {
      setCurrency("USD");
    }
  }, []);

  const handleVoiceInput = () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        recognition.onresult = (event: any) => {
          const speechToText = event.results.transcript;
          setQuery(speechToText);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } else {
      alert("Voice recognition is not supported in this browser. Please type your query.");
    }
  };

  const handleGenerateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query;
    setChatLogs((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuery("");

    setTimeout(() => {
      setChatLogs((prev) => [
        ...prev,
        { role: "ai", text: `Understood your needs for ${selectedSector}. Generating custom architecture roadmap, price matrix, and communication strategy vectors...` }
      ]);
    }, 1000);
  };

  const getPriceDisplay = (baseUsd: number) => {
    if (currency === "INR") {
      return `₹${(baseUsd * exchangeRate).toLocaleString()}`;
    }
    return `$${baseUsd}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      <nav className="border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          OmniAgent.ai
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
            className="flex items-center gap-2 border border-slate-700 bg-slate-900 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white"
          >
            <Globe size={16} />
            <span>Currency: <b>{currency}</b></span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Tell us your problem. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                We deploy your system.
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-xl">
              Input your custom workflows, website architecture, or core database requirements. Our automated AI framework charts it, outputs global pricing matrix tiers instantly, and provisions developers.
            </p>
          </div>

          <form onSubmit={handleGenerateWorkflow} className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Select Market Domain</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "ecommerce", label: "E-Commerce", icon: <ShoppingCart size={14} /> },
                  { id: "healthcare", label: "Healthcare", icon: <Activity size={14} /> },
                  { id: "it_sector", label: "IT & Software", icon: <Cpu size={14} /> }
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSelectedSector(sec.id)}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedSector === sec.id 
                        ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/5" 
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {sec.icon}
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Describe Requirements / Bottlenecks</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: I need a medical inventory compliance tracking chatbot with real-time email alerts..."
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 pr-12 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-3 bottom-4 p-2.5 rounded-lg border transition-all ${
                  isListening 
                    ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all transform active:scale-[0.99]"
            >
              <span>Initialize System Generation</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Pre-Configured Architecture Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Automated Supply Chain Orchestrator</h4>
                  <p className="text-xs text-slate-500 mt-1">Cross-border logic mapping & return APIs</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{getPriceDisplay(450)}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">HIPAA Conversational Medical Assistant</h4>
                  <p className="text-xs text-slate-500 mt-1">Direct patient routing & charting triggers</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{getPriceDisplay(750)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col h-[600px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">Active AI Pipeline Visualizer</span>
            </div>
            <MessageSquare size={14} className="text-slate-500" />
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
            {chatLogs.length === 0 ? (
              <div className="text-slate-600 h-full flex items-center justify-center text-center p-8">
                Ready to synthesize inputs. Use text prompt input console or toggle voice system to trace logic maps...
              </div>
            ) : (
              chatLogs.map((log, idx) => (
                <div key={idx} className={`p-3 rounded-lg leading-relaxed max-w-[90%] ${
                  log.role === "user" 
                    ? "bg-slate-950 border border-slate-800 text-cyan-400 self-end ml-auto" 
                    : "bg-slate-800 text-slate-300"
                }`}>
