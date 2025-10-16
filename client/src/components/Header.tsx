import { ShoppingCart, Search, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setSearchTerm } from "@/features/products/productsSlice";
import { logout } from "@/features/auth/authSlice";

interface HeaderProps {
  onCartClick?: () => void;
  onLoginClick?: () => void;
  onAuthClick?: () => void;
  onBackClick?: () => void;
  showSearch?: boolean;
  showBackButton?: boolean;
}

export function Header({ onCartClick, onLoginClick, onAuthClick, onBackClick, showSearch, showBackButton }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth, shallowEqual);
  const searchTerm = useSelector((state: RootState) => state.products.searchTerm);
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackClick}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : null}
          <h1 className="text-xl font-bold text-primary">ShopStack</h1>
        </div>

        {showSearch && (
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                data-testid="input-search"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  data-testid="button-account"
                >
                  <User className="h-5 w-5 mr-2" />
                  {user?.name || user?.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => dispatch(logout())} data-testid="button-sign-out">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              onClick={onAuthClick}
              data-testid="button-login"
            >
              <User className="h-5 w-5 mr-2" />
              Login
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                data-testid="badge-cart-count"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
