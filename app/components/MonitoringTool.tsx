"use client";

import { useState, useEffect } from "react";
import { ratingColor, fmt } from "@/app/lib/utils";

export interface MonitoringEntry {
  id: string;
  activity: string;
  classification: string;
  targetDate: string;
  actualDate: string;
  timeliness: number | null;
  quantity: number | null;
  quality: number | null;
}

interface Props {
  storageKey: string;
}

function calcAvg(entries: MonitoringEntry[], field: "timeliness" | "quantity" | "quality"): number | null {
  const vals = entries.map((e) => e[field]).filter((v): v is number => v !== null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export default function MonitoringTool({ storageKey }: Props) {
  const [entries, setEntries] = useState<MonitoringEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setEntries(JSON.parse(stored));
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, loaded, storageKey]);

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        activity: "",
        classification: "",
        targetDate: "",
        actualDate: "",
        timeliness: null,
        quantity: null,
        quality: null,
      },
    ]);
  };

  const update = (id: string, field: keyof MonitoringEntry, value: string | number | null) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const tAvg = calcAvg(entries, "timeliness");
  const qnAvg = calcAvg(entries, "quantity");
  const qlAvg = calcAvg(entries, "quality");

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
              <tr className="bg-teal-600 text-white">
                <th className="px-2 py-2 text-left font-medium border-r border-teal-500">Activity</th>
                <th className="px-2 py-2 text-left font-medium border-r border-teal-500">Classification</th>
                <th className="px-2 py-2 text-left font-medium border-r border-teal-500 whitespace-nowrap">Target Date</th>
                <th className="px-2 py-2 text-left font-medium border-r border-teal-500 whitespace-nowrap">Actual Date Released / Acted Upon</th>
                <th className="px-2 py-2 text-center font-medium border-r border-teal-500 w-20">Timeliness</th>
                <th className="px-2 py-2 text-center font-medium border-r border-teal-500 w-20">Quantity</th>
                <th className="px-2 py-2 text-center font-medium border-r border-teal-500 w-20">Quality</th>
                <th className="px-2 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className={i % 2 === 0 ? "bg-white" : "bg-teal-50/40"}>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="text"
                      value={entry.activity}
                      onChange={(e) => update(entry.id, "activity", e.target.value)}
                      className="w-full min-w-[140px] text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                      placeholder="Activity description"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="text"
                      value={entry.classification}
                      onChange={(e) => update(entry.id, "classification", e.target.value)}
                      className="w-full min-w-[100px] text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                      placeholder="e.g. Guidelines"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="date"
                      value={entry.targetDate}
                      onChange={(e) => update(entry.id, "targetDate", e.target.value)}
                      className="text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="date"
                      value={entry.actualDate}
                      onChange={(e) => update(entry.id, "actualDate", e.target.value)}
                      className="text-xs bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded px-1 py-0.5"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.01"
                      value={entry.timeliness ?? ""}
                      onChange={(e) => update(entry.id, "timeliness", e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full text-xs bg-transparent focus:outline-none text-center focus:ring-1 focus:ring-teal-300 rounded"
                      placeholder="—"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.01"
                      value={entry.quantity ?? ""}
                      onChange={(e) => update(entry.id, "quantity", e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full text-xs bg-transparent focus:outline-none text-center focus:ring-1 focus:ring-teal-300 rounded"
                      placeholder="—"
                    />
                  </td>
                  <td className="border-b border-r border-gray-100 px-1 py-1">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.01"
                      value={entry.quality ?? ""}
                      onChange={(e) => update(entry.id, "quality", e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full text-xs bg-transparent focus:outline-none text-center focus:ring-1 focus:ring-teal-300 rounded"
                      placeholder="—"
                    />
                  </td>
                  <td className="border-b border-gray-100 px-1 py-1 text-center">
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
              {/* Averages row */}
              <tr className="bg-yellow-50 font-bold">
                <td colSpan={4} className="border-t border-gray-200 px-2 py-2 text-right text-xs text-gray-600 font-semibold">
                  Average
                </td>
                <td className={`border-t border-l border-gray-200 px-2 py-2 text-center text-xs ${ratingColor(tAvg)}`}>
                  {fmt(tAvg)}
                </td>
                <td className={`border-t border-l border-gray-200 px-2 py-2 text-center text-xs ${ratingColor(qnAvg)}`}>
                  {fmt(qnAvg)}
                </td>
                <td className={`border-t border-l border-gray-200 px-2 py-2 text-center text-xs ${ratingColor(qlAvg)}`}>
                  {fmt(qlAvg)}
                </td>
                <td className="border-t border-gray-200"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
