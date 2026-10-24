"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/utils/cn";

const ToastContext = createContext(null);
const STYLES = {
  success: { icon: CheckCircle2, bar: "bg-emerald-500", text: "text-emerald-600" },
  error: { icon: AlertTriangle, bar: "bg-red-500", text: "text-red-600" },
  warning: { icon: AlertTriangle, bar: "bg-amber-500", text: "text-amber-600" },
  info: { icon: Info, bar: "bg-sky-500", text: "text-sky-600" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);
  const push = useCallback((type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, type, title, message }]);
    window.setTimeout(() => dismiss(id), type === "error" ? 8000 : 4500);
  }, [dismiss]);
  const api = useMemo(() => ({
    success: (title, message) => push("success", title, message),
    error: (title, message) => push("error", title, message),
    warning: (title, message) => push("warning", title, message),
    info: (title, message) => push("info", title, message),
  }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const style = STYLES[toast.type];
          const Icon = style.icon;
          return (
            <div key={toast.id} role={toast.type === "error" ? "alert" : "status"} className="pointer-events-auto flex animate-fade-in overflow-hidden rounded-lg border border-slate-200 bg-white shadow-pop">
              <span className={cn("w-1", style.bar)} />
              <div className="flex flex-1 items-start gap-3 p-3.5">
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", style.text)} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
                  {toast.message && <p className="mt-0.5 whitespace-pre-line break-words text-sm text-slate-500">{toast.message}</p>}
                </div>
                <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss" className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}
