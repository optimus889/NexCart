import { roleConfig } from "@/constants/roleConfig";

export default function RoleSelector({ value, onChange }) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-slate-700 text-left">
        Select Role
      </label>

      <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {Object.entries(roleConfig).map(([key, role]) => {
          const Icon = role.icon;
          const active = value === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex flex-col items-center justify-center gap-2 border-r px-4 py-5 text-sm transition-all last:border-r-0 ${
                active
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="font-medium">{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}