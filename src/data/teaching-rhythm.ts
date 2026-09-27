/** The weekly meeting is separate from each week's self-paced preparation. */
export const teachingRhythm = {
  seminarDay: "Monday",
  startTime: "14:00",
  endTime: "15:30",
  location: "Slop Library, seminar room 2",
  timeZone: "Australia/Canberra",
  timeZoneLabel: "Canberra time",
  followUpMinutes: 30,
} as const;

export const seminarTime = `${teachingRhythm.startTime}–${teachingRhythm.endTime}`;
const clockMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
export const seminarDurationMinutes = clockMinutes(teachingRhythm.endTime) - clockMinutes(teachingRhythm.startTime);

export interface PreparationStep {
  title: string;
  minutes: number;
  detail: string;
  href?: string;
}

interface PreparationEntry {
  id: string;
  data: Record<string, unknown>;
}

/** These authored fields pass through the fixed content schema; validate at the UI boundary. */
export function getSessionPreparation(session: PreparationEntry): {
  minutes: number; steps: PreparationStep[]; takeaway: string;
} {
  const { preparationMinutes, preparationSteps, takeaway } = session.data;
  const fail = (reason: string): never => { throw new Error(`Session ${session.id}: ${reason}`); };
  if (typeof preparationMinutes !== "number" || !Number.isInteger(preparationMinutes) || preparationMinutes <= 0) {
    return fail("preparationMinutes must be a positive whole number.");
  }
  if (!Array.isArray(preparationSteps) || preparationSteps.length === 0) {
    return fail("add ordered preparationSteps before publishing a weekly plan.");
  }
  const steps = preparationSteps.map((step: unknown, index: number): PreparationStep => {
    if (!step || typeof step !== "object") return fail(`preparation step ${index + 1} must be an object.`);
    const item = step as Record<string, unknown>;
    if (typeof item.title !== "string" || !item.title.trim() || typeof item.detail !== "string" || !item.detail.trim()) {
      return fail(`preparation step ${index + 1} needs a title and detail.`);
    }
    if (typeof item.minutes !== "number" || !Number.isInteger(item.minutes) || item.minutes <= 0) {
      return fail(`preparation step ${index + 1} needs a positive whole-minute allowance.`);
    }
    if (item.href !== undefined && (typeof item.href !== "string" || !/^(\/(?!\/)|https?:\/\/)/.test(item.href))) {
      return fail(`preparation step ${index + 1} needs a site path or an http(s) URL.`);
    }
    return { title: item.title, minutes: item.minutes, detail: item.detail, ...(typeof item.href === "string" ? { href: item.href } : {}) };
  });
  if (steps.reduce((total, step) => total + step.minutes, 0) !== preparationMinutes) {
    return fail("preparation step allowances must equal preparationMinutes.");
  }
  if (typeof takeaway !== "string" || !takeaway.trim()) return fail("add a concrete takeaway.");
  return { minutes: preparationMinutes, steps, takeaway };
}

const deadlineFormat = new Intl.DateTimeFormat("en-AU", {
  weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit",
  timeZone: teachingRhythm.timeZone,
});
const localDateParts = new Intl.DateTimeFormat("en-AU", {
  year: "numeric", month: "2-digit", day: "2-digit", timeZone: teachingRhythm.timeZone,
});

export const formatTeachingDeadline = (due: Date): string => `${deadlineFormat.format(due)}, ${teachingRhythm.timeZoneLabel}`;

/** Compare calendar days locally; assessment timestamps can cross a daylight-saving boundary. */
export function isDueInTeachingWeek(due: Date, monday: Date): boolean {
  const parts = Object.fromEntries(localDateParts.formatToParts(due).map((part) => [part.type, part.value]));
  const dueDay = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const firstDay = Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate());
  return dueDay >= firstDay && dueDay < firstDay + 7 * 24 * 60 * 60 * 1000;
}

/** Match a reading's route while keeping its original hash/query in the rendered link. */
export const materialPath = (href: string): string => href.split(/[?#]/, 1)[0].replace(/\/$/, "");
