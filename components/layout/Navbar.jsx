"use client";

import { Bell, Menu, Search } from "lucide-react";

export default function Navbar({ onOpenMobileMenu }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-slate-200/80 bg-white/95 px-2.5 backdrop-blur-md sm:gap-3 sm:px-4 lg:px-6">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Open navigation menu"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex min-w-0 flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>
      <button type="button" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800">
        <Bell className="h-5 w-5" />
      </button>
      <button type="button" aria-label="User menu" className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-slate-50">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">S</span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium text-slate-800">Shree Nath</span>
          <span className="block text-xs text-slate-500">Workspace</span>
        </span>
      </button>
    </header>
  );
}
