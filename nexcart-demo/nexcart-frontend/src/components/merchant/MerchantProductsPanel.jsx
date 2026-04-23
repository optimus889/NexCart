import { Search, Store } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/common/SectionHeader";

export default function MerchantProductsPanel({
  products,
  searchTerm,
  setSearchTerm,
  toggleProductStatus,
  isUpdatingProduct,
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={Store}
          title="Merchant Product Management"
          desc="Merchants can manage listings and perform simple product activation or deactivation."
        />
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product"
            className="pl-9"
          />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid gap-4 rounded-3xl border bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center"
          >
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-semibold text-slate-900">{product.name}</h4>
                <Badge variant="outline">{product.status}</Badge>
              </div>
              <p className="text-sm text-slate-500">Category: {product.category}</p>
              <p className="mt-2 text-sm text-slate-500">
                Stock: {product.stock} • Price: ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <Button
              className="rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              variant={product.status === "Active" ? "outline" : "default"}
              onClick={() => toggleProductStatus(product.id)}
              disabled={isUpdatingProduct === product.id}
            >
              {isUpdatingProduct === product.id
                ? "Updating..."
                : product.status === "Active"
                ? "Take Down Product"
                : "List Product"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}