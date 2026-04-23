import { Card, CardContent } from "@/components/ui/card";

export default function MetricCard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div className="rounded-2xl bg-slate-100 p-3 shadow-sm">
            <Icon className="h-5 w-5 text-slate-800" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}