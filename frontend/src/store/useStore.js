import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item._id === product._id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item._id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: get().cart.map(item =>
              item._id === productId ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => set({ cart: [] }),
      
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'bazaar-cart',
    }
  )
);

export default useStore;
