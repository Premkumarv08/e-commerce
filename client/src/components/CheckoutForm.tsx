import { useState } from "react";
import { toast } from "sonner";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Lock, CreditCard } from "lucide-react";
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { paymentAPI } from "@/services/api";
import { CartItem } from "@/interfaces";

interface OrderDetails {
  email: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
}

interface CheckoutFormProps {
  subtotal: number;
  items: CartItem[];
  onComplete: (orderDetails: OrderDetails) => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export function CheckoutForm({ subtotal, items = [], onComplete }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please wait a moment.");
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card details are missing. Please enter your card information.");
      setIsProcessing(false);
      return;
    }

    try {
      const { clientSecret } = await paymentAPI.createPaymentIntent(items);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.zipCode,
            },
          },
        },
      });

      if (error) {
        toast.error(error.message || "An unknown payment error occurred.");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        toast.success("Payment successful! Your order is confirmed.");
        onComplete(shippingInfo);
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during payment.");
    }

    setIsProcessing(false);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Secure Checkout</h1>
            <p className="text-muted-foreground mt-1">Complete your purchase in a few simple steps</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street, Apt 4B"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      data-testid="input-address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                      data-testid="input-city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      data-testid="input-zipcode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 flex-wrap">
                      <div className="h-8 w-12 rounded border bg-background flex items-center justify-center">
                        <SiVisa className="h-5 w-8 text-[#1A1F71]" />
                      </div>
                      <div className="h-8 w-12 rounded border bg-background flex items-center justify-center">
                        <SiMastercard className="h-5 w-8 text-[#EB001B]" />
                      </div>
                      <div className="h-8 w-12 rounded border bg-background flex items-center justify-center">
                        <SiAmericanexpress className="h-5 w-8 text-[#006FCF]" />
                      </div>
                      <div className="h-8 w-12 rounded border bg-background flex items-center justify-center">
                        <SiDiscover className="h-5 w-8 text-[#FF6000]" />
                      </div>
                    </div>
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="p-3 border rounded-md bg-background">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <p>Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full text-base" disabled={isProcessing || !stripe}>
              {isProcessing ? "Processing..." : `Pay $${subtotal.toFixed(2)}`}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length > 0 && (
                  <>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-start justify-between gap-3 text-sm">
                          <div className="flex-1">
                            <p className="font-medium leading-tight">{item.name}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <Separator />
                  </>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium" data-testid="text-order-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-chart-2 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary" data-testid="text-order-total">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
