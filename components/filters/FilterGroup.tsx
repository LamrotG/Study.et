"use client";

import { useId, useState } from "react";

export type FilterOption = {
  value: string;
  label: string;
  count: number;
};

const VISIBLE_COUNT = 6;

export function FilterGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const groupId = useId();

  if (options.length === 0) return null;

  function toggle(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  }

  const visible = options.slice(0, VISIBLE_COUNT);
  const overflow = options.slice(VISIBLE_COUNT);

  const renderOption = (option: FilterOption) => {
    const isSelected = selected.includes(option.value);
    return (
      <div
        key={option.value}
        className={`flex items-center justify-between gap-2 rounded px-1.5 py-1 text-[13px] ${
          isSelected ? "bg-subtle" : "hover:bg-subtle"
        }`}
      >
        <label className="flex flex-1 cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggle(option.value)}
            className="h-3.5 w-3.5 rounded-sm border-line accent-ink"
          />
          {option.label}
        </label>
        <span className="flex items-center gap-1.5">
          <span className="text-xs text-muted">{option.count}</span>
          {isSelected && (
            <button
              type="button"
              aria-label={`Remove ${option.label}`}
              onClick={() => toggle(option.value)}
              className="text-muted hover:text-ink"
            >
              ✕
            </button>
          )}
        </span>
      </div>
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={groupId}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
          selected.length > 0
            ? "border-ink bg-ink text-paper"
            : "border-line hover:border-ink"
        }`}
      >
        <span>{title}</span>
        {selected.length > 0 && (
          <span
            className={`rounded-full px-1.5 text-[11px] leading-none ${
              selected.length > 0 ? "bg-paper/20 text-paper" : "bg-subtle"
            }`}
          >
            {selected.length}
          </span>
        )}
        <span aria-hidden="true" className="text-xs">
          +
        </span>
      </button>

      {open && (
        <div
          id={groupId}
          className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-line bg-paper p-2 shadow-lg"
        >
          <div className="flex flex-col gap-0.5">
            {visible.map(renderOption)}
            {overflow.length > 0 && (
              <div className="mt-0.5 flex max-h-48 flex-col gap-0.5 overflow-y-auto border-t border-line pt-1.5">
                {overflow.map(renderOption)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}