export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function isSameDay(a?: Date, b?: Date): boolean {
  if (!a || !b) return false;
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function clampDate(d: Date, min?: Date, max?: Date): Date {
  const t = d.getTime();
  const minT = min ? startOfDay(min).getTime() : -Infinity;
  const maxT = max ? startOfDay(max).getTime() : Infinity;
  return new Date(Math.min(maxT, Math.max(minT, t)));
}

export function addMonths(d: Date, delta: number): Date {
  const x = new Date(d);
  x.setMonth(x.getMonth() + delta);
  return x;
}

export function inRange(day: Date, start?: Date, end?: Date): boolean {
  if (!start || !end) return false;
  const t = startOfDay(day).getTime();
  const a = startOfDay(start).getTime();
  const b = startOfDay(end).getTime();
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return t >= lo && t <= hi;
}
