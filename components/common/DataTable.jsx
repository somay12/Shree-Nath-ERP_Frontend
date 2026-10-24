"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, LoaderCircle, Search, X } from "lucide-react";
import Button from "./Button";
import { cn } from "@/utils/cn";

const PAGE_SIZES = [10, 20, 50];

export default function DataTable({
  columns,
  data = [],
  rowKey,
  loading = false,
  error,
  onRetry,
  emptyTitle = "No records",
  emptyDescription,
  actions,
  toolbar,
  searchKeys,
  searchPlaceholder = "Search records...",
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const search = query.toLowerCase();
    const keys = searchKeys || columns.map((column) => column.key);
    return data.filter((row) => keys.some((key) => {
      const value = row[key];
      return (typeof value === "string" || typeof value === "number") && String(value).toLowerCase().includes(search);
    }));
  }, [columns, data, query, searchKeys]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="card overflow-hidden" aria-busy={loading}>
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            aria-label={searchPlaceholder}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(0); }}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-10 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">{toolbar}</div>
      </div>
      <div className="scroll-thin overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={cn("px-5 py-3 font-semibold", column.align === "right" && "text-right")}>{column.label}</th>
              ))}
              {actions && <th className="px-5 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {errorMessage ? (
              <tr>
                <td colSpan={columns.length + Number(Boolean(actions))} className="px-5 py-10 text-center">
                  <AlertTriangle className="mx-auto h-6 w-6 text-red-600" />
                  <p role="alert" className="mt-2 text-sm font-semibold text-slate-900">Unable to load records</p>
                  <p className="mt-1 text-sm text-slate-600">{errorMessage}</p>
                  <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>Retry</Button>
                </td>
              </tr>
            ) : loading && data.length === 0 ? (
              <tr><td colSpan={columns.length + Number(Boolean(actions))} className="px-5 py-10 text-center text-sm text-slate-500"><LoaderCircle className="mr-2 inline h-4 w-4 animate-spin" />Loading records...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={columns.length + Number(Boolean(actions))} className="px-5 py-10 text-center"><p className="text-sm font-medium text-slate-900">{emptyTitle}</p>{emptyDescription && <p className="mt-1 text-xs text-slate-500">{emptyDescription}</p>}</td></tr>
            ) : rows.map((row) => (
              <tr key={rowKey ? row[rowKey] : row.id} className="group transition-colors hover:bg-slate-50/60">
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-5 py-3", column.align === "right" && "text-right")}>
                    {column.render ? column.render(row[column.key], row) : row[column.key] ?? "—"}
                  </td>
                ))}
                {actions && <td className="px-5 py-3 text-right"><div className="flex items-center justify-end gap-2">{actions(row)}</div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, filtered.length)} of {filtered.length} records</p>
          <div className="flex items-center gap-2">
            <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(0); }} aria-label="Rows per page" className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs">
              {PAGE_SIZES.map((size) => <option key={size} value={size}>{size} / page</option>)}
            </select>
            <button type="button" disabled={currentPage === 0} onClick={() => setPage((value) => value - 1)} className="rounded-lg px-2 py-1 text-xs hover:bg-slate-100 disabled:text-slate-400">Prev</button>
            <span className="text-xs text-slate-500">Page {currentPage + 1} of {pageCount}</span>
            <button type="button" disabled={currentPage + 1 >= pageCount} onClick={() => setPage((value) => value + 1)} className="rounded-lg px-2 py-1 text-xs hover:bg-slate-100 disabled:text-slate-400">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
