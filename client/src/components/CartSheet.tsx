import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { updateQuantity, removeItem } from "@/features/cart/cartSlice";
interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout?: () => void;
  onLoginClick?: () => void;
}

export function CartSheet({
  open,
  onOpenChange,
  onCheckout,
  onLoginClick,
}: CartSheetProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart, shallowEqual);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth, shallowEqual);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onOpenChange(false);
      onLoginClick?.();
    } else {
      onCheckout?.();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
            <div className="rounded-full bg-muted p-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add items to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={item.id} data-testid={`cart-item-${item.id}`}>
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium leading-tight" data-testid={`text-cart-item-name-${item.id}`}>
                              {item.name}
                            </h4>
                            <p className="mt-1 text-lg font-bold text-primary" data-testid={`text-cart-item-price-${item.id}`}>
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 -mt-1"
                            onClick={() => dispatch(removeItem(item.id))}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center rounded-lg border w-fit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-r-none"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                            }
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium border-x px-3" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-l-none"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                            }
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t px-6 py-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-semibold" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-chart-2 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                data-testid="button-checkout"
              >
                {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
              </Button>
              {!isAuthenticated && (
                <p className="text-center text-xs text-muted-foreground">
                  You need to be logged in to complete your purchase
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
