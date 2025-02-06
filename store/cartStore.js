import { create } from "zustand";

const useCartStore = create((set, get) => {
    return {
        cart: [], // Default empty cart; will be populated on the client

        initializeCart: () => {
            if (typeof window !== "undefined") {
                const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                set({ cart: storedCart });
            }
        },
        
        addToCart: (product, quantity = 1) => {
            set((state) => {
                const existingProduct = state.cart.find((item) => item._id === product._id);
                let updatedCart;

                if (existingProduct) {
                    updatedCart = state.cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    updatedCart = [...state.cart, { ...product, quantity }];
                }

                if (typeof window !== "undefined") {
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                return { cart: updatedCart };
            });
        },

        removeFromCart: (productId) => {
            set((state) => {
                const updatedCart = state.cart.filter((item) => item._id !== productId);
                
                if (typeof window !== "undefined") {
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                return { cart: updatedCart };
            });
        },

        increaseQuantity: (productId) => {
            set((state) => {
                const updatedCart = state.cart.map((item) =>
                    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );

                if (typeof window !== "undefined") {
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                return { cart: updatedCart };
            });
        },

        decreaseQuantity: (productId) => {
            set((state) => {
                const updatedCart = state.cart
                    .map((item) =>
                        item._id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                    )
                    .filter((item) => item.quantity > 0);
                    
                if (typeof window !== "undefined") {
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                return { cart: updatedCart };
            });
        },

        clearCart: () => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
            set({ cart: [] });
        },
    };
});

export default useCartStore;
