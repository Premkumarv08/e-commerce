// @ts-ignore: allow importing image without type declarations (add proper typings or fix the path if needed)
import heroImage from "@assets/stock_images/modern_minimalist_e-_5f867a94.jpg";

export function Hero() {
  return (
    <div className="relative h-56 md:h-[220px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="mb-4 text-4xl font-bold md:text-6xl max-w-4xl">
          Discover Premium Products
        </h2>
        <p className="mb-8 max-w-2xl text-lg md:text-xl text-white/90">
          Shop the latest collection with free shipping and secure checkout
        </p>
      </div>
    </div>
  );
}
