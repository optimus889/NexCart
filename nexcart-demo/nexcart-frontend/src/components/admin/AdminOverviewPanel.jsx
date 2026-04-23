import {
  Activity,
  Bell,
  Database,
  Server,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MetricCard from "@/components/common/MetricCard";
import SectionHeader from "@/components/common/SectionHeader";

export default function AdminOverviewPanel({ alerts = [], dashboard, isLoadingDashboard }) {
  const uptimeValue = "99.96%";
  const servicesValue = "24";
  const openAlerts =
    dashboard?.openAlerts ??
    alerts.filter((a) => a.status !== "Resolved").length;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricCard
          title="Platform Uptime"
          value={uptimeValue}
          subtitle="Current service availability"
          icon={Activity}
        />
        <MetricCard
          title="Running Services"
          value={servicesValue}
          subtitle="Core services monitored"
          icon={Server}
        />
        <MetricCard
          title="Open Alerts"
          value={String(openAlerts)}
          subtitle="Requires administrator attention"
          icon={Bell}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
          <CardHeader>
            <SectionHeader
              icon={Settings}
              title="Platform Runtime Overview"
              desc="Administrators can access backend status and high-level operation metrics only."
            />
          </CardHeader>

          <CardContent className="space-y-4">
            {isLoadingDashboard ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                Loading dashboard...
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Users</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {dashboard?.totalUsers ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Products</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {dashboard?.totalProducts ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Orders</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {dashboard?.totalOrders ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ${Number(dashboard?.totalRevenue ?? 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>API Gateway health</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Database capacity</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Security rule coverage</span>
                    <span>84%</span>
                  </div>
                  <Progress value={84} />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
          <CardHeader>
            <SectionHeader
              icon={Database}
              title="Control Scope Summary"
              desc="The administrator workspace is intentionally separated from user-facing transaction pages."
            />
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Consumers cannot access platform-wide runtime metrics.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Merchants cannot manage global abnormal event states.
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Administrators do not enter consumer shopping or merchant settlement pages in this prototype.
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}