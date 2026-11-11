import { CHILDREN_ATTENDANCE, type Status } from "./attendance-data";

const STATUS_INFO: Record<
  Status,
  { word: string; mark: string; badge: string; sentence: (first: string) => string }
> = {
  present: {
    word: "Present",
    mark: "✓",
    badge: "bg-navy text-white",
    sentence: (n) => `${n} was in school.`,
  },
  absent: {
    word: "Absent",
    mark: "✗",
    badge: "bg-gold text-navy",
    sentence: (n) => `${n} was not in school.`,
  },
  late: {
    word: "Late",
    mark: "!",
    badge: "bg-slate-700 text-white",
    sentence: (n) => `${n} came in late.`,
  },
  excused: {
    word: "Excused",
    mark: "✓",
    badge: "bg-sky-700 text-white",
    sentence: (n) => `${n} was away with a note.`,
  },
};

function Badge({ status }: { status: Status }) {
  const info = STATUS_INFO[status];
  return (
    <span
      className={`inline-flex min-h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold ${info.badge}`}
    >
      <span aria-hidden="true">{info.mark}</span>
      {info.word}
    </span>
  );
}

export default function Attendance() {
  return (
    <section aria-labelledby="attendance-title">
      <h2 id="attendance-title" className="text-xl font-semibold text-navy">
        Daily attendance
      </h2>
      <p className="mt-1 text-slate-700">
        See when your child is present or absent.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        {CHILDREN_ATTENDANCE.map((child) => {
          const latest = child.days[0];
          const firstName = child.name.split(" ")[0];
          const total = (s: Status) =>
            child.days.filter((d) => d.status === s).length;

          return (
            <article
              key={child.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {child.name}{" "}
                <span className="font-normal text-slate-600">
                  ({child.className})
                </span>
              </h3>

              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">
                  Latest school day: {latest.label}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Badge status={latest.status} />
                  <span className="text-slate-800">
                    {STATUS_INFO[latest.status].sentence(firstName)}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700">
                Last 5 school days: {total("present")} present ·{" "}
                {total("absent")} absent · {total("late")} late ·{" "}
                {total("excused")} excused
              </p>

              <ul className="mt-2 divide-y divide-slate-200">
                {child.days.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span className="text-slate-900">{d.label}</span>
                    <Badge status={d.status} />
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
