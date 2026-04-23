import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import NexCartLogo from "./NexCartLogo";

export default function ProtectedShell({ onLogout, children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        background: "linear-gradient(135deg,#f1f5f9 0%,#fff 50%,#f1f5f9 100%)",
      }}
    >
      <div style={{ width: "100%", boxSizing: "border-box", padding: "1.5rem 2rem" }} className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-md md:flex-row md:items-center md:justify-between">
          <div>
            <NexCartLogo />
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">Authorized Role Workspace</p>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}