import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MerchantProductsPanel from "./MerchantProductsPanel";
import MerchantWalletPanel from "./MerchantWalletPanel";
import MerchantProfile from "./MerchantProfile";
import MerchantOrdersPanel from "./MerchantOrdersPanel";

export default function MerchantDashboard(props) {
  return (
    <Tabs defaultValue="products" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-slate-100/80 p-1 shadow-sm">
        <TabsTrigger
          value="products"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Products
        </TabsTrigger>

        <TabsTrigger
          value="wallet"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Funds
        </TabsTrigger>

        <TabsTrigger
          value="orders"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Orders
        </TabsTrigger>

        <TabsTrigger
          value="profile"
          className="rounded-2xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Merchant Info
        </TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <MerchantProductsPanel
          products={props.visibleProducts}
          searchTerm={props.searchTerm}
          setSearchTerm={props.setSearchTerm}
          toggleProductStatus={props.toggleProductStatus}
          isUpdatingProduct={props.isUpdatingProduct}
        />
      </TabsContent>

      <TabsContent value="wallet">
        <MerchantWalletPanel
          products={props.visibleProducts}
          balance={props.merchantBalance}
          onWithdraw={props.handleWithdraw}
          onPayment={props.handleMerchantPayment}
          walletLoading={props.walletLoading}
        />
      </TabsContent>

      <TabsContent value="orders">
        <MerchantOrdersPanel
          orders={props.orders}
          isLoadingOrders={props.isLoadingOrders}
          updateOrderStatus={props.updateOrderStatus}
          isUpdatingOrderStatus={props.isUpdatingOrderStatus}
        />
      </TabsContent>

      <TabsContent value="profile">
        <MerchantProfile profile={props.profile} />
      </TabsContent>
    </Tabs>
  );
}