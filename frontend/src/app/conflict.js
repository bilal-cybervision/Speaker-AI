const TRAVEL = {
  Chamber: { "Speaker's Chamber": 8, "Speaker's Lounge": 8, "Diplomatic Lounge": 10, "Committee Room 2": 18, "PIPS, Islamabad": 35, "Serena Hotel, Islamabad": 25 },
  "Speaker's Chamber": { Chamber: 8, "Speaker's Lounge": 4, "Diplomatic Lounge": 6, "Committee Room 2": 12 },
  "Speaker's Lounge": { Chamber: 8, "Speaker's Chamber": 4, "Diplomatic Lounge": 5, "Committee Room 2": 12 },
  "Diplomatic Lounge": { Chamber: 10, "Speaker's Chamber": 6, "Speaker's Lounge": 5, "Committee Room 2": 14 },
  "Committee Room 2": { Chamber: 18, "Speaker's Chamber": 12, "Speaker's Lounge": 12, "Diplomatic Lounge": 14 },
};

export function travelMinutes(from, to) {
  if (!from || !to || from === to) return 0;
  return TRAVEL[from]?.[to] || TRAVEL[to]?.[from] || 12;
}

export function sittingBlocksOutside(slot, sitting) {
  if (!sitting) return false;
  const place = String(slot.place || "");
  return place && place !== "Chamber" && !/sitting|chair|question hour/i.test(slot.title || "");
}

export function analyseAgenda(slots = [], sittingToday = true) {
  const sorted = [...slots].sort((a, b) => a.start - b.start);
  const conflicts = [];
  for (let i = 0; i < sorted.length; i += 1) {
    const slot = sorted[i];
    if (sittingBlocksOutside(slot, sittingToday) && slot.end > new Date()) {
      conflicts.push({
        id: `sit-${i}`,
        type: "sitting",
        tone: "amber",
        title: slot.title,
        detail: `Sitting day: ${slot.place} overlaps the House being in session. Protocol should keep a 30-minute buffer from the Chamber.`,
        a: slot,
      });
    }
    const next = sorted[i + 1];
    if (!next) continue;
    if (slot.end > next.start) {
      const mins = Math.round((slot.end - next.start) / 60000);
      conflicts.push({
        id: `ov-${i}`,
        type: "overlap",
        tone: "red",
        title: `${slot.title} overlaps ${next.title}`,
        detail: `Direct overlap of ${Math.abs(mins)} minutes.`,
        a: slot,
        b: next,
      });
    } else {
      const gap = Math.round((next.start - slot.end) / 60000);
      const need = travelMinutes(slot.place, next.place);
      if (need && gap < need) {
        conflicts.push({
          id: `tr-${i}`,
          type: "travel",
          tone: "amber",
          title: slot.title,
          detail: `Travel ${slot.place} → ${next.place} needs ${need} min; only ${gap} min is left before “${next.title}”.`,
          a: slot,
          b: next,
          need,
          gap,
        });
      }
    }
  }
  const tagged = sorted.map((slot) => {
    const hit = conflicts.find((item) => item.a === slot || item.b === slot);
    if (!hit) return slot;
    const tag = hit.type === "overlap" ? "Clash: overlap" : hit.type === "travel" ? `Clash: travel ${hit.need} min` : "Sitting-day clash";
    return { ...slot, tag, tone: hit.tone, conflictId: hit.id };
  });
  return { slots: tagged, conflicts };
}

export function weekConflicts(week = [], invites = []) {
  const out = [];
  for (const day of week) {
    if (day.sitting && day.items.some((item) => /ambassador|hotel|pips|requested|convocation/i.test(item))) {
      out.push({ day: day.day, text: `Sitting day: an outside engagement is listed (${day.items.filter((item) => /ambassador|hotel|pips|requested|convocation/i.test(item)).join(", ")}).` });
    }
    const requested = day.items.filter((item) => /requested/i.test(item));
    if (requested.length && day.items.length > 1) {
      out.push({ day: day.day, text: `${requested.join(", ")} is still only requested on a day that already has ${day.items.length} items.` });
    }
  }
  for (const invite of invites) {
    if (invite.conflict && !invite.answer) out.push({ day: null, text: invite.conflict, invite: invite.id });
  }
  return out;
}
