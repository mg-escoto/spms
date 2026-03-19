export function ratingColor(val: number | null): string {
  if (val === null) return "text-gray-400";
  if (val >= 4.5) return "text-emerald-600 font-semibold";
  if (val >= 3.5) return "text-amber-600 font-semibold";
  return "text-red-600 font-semibold";
}

export function ratingBadge(val: number | null): string {
  if (val === null) return "bg-gray-100 text-gray-500";
  if (val >= 4.5) return "bg-emerald-100 text-emerald-700";
  if (val >= 3.5) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

export function fmt(val: number | null): string {
  if (val === null) return "—";
  return val.toFixed(2);
}

export function overallBadgeClass(val: number): string {
  if (val >= 4.5) return "bg-emerald-500";
  if (val >= 3.5) return "bg-amber-500";
  return "bg-red-500";
}

export function avg(nums: (number | null)[]): number | null {
  const vals = nums.filter((v): v is number => v !== null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
