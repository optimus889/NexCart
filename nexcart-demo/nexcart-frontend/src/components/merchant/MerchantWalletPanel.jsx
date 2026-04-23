import { BarChart3, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SectionHeader from "@/components/common/SectionHeader";
import MetricCard from "@/components/common/MetricCard";

export default function MerchantWalletPanel({
  products,
  balance,
  onWithdraw,
  onPayment,
  walletLoading,
}) {
  const safeBalance = Number.isFinite(Number(balance)) ? Number(balance) : 0;

  const activeProductCount = Array.isArray(products)
    ? products.filter((p) => p.status === "Active").length
    : 0;

  const inactiveProductCount = Array.isArray(products)
    ? products.filter((p) => p.status === "Inactive").length
    : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
        <CardHeader>
          <SectionHeader
            icon={Wallet}
            title="Merchant Funds"
            desc="Merchants can perform simple payout and settlement actions for demonstration."
          />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Available balance</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              ${safeBalance.toFixed(2)}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Button
              className="rounded-2xl bg-slate-950 text-white shadow-sm transition-all hover:bg-slate-900 hover:shadow-md"
              onClick={onWithdraw}
              disabled={walletLoading}
            >
              {walletLoading ? "Processing..." : "Withdraw $200"}
            </Button>

            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              onClick={onPayment}
              disabled={walletLoading}
            >
              Receive Payment $500
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Demo note: these controls simulate merchant fund actions and do not connect to real payment services.
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
        <CardHeader>
          <SectionHeader
            icon={BarChart3}
            title="Store Performance"
            desc="Basic merchant-side performance indicators for the presentation demo."
          />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Active Products"
              value={String(activeProductCount)}
            />
            <MetricCard
              title="Inactive Products"
              value={String(inactiveProductCount)}
            />
            <MetricCard title="Pending Orders" value="12" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Order completion</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Refund rate</span>
                <span>8%</span>
              </div>
              <Progress value={8} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Product exposure</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}