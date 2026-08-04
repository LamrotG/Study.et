"use client";

import { useState } from "react";
import type { AcademicUnit } from "@/lib/data";
import { ProgrammeTabs } from "@/components/university/ProgrammeTabs";

export function AcademicUnitAccordion({ units }: { units: AcademicUnit[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    units.length === 1 ? 0 : null
  );

  return (
    <div className="flex flex-col gap-3">
      {units.map((unit, i) => {
        const isOpen = openIndex === i;
        const panelId = `academic-unit-panel-${i}`;

        return (
          <div key={unit.name} className="rounded-lg border border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="flex flex-wrap items-baseline gap-2">
                <span className="text-[15px] font-medium">{unit.name}</span>
                {unit.officialType && (
                  <span className="rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
                    {unit.officialType}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-muted transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {isOpen && (
              <div id={panelId} className="border-t border-line px-5 py-5">
                {unit.departments.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
                      Departments
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1 text-[15px]">
                      {unit.departments.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {unit.programmes.length > 0 && (
                  <div className={unit.departments.length > 0 ? "mt-5" : undefined}>
                    <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
                      Programmes
                    </h3>
                    <div className="mt-2">
                      <ProgrammeTabs programmes={unit.programmes} />
                    </div>
                  </div>
                )}

                {unit.departments.length === 0 && unit.programmes.length === 0 && (
                  <p className="text-sm text-muted">
                    No confirmed departments or programmes yet.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
