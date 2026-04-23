import { CheckCircle2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";

export default function PaymentPanel({
  cart,
  totalCart,
  checkoutLoading,
  checkoutMessage,
  onConfirmPayment,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
        <CardHeader>
          <SectionHeader
            icon={CreditCard}
            title="Payment Interface"
            desc="Consumers can proceed through a simple checkout view for the project demo."
          />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Cardholder name" />
            <Input placeholder="Card number" />
            <Input placeholder="MM/YY" />
            <Input placeholder="CVV" />
          </div>

          <Input placeholder="Billing address" />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Demo note: this checkout module is display-only and does not process real payments.
          </div>

          {checkoutMessage ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {checkoutMessage}
            </div>
          ) : null}

          <Button
            className="w-full rounded-2xl bg-slate-950 text-white shadow-sm transition-all hover:bg-slate-900 hover:shadow-md"
            onClick={onConfirmPayment}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Confirm Payment"}
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
        <CardHeader>
          <SectionHeader
            icon={CheckCircle2}
            title="Order Summary"
            desc="Simple consumer-side summary aligned with the purchase flow."
          />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Items in cart</span>
              <span className="font-semibold">{cart.length}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold">${totalCart}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Platform fee</span>
              <span className="font-semibold">$2.99</span>
            </div>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">Total</span>
              <span className="text-xl font-bold text-slate-900">
                ${(Number(totalCart) + 2.99).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}