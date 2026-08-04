const DEGREE_LEVEL_RULES: { label: string; pattern: RegExp }[] = [
  { label: "Bachelor's", pattern: /bachelor/i },
  { label: "Master's", pattern: /master/i },
  { label: "PhD", pattern: /ph\.?\s?d/i },
  { label: "Diploma", pattern: /diploma/i },
  { label: "Specialization", pattern: /specializ/i },
];

const LEVEL_ORDER = [
  "Bachelor's",
  "Master's",
  "PhD",
  "Diploma",
  "Specialization",
  "Other",
];

/**
 * Mirrors web/scripts/taxonomy.mjs#extractDegreeLevel. Duplicated (rather
 * than shared) because the build script is plain Node ESM and this module
 * is TypeScript — keep the two in sync by hand if the rules change.
 */
function parseDegreeLevel(programme: string): string | null {
  const suffix = programme.split("—").slice(1).join("—");
  if (!suffix) return null;
  if (/not confirmed|not stated/i.test(suffix)) return null;
  for (const rule of DEGREE_LEVEL_RULES) {
    if (rule.pattern.test(suffix)) return rule.label;
  }
  return null;
}

/** Strips the trailing "— Level" tag once it's been lifted into a tab label. */
export function displayProgrammeName(programme: string): string {
  return parseDegreeLevel(programme) ? programme.split("—")[0].trim() : programme;
}

export function groupProgrammesByLevel(
  programmes: string[]
): { level: string; programmes: string[] }[] {
  const groups = new Map<string, string[]>();
  for (const programme of programmes) {
    const level = parseDegreeLevel(programme) ?? "Other";
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level)!.push(programme);
  }
  return LEVEL_ORDER.filter((level) => groups.has(level)).map((level) => ({
    level,
    programmes: groups.get(level)!,
  }));
}
