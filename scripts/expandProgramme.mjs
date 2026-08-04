// Some research bullets condense several distinct, individually-confirmed
// programmes into one semicolon- or comma-joined line (e.g. "BSc in
// Animal Science; MSc in Animal Production; ... — all Bachelor's/Master's").
// This clutters the UI (one very long line instead of one item per line).
//
// This module only reformats how the SAME confirmed names are split into
// list items at build time — it never adds, removes, or changes a name.
// output/*.mdx is left untouched; run against the parsed bullet strings only.

// Splits on commas that are not inside parentheses, so a parenthetical like
// "(Biodiversity Management / Climate Change Adaptation specializations)"
// is never torn apart.
function splitTopLevelCommas(text) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);
  // A trailing "X, and Y" list leaves a leading "and " on the last item once
  // split on commas — that's a conjunction artifact, never part of a name.
  return parts
    .map((p) => p.trim().replace(/^and\s+/i, ""))
    .filter(Boolean);
}

// Recognizes a segment/item that already carries its own degree-title
// prefix (e.g. "MSc in Pharmacology"), so a shared/inherited prefix from
// elsewhere in the same bullet must NOT be re-applied on top of it.
const DEGREE_PREFIX_RE =
  /^(BSc|BVSc|BA|B\.?Ed\.?|B\.?Sc\.?|B\.?A\.?|LL\.?B\.?|LL\.?M\.?|MSc|MVSc|MA|M\.?Ed\.?|M\.?Sc\.?|M\.?A\.?|MBA|PhD|Ph\.?D\.?|DEd|D\.?Ed\.?|Diploma|Bachelor|Master|Doctor|Postgraduate Diploma|Higher Diploma)\b/i;

// "<Prefix> in <A>, <B>, <C> — <Level>" -> one "<Prefix> in <X> — <Level>" per item.
// Some items in the comma list may already carry their own full prefix
// (e.g. "MSc in Clinical Pharmacy, MSc in Pharmacology") — those are kept
// as-is rather than getting the group's prefix stacked on top.
function expandCommaPrefixGroup(segment) {
  const m = segment.match(/^(.*?\bin\s+)(.+?)\s+—\s+(.+)$/i);
  if (!m) return [segment];
  const [, prefix, itemList, level] = m;
  if (!itemList.includes(",")) return [segment];
  const items = splitTopLevelCommas(itemList);
  if (items.length <= 1) return [segment];
  return items.map((item) =>
    DEGREE_PREFIX_RE.test(item) ? `${item} — ${level.trim()}` : `${prefix}${item} — ${level.trim()}`
  );
}

// "<Prefix> in <A>; <Prefix> in <B>; <C>; ... — all <Level>" where some
// segments already carry the full prefix and others are bare topic names
// sharing the group's one trailing level.
function expandSharedLevelGroup(entry) {
  const whole = entry.match(/^(.+?)\s+—\s+(?:all\s+)?(.+)$/);
  if (!whole) return [entry];
  const [, body, level] = whole;
  // If the captured "level" tail still contains an em-dash, this bullet has
  // more than one distinct level embedded in it (e.g. "A; B — Bachelor's;
  // C — Master's") — too structurally mixed to safely split here, so leave
  // the original bullet untouched rather than guess at the boundaries.
  if (level.includes("—")) return [entry];
  const bodyParts = body.split(/;\s*/).filter(Boolean);
  if (bodyParts.length <= 1) return [entry];

  const firstPrefixMatch = bodyParts[0].match(/^(.*?\bin\s+)(.+)$/i);
  const inheritedPrefix = firstPrefixMatch ? firstPrefixMatch[1] : null;

  return bodyParts.map((part) => {
    const trimmed = part.trim();
    const base = DEGREE_PREFIX_RE.test(trimmed)
      ? trimmed
      : inheritedPrefix
        ? `${inheritedPrefix}${trimmed}`
        : trimmed;
    return `${base} — ${level.trim()}`;
  });
}

// A bullet that opens by naming its own shared prefix before the list, e.g.:
//   "12 PhD programmes: Agronomy, Fisheries ... — all PhD"
//   "14 MSc programmes including X, Y, and others — all Master's"
//   "MSc programmes (17 confirmed): Agricultural Economics; Agribusiness ... — all Master's"
//   "PhD programmes: Agricultural Economics; Agribusiness ... — all PhD"
function expandProgrammeCountHeader(entry) {
  const m = entry.match(
    /^(?:\d+\s+)?([A-Za-z.]+)\s+programmes?\s*(?:\([^)]*\)\s*)?(?:including\s+)?:?\s*(.+?)\s+—\s+(?:all\s+)?(.+)$/i
  );
  if (!m) return null;
  const [, abbr, itemListRaw, level] = m;

  const hadOthers = /,?\s*and others?\.?$/i.test(itemListRaw);
  const cleaned = itemListRaw.replace(/,?\s*and others?\.?$/i, "");
  const items = cleaned.includes(";")
    ? cleaned
        .split(/;\s*/)
        .map((s) => s.trim().replace(/^and\s+/i, ""))
        .filter(Boolean)
    : splitTopLevelCommas(cleaned);
  if (items.length <= 1) return null;

  const expanded = items.map((item) =>
    DEGREE_PREFIX_RE.test(item) ? `${item} — ${level.trim()}` : `${abbr} in ${item} — ${level.trim()}`
  );
  if (hadOthers) {
    // Starts with "Additional" so the existing caveat filter drops it from
    // the published list, same as every other data-quality note in this
    // pipeline — it documents the gap without presenting the list as exhaustive.
    expanded.push(
      `Additional ${abbr} programmes beyond these ${items.length} may exist — the official source names these while saying "and others" without listing every title.`
    );
  }
  return expanded;
}

/**
 * Expands one confirmed department/programme bullet into one or more
 * confirmed items, if it was written as a condensed list. Returns the
 * original entry unchanged (as a single-item array) when no known
 * condensed-list shape matches.
 */
export function expandProgrammeEntry(entry) {
  const headered = expandProgrammeCountHeader(entry);
  if (headered) return headered;

  const segments = entry.split(/;\s*/).filter(Boolean);
  if (segments.length <= 1) return [entry];

  // Every segment already carries its own trailing level, e.g.
  // "BSc in X — Bachelor's; MSc in Y — Master's".
  if (segments.every((s) => /—/.test(s))) {
    return segments.flatMap((s) => expandCommaPrefixGroup(s.trim()));
  }

  // One shared trailing level for the whole group; segments may or may not
  // each already carry their own prefix, e.g.
  // "BSc in Architecture; Computer Engineering; ... — all Bachelor's" or
  // "BSc in Animal Science; BSc in Natural Resources Management; ... — all Bachelor's".
  return expandSharedLevelGroup(entry);
}
