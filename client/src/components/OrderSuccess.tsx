import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSuccessProps {
  orderNumber?: string;
  email?: string;
  onContinueShopping?: () => void;
}

export function OrderSuccess({
  orderNumber = "ORD-2024-001",
  email = "customer@example.com",
  onContinueShopping,
}: OrderSuccessProps) {
  return (
    <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-2">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/10">
            <CheckCircle className="h-12 w-12 text-chart-2" />
          </div>
          <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been successfully placed and will be shipped soon.
          </p>
          <div className="space-y-4 bg-muted/30 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Package className="h-5 w-5" />
              <span className="text-sm font-medium">Order Number</span>
            </div>
            <p className="text-2xl font-bold tracking-wide" data-testid="text-order-number">
              {orderNumber}
            </p>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to
            </p>
            <p className="font-semibold text-base" data-testid="text-order-email">
              {email}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            className="w-full"
            size="lg"
            onClick={onContinueShopping}
            data-testid="button-continue-shopping"
          >
            Continue Shopping
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            You can track your order status from your account dashboard
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
