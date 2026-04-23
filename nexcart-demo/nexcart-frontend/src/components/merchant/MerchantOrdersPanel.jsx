import { Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";

const nextStatusMap = {
  Confirmed: "Paid",
  Paid: "Shipped",
  Shipped: "Delivered",
};

export default function MerchantOrdersPanel({
  orders = [],
  isLoadingOrders = false,
  updateOrderStatus,
  isUpdatingOrderStatus,
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={Package}
          title="Merchant Orders"
          desc="Merchants can view and update the orders associated with their products."
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoadingOrders ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading merchant orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            No merchant orders found.
          </div>
        ) : (
          orders.map((order) => {
            const nextStatus = nextStatusMap[order.status];

            return (
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
                  {order.items?.map((item) => (
                    <div
                      key={`${order.id}-${item.productId || item.id}`}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.productName || item.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <span className="font-semibold text-slate-900">
                        ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Merchant Subtotal</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ${Number(order.merchantSubtotal || 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {nextStatus ? (
                      <Button
                        className="rounded-2xl"
                        onClick={() => updateOrderStatus(order.id, nextStatus)}
                        disabled={isUpdatingOrderStatus === order.id}
                      >
                        {isUpdatingOrderStatus === order.id
                          ? "Updating..."
                          : `Mark as ${nextStatus}`}
                      </Button>
                    ) : null}

                    {order.status !== "Cancelled" && order.status !== "Delivered" ? (
                      <Button
                        variant="outline"
                        className="rounded-2xl"
                        onClick={() => updateOrderStatus(order.id, "Cancelled")}
                        disabled={isUpdatingOrderStatus === order.id}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}