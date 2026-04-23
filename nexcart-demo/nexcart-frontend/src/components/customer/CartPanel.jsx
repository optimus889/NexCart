import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";

export default function CartPanel({
  cart,
  totalCart,
  isLoadingCart,
  updateCartQuantity,
  removeCartItem,
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={ShoppingBag}
          title="Cart Preview"
          desc="A simplified consumer cart for presentation use."
        />
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoadingCart ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Loading cart...
          </div>
        ) : cart.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No products added yet.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    Qty: {item.quantity} · $
                    {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-8 w-8 rounded-xl p-0"
                    onClick={() =>
                      updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </Button>

                  <Button
                    variant="outline"
                    className="h-8 w-8 rounded-xl p-0"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => removeCartItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="rounded-2xl border border-dashed p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Current total</span>
            <span className="text-lg font-bold text-slate-900">${totalCart}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}