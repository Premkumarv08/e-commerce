import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/interfaces";
import { capitalize } from "@/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate transition-all" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating?.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.ratingCount})</span>
          </div>
          {product.category && (
            <Badge variant="secondary" className="absolute left-3 top-3 shadow-sm">
              {product.category.split(" ").map(capitalize).join(" ")}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-5">
        <div className="flex justify-between items-start w-full">
          <h3 className="text-md font-semibold leading-tight pr-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-amber-600">${product.price.toFixed(2)}</p>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}