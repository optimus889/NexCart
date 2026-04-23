import { Package, Search, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/common/SectionHeader";

export default function ProductGrid({
  products,
  addToCart,
  searchTerm,
  setSearchTerm,
  isLoadingProducts,
}) {
  return (
    <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all hover:shadow-lg">
      <CardHeader>
        <SectionHeader
          icon={Package}
          title="Product Interface"
          desc="Consumers can only browse active products available on the NexCart platform."
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

      <CardContent className="grid gap-4 md:grid-cols-2">
        {isLoadingProducts ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Loading products...
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge>{product.status}</Badge>
                <span className="text-sm text-slate-500">Stock: {product.stock}</span>
              </div>

              <h4 className="text-lg font-semibold text-slate-900">{product.name}</h4>
              <p className="mt-1 text-sm text-slate-500">Category: {product.category}</p>

              <p className="mt-4 text-xl font-bold text-slate-900">
                ${Number(product.price).toFixed(2)}
              </p>

              <Button
                className="mt-4 w-full rounded-2xl bg-slate-950 text-white shadow-sm transition-all hover:bg-slate-900 hover:shadow-md"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}