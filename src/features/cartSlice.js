import { createSlice } from '@reduxjs/toolkit';

const getCartFromLocalStorage = (uid) => {
  const cartData = localStorage.getItem(`cart-${uid}`);
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (uid, items) => {
  localStorage.setItem(`cart-${uid}`, JSON.stringify(items));
};

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartForUser: (state, action) => {
      const uid = action.payload;
      state.items = getCartFromLocalStorage(uid);
    },
    addToCart: (state, action) => {
      const uid = localStorage.getItem('uid'); 
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.items.push(tempProduct);
      }
      saveCartToLocalStorage(uid, state.items); 
    },
    
  
    removeFromCart: (state, action) => {
      const uid = localStorage.getItem('uid');
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(uid, state.items); 
    },

    incrementQuantity: (state, action) => {
      const uid = localStorage.getItem('uid');
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(uid, state.items); 
    },


    decrementQuantity: (state, action) => {
      const uid = localStorage.getItem('uid');
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToLocalStorage(uid, state.items); 
    },

    clearCart: (state) => {
      const uid = localStorage.getItem('uid');
      state.items = [];
      saveCartToLocalStorage(uid, state.items); 
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  loadCartForUser,  
} = cartSlice.actions;

export default cartSlice.reducer;
