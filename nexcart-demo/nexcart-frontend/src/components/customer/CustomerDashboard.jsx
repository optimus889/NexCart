import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "./ProductGrid";
import CartPanel from "./CartPanel";
import PaymentPanel from "./PaymentPanel";
import OrdersPanel from "./OrdersPanel";
import CustomerProfile from "./CustomerProfile";

export default function CustomerDashboard(props) {
  return (
    <Tabs defaultValue="products" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-slate-100/80 p-1 shadow-sm">
        <TabsTrigger value="products" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Products
        </TabsTrigger>
        <TabsTrigger value="payment" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Payment
        </TabsTrigger>
        <TabsTrigger value="orders" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Orders
        </TabsTrigger>
        <TabsTrigger value="profile" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Personal Info
        </TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <ProductGrid {...props} />
          <CartPanel {...props} />
        </div>
      </TabsContent>

      <TabsContent value="payment">
        <PaymentPanel {...props} />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersPanel {...props} />
      </TabsContent>

      <TabsContent value="profile">
        <CustomerProfile profile={props.profile} />
      </TabsContent>
    </Tabs>
  );
}