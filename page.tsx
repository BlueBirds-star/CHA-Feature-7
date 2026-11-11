import Attendance from "./attendance";
import ExcuseNote from "./excuse-note";

export const metadata = {
  title: "Parent | SchoolDesk",
};

export default function ParentPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-5">
          <p className="text-sm text-gold font-semibold">Crown Heights Academy</p>
          <h1 className="text-2xl font-semibold">Parent</h1>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Attendance />
        <hr className="my-8 border-slate-200" />
        <ExcuseNote />
      </main>
    </div>
  );
}
