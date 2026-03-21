"use client";

import { useState, useEffect } from "react";
import { ratingColor, fmt } from "@/app/lib/utils";

export interface MonitoringEntry {
  id: string;
  activity: string;
  referenceNo: string;
  period: string;
  dateReceived: string;
  dateCompleted: string;
  timeliness: number | null;
  quality: number | null;
  quantity: number | null;
  remarks: string;
}

// Maps DPAR dim codes to MonitoringEntry fields and display labels
const DIM_MAP: Record<string, { field: "timeliness" | "quality" | "quantity"; label: string }> = {
  T:  { field: "timeliness", label: "Timeliness (1–5)" },
  Ql: { field: "quality",    label: "Quality (1–5)" },
  Qn: { field: "quantity",   label: "Quantity (1–5)" },
};

// Column order in the Excel: T → Ql → Qn
const DIM_ORDER = ["T", "Ql", "Qn"];

function scoreColor(val: number | null): string {
  if (val === null) return "";
  if (val >= 5)   return "bg-green-100 text-green-800";
  if (val >= 4)   return "bg-yellow-100 text-yellow-800";
  if (val >= 3)   return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
}

function calcAvg(entries: MonitoringEntry[], field: "timeliness" | "quality" | "quantity"): number | null {
  const vals = entries.map((e) => e[field]).filter((v): v is number => v !== null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

interface Props {
  storageKey: string;
  dims: string[];
  defaultEntries?: Omit<MonitoringEntry, "id">[];
}

export default function MonitoringTool({ storageKey, dims, defaultEntries }: Props) {
  // Only include dims that are applicable for this SI, in standard column order
  const activeDims = DIM_ORDER.filter((d) => dims.includes(d)).map((d) => DIM_MAP[d]);

  const [entries, setEntries] = useState<MonitoringEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setEntries(JSON.parse(stored));
    } else if (defaultEntries && defaultEntries.length > 0) {
      setEntries(defaultEntries.map((e) => ({ ...e, id: crypto.randomUUID() })));
    }
    setLoaded(true);
  }, [storageKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, loaded, storageKey]);

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        activity: "",
        referenceNo: "",
        period: "",
        dateReceived: "",
        dateCompleted: "",
        timeliness: null,
        quality: null,
        quantity: null,
        remarks: "",
      },
    ]);
  };

  const update = (id: string, field: keyof MonitoringEntry, value: string | number | null) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const dimAvgs = Object.fromEntries(
    activeDims.map(({ field }) => [field, calcAvg(entries, field)])
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wide text-teal-700">
          Monitoring Tool
        </h4>
        <button
          onClick={addEntry}
          className="text-xs bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg transition-colors"
        >
          + Add Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-gray-400 italic py-2">
          No entries yet. Click &quot;+ Add Entry&quot; to start logging accomplishments.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-teal-100">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#17375E] text-white">
                <th className="px-2 py-2 text-center font-medium border-r border-blue-900 w-8">#</th>
                <th className="px-2 py-2 text-left font-medium border-r border-blue-900 min-w-[180px]">Activity / Document</th>
                <th className="px-2 py-2 text-left font-medium border-r border-blue-900 min-w-[140px]">Reference No.</th>
                <th className="px-2 py-2 text-center font-medium border-r border-blue-900 w-16">Period</th>
                <th className="px-2 py-2 text-center font-medium border-r border-blue-900 w-28">Date Received</th>
                <th className="px-2 py-2 text-center font-medium border-r border-blue-900 w-28">Date Completed</th>
                {activeDims.map(({ label }) => (
                  <th key={label} className="px-2 py-2 text-center font-medium border-r border-blue-900 w-24 whitespace-pre-line leading-tight">{label}</th>
                ))}
                <th className="px-2 py-2 text-left font-medium border-r border-blue-900 min-w-[160px]">Remarks / Status</th>
                <th className="px-2 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {/* Row number */}
                  <td className="border-b border-r border-gray-200 px-2 py-1 text-center text-gray-400 font-medium">
                    {i + 1}
                  </td>
                  {/* Activity */}
                  <td className="border-b border-r border-gray-200 px-1 py-1">
                    <textarea
                      value={entry.activity}
                      onChange={(e) => update(entry.id, "activity", e.target.value)}
                      rows={2}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5 resize-none"
                      placeholder="Activity / Document"
                    />
                  </td>
                  {/* Reference No. */}
                  <td className="border-b border-r border-gray-200 px-1 py-1">
                    <input
                      type="text"
                      value={entry.referenceNo}
                      onChange={(e) => update(entry.id, "referenceNo", e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                      placeholder="e.g. 2025-HRDD-0023260"
                    />
                  </td>
                  {/* Period */}
                  <td className="border-b border-r border-gray-200 px-1 py-1 text-center">
                    <select
                      value={entry.period}
                      onChange={(e) => update(entry.id, "period", e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                    >
                      <option value="">—</option>
                      <option>Q1</option>
                      <option>Q2</option>
                      <option>Q3</option>
                      <option>Q4</option>
                    </select>
                  </td>
                  {/* Date Received */}
                  <td className="border-b border-r border-gray-200 px-1 py-1">
                    <input
                      type="text"
                      value={entry.dateReceived}
                      onChange={(e) => update(entry.id, "dateReceived", e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                      placeholder="e.g. Aug 28, 2025"
                    />
                  </td>
                  {/* Date Completed */}
                  <td className="border-b border-r border-gray-200 px-1 py-1">
                    <input
                      type="text"
                      value={entry.dateCompleted}
                      onChange={(e) => update(entry.id, "dateCompleted", e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                      placeholder="e.g. Aug 29, 2025"
                    />
                  </td>
                  {/* Dimension scores */}
                  {activeDims.map(({ field }) => (
                    <td key={field} className={`border-b border-r border-gray-200 px-1 py-1 text-center ${scoreColor(entry[field])}`}>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.01"
                        value={entry[field] ?? ""}
                        onChange={(e) => update(entry.id, field, e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-full text-xs bg-transparent focus:outline-none text-center focus:ring-1 focus:ring-teal-300 rounded"
                        placeholder="—"
                      />
                    </td>
                  ))}
                  {/* Remarks */}
                  <td className="border-b border-r border-gray-200 px-1 py-1">
                    <textarea
                      value={entry.remarks}
                      onChange={(e) => update(entry.id, "remarks", e.target.value)}
                      rows={2}
                      className="w-full text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5 resize-none"
                      placeholder="Notes / status"
                    />
                  </td>
                  {/* Delete */}
                  <td className="border-b border-gray-200 px-1 py-1 text-center">
                    <button
                      onClick={() => remove(entry.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-base leading-none"
                      title="Delete"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              {/* Quarter averages row */}
              <tr className="bg-[#DAEEF3] font-semibold">
                <td colSpan={6} className="border-t-2 border-gray-300 px-3 py-2 text-right text-xs text-[#17375E]">
                  Average ({entries.length} {entries.length === 1 ? "entry" : "entries"})
                </td>
                {activeDims.map(({ field }) => (
                  <td key={field} className={`border-t-2 border-l border-gray-300 px-2 py-2 text-center text-xs font-bold ${ratingColor(dimAvgs[field] ?? null)} bg-green-50`}>
                    {fmt(dimAvgs[field] ?? null)}
                  </td>
                ))}
                <td className="border-t-2 border-l border-gray-300"></td>
                <td className="border-t-2 border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
