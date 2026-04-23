export default function SectionHeader({ icon: Icon, title, desc }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="rounded-2xl bg-slate-100 p-3 shadow-sm">
        <Icon className="h-5 w-5 text-slate-800" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}