"use client";

import { useState } from "react";

// Test children only. No real student data.
const CHILDREN = [
  { id: "c1", name: "Adaeze Okafor", className: "JSS 1A" },
  { id: "c2", name: "Chinedu Okafor", className: "SS 2B" },
];

export default function ExcuseNote() {
  const [childId, setChildId] = useState(CHILDREN[0].id);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function sendNote() {
    if (!date) {
      setError("Please choose the date your child will be away.");
      return;
    }
    if (reason.trim().length < 5) {
      setError("Please tell the teacher why your child will be away.");
      return;
    }
    setError("");
    // TODO: save the note and notify the class teacher once Neon and login are set up.
    setSent(true);
  }

  function writeAnother() {
    setDate("");
    setReason("");
    setSent(false);
  }

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-lg border-2 border-slate-300 bg-white px-3 text-base text-slate-900";

  if (sent) {
    return (
      <section aria-labelledby="excuse-title">
        <h2 id="excuse-title" className="text-xl font-semibold text-navy">
          Send excuse note
        </h2>
        <p
          role="status"
          className="mt-4 rounded-lg bg-green-100 px-4 py-3 font-medium text-green-900"
        >
          Your note has been sent to the class teacher.
        </p>
        <button
          type="button"
          onClick={writeAnother}
          className="mt-4 min-h-14 w-full rounded-xl border-2 border-navy bg-white px-5 text-lg font-semibold text-navy active:bg-slate-100"
        >
          Write another note
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="excuse-title">
      <h2 id="excuse-title" className="text-xl font-semibold text-navy">
        Send excuse note
      </h2>
      <p className="mt-1 text-slate-700">
        Tell the class teacher why your child will be away.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <label className="block font-semibold text-slate-900">
          Child
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className={fieldClass}
          >
            {CHILDREN.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.className})
              </option>
            ))}
          </select>
        </label>

        <label className="block font-semibold text-slate-900">
          Date of absence
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block font-semibold text-slate-900">
          Reason
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="For example: clinic appointment"
            className="mt-2 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-3 text-base text-slate-900"
          />
        </label>
      </div>

      <div role="alert" className="mt-3 min-h-6">
        {error && (
          <p className="rounded-lg bg-red-100 px-4 py-3 font-medium text-red-900">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={sendNote}
        className="mt-3 min-h-14 w-full rounded-xl bg-navy px-5 text-lg font-semibold text-white active:opacity-90"
      >
        Send excuse note
      </button>
    </section>
  );
}
