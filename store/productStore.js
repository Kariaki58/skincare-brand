import { create } from "zustand";

const useProductStore = create((set) => ({
    products: [],
    fetchProducts: async (id) => {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        set({ products: data });
    },
}));

export default useProductStore;
