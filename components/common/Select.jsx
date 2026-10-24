import { cn } from "@/utils/cn";
import { fieldBase } from "./Input";

export default function Select({ options = [], placeholder, error, className, ...props }) {
  return (
    <select
      aria-invalid={Boolean(error)}
      className={cn(fieldBase, "h-10 min-h-11 px-3 sm:min-h-0", error ? "border-red-400" : "border-slate-300", className)}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => {
        const item = typeof option === "string" ? { value: option, label: option } : option;
        return (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}
