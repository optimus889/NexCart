import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";

export default function AdminAlertsPanel({
  alerts = [],
  resolveAlert,
  isLoadingAlerts,
  isResolvingAlert,
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={AlertTriangle}
          title="Abnormal State Management"
          desc="Administrators can review and manage simplified platform alert records."
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoadingAlerts ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading alerts...
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="grid gap-4 rounded-3xl border bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant={alert.level === "High" ? "destructive" : "outline"}
                  >
                    {alert.level}
                  </Badge>
                  <Badge variant="secondary">{alert.status}</Badge>
                </div>

                <h4 className="font-semibold text-slate-900">{alert.title}</h4>

                {alert.message ? (
                  <p className="mt-1 text-sm text-slate-500">{alert.message}</p>
                ) : null}
              </div>

              <Button
                className="rounded-2xl"
                variant={alert.status === "Resolved" ? "outline" : "default"}
                onClick={() => resolveAlert(alert.id)}
                disabled={
                  alert.status === "Resolved" || isResolvingAlert === alert.id
                }
              >
                {isResolvingAlert === alert.id
                  ? "Resolving..."
                  : alert.status === "Resolved"
                  ? "Resolved"
                  : "Mark Resolved"}
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}