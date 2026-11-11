"use client";

import { useState, useSyncExternalStore } from "react";

type Status = "present" | "absent" | "late" | "excused";

const STATUS_OPTIONS: { value: Status; label: string; activeClass: string }[] = [
  { value: "present", label: "Present", activeClass: "border-navy bg-navy text-white" },
  { value: "absent", label: "Absent", activeClass: "border-gold bg-gold text-navy" },
  { value: "late", label: "Late", activeClass: "border-slate-700 bg-slate-700 text-white" },
  { value: "excused", label: "Excused", activeClass: "border-sky-700 bg-sky-700 text-white" },
];

// Test students only. No real student data.
const STUDENTS = [
  { id: "s1", name: "Adaeze Okafor" },
  { id: "s2", name: "Blessing Osagie" },
  { id: "s3", name: "Chinedu Eze" },
  { id: "s4", name: "Efe Idahosa" },
  { id: "s5", name: "Fatima Bello" },
  { id: "s6", name: "Gift Omoregie" },
  { id: "s7", name: "Ibrahim Musa" },
  { id: "s8", name: "Osas Aigbe" },
];

function todayLabel() {
  return new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function RollCall() {
  const [marks, setMarks] = useState<Record<string, Status>>({});
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  // Empty on the server, today's date on the phone, so they never disagree.
  const today = useSyncExternalStore(
    () => () => {},
    todayLabel,
    () => "",
  );

  const count = (status: Status) =>
    STUDENTS.filter((s) => marks[s.id] === status).length;
  const unmarked = STUDENTS.filter((s) => !marks[s.id]).length;

  function setStatus(id: string, status: Status) {
    setMarks((m) => ({ ...m, [id]: status }));
    setMessage(null);
  }

  function markAllPresent() {
    const all: Record<string, Status> = {};
    STUDENTS.forEach((s) => (all[s.id] = "present"));
    setMarks(all);
    setMessage(null);
  }

  function saveRollCall() {
    if (unmarked > 0) {
      setMessage({
        kind: "error",
        text: `${unmarked} student${unmarked === 1 ? " is" : "s are"} not marked yet. Please mark everyone before saving.`,
      });
      return;
    }
    // TODO: send to the database once Neon and login are set up.
    setMessage({
      kind: "ok",
      text: `Roll call saved: ${count("present")} present, ${count("absent")} absent, ${count("late")} late, ${count("excused")} excused.`,
    });
  }

  return (
    <section aria-labelledby="roll-call-title">
      <h2 id="roll-call-title" className="text-xl font-semibold text-navy">
        Daily Roll Call
      </h2>
      <p className="mt-1 text-slate-700">{today || "\u00A0"}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={markAllPresent}
          className="min-h-14 flex-1 rounded-xl border-2 border-navy bg-white px-5 text-lg font-semibold text-navy active:bg-slate-100"
        >
          Mark all present
        </button>
        <button
          type="button"
          onClick={saveRollCall}
          className="min-h-14 flex-1 rounded-xl bg-navy px-5 text-lg font-semibold text-white active:opacity-90"
        >
          Save roll call
        </button>
      </div>

      <div role="status" aria-live="polite" className="mt-3 min-h-6">
        {message && (
          <p
            className={
              message.kind === "ok"
                ? "rounded-lg bg-green-100 px-4 py-3 font-medium text-green-900"
                : "rounded-lg bg-red-100 px-4 py-3 font-medium text-red-900"
            }
          >
            {message.text}
          </p>
        )}
      </div>

      <p className="mt-2 text-sm font-medium text-slate-700">
        Present: {count("present")} · Absent: {count("absent")} · Late:{" "}
        {count("late")} · Excused: {count("excused")} · Not marked: {unmarked}
      </p>

      <ul className="mt-3 flex flex-col gap-3">
        {STUDENTS.map((s) => {
          const status = marks[s.id];
          return (
            <li
              key={s.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="font-semibold text-slate-900">{s.name}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={status === opt.value}
                    onClick={() => setStatus(s.id, opt.value)}
                    className={`min-h-12 rounded-lg border-2 font-semibold ${
                      status === opt.value
                        ? opt.activeClass
                        : "border-slate-300 bg-white text-slate-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
