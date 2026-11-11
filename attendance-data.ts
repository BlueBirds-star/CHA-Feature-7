export type Status = "present" | "absent" | "late" | "excused";

export type DayRecord = { label: string; status: Status };

export type ChildAttendance = {
  id: string;
  name: string;
  className: string;
  days: DayRecord[]; // newest first
};

// Sample data only. No real student data.
// Later this will come from the database, filtered to the parent's own children.
export const CHILDREN_ATTENDANCE: ChildAttendance[] = [
  {
    id: "c1",
    name: "Adaeze Okafor",
    className: "JSS 1A",
    days: [
      { label: "Friday 30 October", status: "present" },
      { label: "Thursday 29 October", status: "present" },
      { label: "Wednesday 28 October", status: "absent" },
      { label: "Tuesday 27 October", status: "present" },
      { label: "Monday 26 October", status: "late" },
    ],
  },
  {
    id: "c2",
    name: "Chinedu Okafor",
    className: "SS 2B",
    days: [
      { label: "Friday 30 October", status: "absent" },
      { label: "Thursday 29 October", status: "present" },
      { label: "Wednesday 28 October", status: "present" },
      { label: "Tuesday 27 October", status: "excused" },
      { label: "Monday 26 October", status: "present" },
    ],
  },
];
