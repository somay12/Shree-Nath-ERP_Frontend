"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CheckSquare,
  ChevronDown,
  FileText,
  Factory,
  Handshake,
  Landmark,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Undo2,
  Users,
  Wallet,
  Warehouse,
  X,
} from "lucide-react";
import { NAV } from "@/config/navConfig";
import Logo from "./Logo";
import { cn } from "@/utils/cn";

const ICONS = {
  BarChart3,
  Bell,
  CheckSquare,
  FileText,
  Factory,
  Handshake,
  Landmark,
  LayoutDashboard,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Undo2,
  Users,
  Wallet,
  Warehouse,
};

export default function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }) {
  const pathname = usePathname();
  const activePath = NAV.flatMap((item) => item.path ? [item.path] : item.children.map((child) => child.path))
    .filter((path) => pathname === path || pathname.startsWith(`${path}/`))
    .sort((a, b) => b.length - a.length)[0];
  const activeGroup = NAV.find((item) => item.children?.some((child) => child.path === activePath));
  const [openGroups, setOpenGroups] = useState(null);
  const rail = collapsed && !mobileOpen;

  const toggleGroup = (label) => {
    setOpenGroups((current) => {
      const next = new Set(current ?? (activeGroup ? [activeGroup.label] : []));
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onCloseMobile}
          aria-label="Close navigation"
        />
      )}
      <aside
        aria-label="Primary navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-dvh flex-col border-r border-slate-200/80 bg-white text-slate-900 transition-[width,transform] duration-200",
          "w-[85vw] max-w-[272px] lg:static lg:translate-x-0",
          rail ? "lg:w-[72px]" : "lg:w-[272px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className={cn("flex h-16 shrink-0 items-center border-b border-slate-200", rail ? "justify-center px-0" : "justify-between px-4")}>
          <Logo collapsed={rail} />
          <button type="button" onClick={onCloseMobile} aria-label="Close menu" className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="scroll-thin min-h-0 flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV.map((item) => {
            const Icon = ICONS[item.icon];
            if (item.path) {
              const active = item.path === activePath;
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  title={rail ? item.label : undefined}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-100" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                    rail && "h-11 w-full justify-center px-0",
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!rail && <span className="truncate">{item.label}</span>}
                </Link>
              );
            }

            const isOpen = (openGroups === null ? activeGroup?.label === item.label : openGroups.has(item.label)) && !rail;
            const hasActive = item.children.some((child) => child.path === activePath);
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) onToggleCollapse();
                    toggleGroup(item.label);
                  }}
                  aria-expanded={isOpen}
                  title={rail ? item.label : undefined}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    hasActive ? "text-brand-800" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                    rail && "h-11 justify-center px-0",
                  )}
                >
                  <Icon className={cn("h-[18px] w-[18px] shrink-0", hasActive && "text-brand-600")} />
                  {!rail && (
                    <>
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-400 transition-transform", isOpen && "rotate-180")} />
                    </>
                  )}
                </button>
                {isOpen && (
                  <ul className="ml-[22px] mt-0.5 space-y-0.5 border-l border-slate-200 pl-3">
                    {item.children.map((child) => {
                      const active = child.path === activePath;
                      return (
                        <li key={child.path}>
                          <Link
                            href={child.path}
                            onClick={onCloseMobile}
                            className={cn(
                              "block truncate rounded-md px-3 py-1.5 text-[13px] transition-colors",
                              active ? "bg-brand-50 font-semibold text-brand-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-auto hidden shrink-0 border-t border-slate-200 p-3 lg:block">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={rail ? "Expand sidebar" : "Collapse sidebar"}
            title={rail ? "Expand sidebar" : undefined}
            className={cn(
              "flex min-h-10 w-full items-center rounded-lg py-2 text-sm text-slate-900 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500",
              rail ? "justify-center px-0" : "gap-3 px-3",
            )}
          >
            {rail ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            {!rail && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
