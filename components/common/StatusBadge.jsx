import { cn } from "@/utils/cn";

const STATUS_TONES = {
  active: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  approved: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  draft: "bg-slate-100 text-slate-700 ring-slate-500/20",
  pending: "bg-amber-50 text-amber-800 ring-amber-600/20",
  rejected: "bg-red-50 text-red-800 ring-red-600/20",
};

export default function StatusBadge({ status, className }) {
  const tone = STATUS_TONES[String(status).toLowerCase()] || "bg-slate-100 text-slate-700 ring-slate-500/20";
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", tone, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
