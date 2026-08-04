"use client";

import { useState } from "react";
import { groupProgrammesByLevel, displayProgrammeName } from "@/lib/degreeLevel";

export function ProgrammeTabs({ programmes }: { programmes: string[] }) {
  const groups = groupProgrammesByLevel(programmes);
  const [active, setActive] = useState(groups[0]?.level);

  if (groups.length === 0) return null;

  // A single degree level doesn't need a tab affordance — just list it.
  if (groups.length === 1) {
    return (
      <ul className="flex flex-col gap-1 text-[15px] text-muted">
        {groups[0].programmes.map((p) => (
          <li key={p}>{displayProgrammeName(p)}</li>
        ))}
      </ul>
    );
  }

  const activeGroup = groups.find((g) => g.level === active) ?? groups[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Degree level"
        className="flex flex-wrap gap-1 border-b border-line"
      >
        {groups.map((g) => (
          <button
            key={g.level}
            type="button"
            role="tab"
            aria-selected={g.level === activeGroup.level}
            onClick={() => setActive(g.level)}
            className={`-mb-px border-b-2 px-3 py-1.5 text-sm transition-colors ${
              g.level === activeGroup.level
                ? "border-ink text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {g.level}
            <span className="ml-1.5 text-xs text-muted">{g.programmes.length}</span>
          </button>
        ))}
      </div>
      <ul role="tabpanel" className="mt-3 flex flex-col gap-1 text-[15px] text-muted">
        {activeGroup.programmes.map((p) => (
          <li key={p}>{displayProgrammeName(p)}</li>
        ))}
      </ul>
    </div>
  );
}
