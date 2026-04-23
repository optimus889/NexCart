import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/common/SectionHeader";

export default function OrdersPanel({ orders, isLoadingOrders }) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={CheckCircle2}
          title="Order History"
          desc="Consumers can view their previous confirmed orders."
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoadingOrders ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-900">{order.id}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{order.status}</Badge>
                  <span className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                    </div>

                    <span className="font-semibold text-slate-900">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Subtotal</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    ${Number(order.subtotal).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Platform Fee</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    ${Number(order.platformFee).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ${Number(order.total).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}