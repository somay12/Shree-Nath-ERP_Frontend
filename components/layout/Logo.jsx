export default function Logo({ collapsed = false, dark = false }) {
  const textPrimary = dark ? "text-white" : "text-slate-900";
  const textSecondary = dark ? "text-slate-300" : "text-slate-700";

  return (
    <div className="flex items-center gap-3">
      {!collapsed ? (
        <span className="leading-tight">
          <span className={`block text-sm font-semibold tracking-wide ${textPrimary}`}>SHREE NATH</span>
          <span className={`block text-[11px] font-medium uppercase tracking-[0.18em] ${textSecondary}`}>
            Exports · ERP
          </span>
        </span>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
          S
        </span>
      )}
    </div>
  );
}
