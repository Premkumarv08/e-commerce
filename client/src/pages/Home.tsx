import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Header } from "@/components/Header"; 
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSheet } from "@/components/CartSheet";
import { AuthDialog } from "@/components/AuthDialog";
import { CheckoutForm } from "@/components/CheckoutForm";
import { OrderSuccess } from "@/components/OrderSuccess";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Product } from '@/interfaces';
import { AppDispatch, RootState } from '@/store/store';
import { fetchProducts, selectFilteredProducts } from '@/features/products/productsSlice';
import { addToCart, clearCart } from '@/features/cart/cartSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type ViewState = "shopping" | "checkout" | "success";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { status: productStatus } = useSelector((state: RootState) => state.products);
  const filteredProducts = useSelector(selectFilteredProducts);
  const { items: cartItems } = useSelector((state: RootState) => state.cart, shallowEqual);
  const { isAuthenticated, user, status: authStatus } = useSelector((state: RootState) => state.auth, shallowEqual);

  const prevAuthStatus = useRef(authStatus);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("shopping");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthOpen(false);
      if (prevAuthStatus.current === 'loading') {
        toast.success(user?.name ? `Welcome, ${user.name}!` : "Welcome!", {
          description: "You have successfully signed in.",
        })
      }
    } else {
      if (prevAuthStatus.current === 'succeeded' && authStatus === 'idle') {
        toast.info("Signed Out", {
          description: "You have been successfully signed out.",
        })
      }
    }

    prevAuthStatus.current = authStatus;
  }, [isAuthenticated, authStatus, user]);

  const onAddToCart = useCallback((product: Product) => {
    dispatch(addToCart(product));
    setCartOpen(true);
  }, [dispatch]);

  const handleCheckout = () => {
    setCartOpen(false);
    setViewState("checkout");
  };

  const handleCompleteOrder = (details: any) => {
    setOrderDetails(details);
    setViewState("success");
    dispatch(clearCart());
  };

  const handleContinueShopping = () => {
    setViewState("shopping");
  };

  const handleBackToShopping = () => {
    setViewState("shopping");
  };

  const handleLoginClick = () => {
    setAuthOpen(true);
  };

  const subtotal = useMemo(() => cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ), [cartItems]);

  const categories = useMemo(() => {
    const allCategories = filteredProducts.map(p => p.category).filter(Boolean) as string[];
    return [...new Set(allCategories)];
  }, [filteredProducts]);

  const productsToDisplay = useMemo(() => {
    if (selectedCategory === "all") {
      return filteredProducts;
    }
    return filteredProducts.filter(p => p.category === selectedCategory);
  }, [filteredProducts, selectedCategory]);

  return (
    <Elements stripe={stripePromise}>
      <Header
        onCartClick={() => setCartOpen(true)}
        onAuthClick={handleLoginClick}
        onBackClick={handleBackToShopping}
        showSearch={viewState === "shopping"}
        showBackButton={viewState === "checkout"}
      />

      {viewState === "shopping" && (
        <>
          <Hero />
          <ProductGrid
            products={productsToDisplay}
            onAddToCart={onAddToCart}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </>
      )}

      {viewState === "checkout" && (
        <CheckoutForm 
          subtotal={subtotal} 
          items={cartItems}
          onComplete={handleCompleteOrder} 
        />
      )}

      {viewState === "success" && (
        <OrderSuccess
          orderNumber={`ORD-2024-${Math.floor(Math.random() * 10000)}`}
          email={orderDetails?.email}
          onContinueShopping={handleContinueShopping}
        />
      )}

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={handleCheckout}
        onLoginClick={handleLoginClick}
      />

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
      />

      <Toaster />
    </Elements>
  );
}
