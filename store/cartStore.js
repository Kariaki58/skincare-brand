import { create } from "zustand";

const useCartStore = create((set, get) => {
    // Load cart from localStorage when the store is initialized
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    return {
        cart: storedCart,

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

                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            });
        },

        removeFromCart: (productId) => {
            set((state) => {
                const updatedCart = state.cart.filter((item) => item._id !== productId);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            });
        },

        increaseQuantity: (productId) => {
            set((state) => {
                const updatedCart = state.cart.map((item) =>
                    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                    
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            });
        },

        clearCart: () => {
            localStorage.removeItem("cart");
            set({ cart: [] });
        },
    };
});

export default useCartStore;
