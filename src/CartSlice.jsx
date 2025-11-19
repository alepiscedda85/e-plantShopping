import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [], // Cart array
  },

  reducers: {
    // ➕ Aggiunge un prodotto al carrello
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1; // incrementa
      } else {
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // ❌ Rimuove un prodotto dal carrello
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.name !== action.payload
      );
    },

    // 🔄 Aggiorna quantità (incremento, decremento o manuale)
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const item = state.items.find(item => item.name === name);

      if (item) {
        item.quantity = quantity;

        // Se la quantità scende sotto 1 → rimuovere automaticamente
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            i => i.name !== name
          );
        }
      }
    },
  },
});

// 🎯 Azioni da importare nei componenti
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// 🎯 Reducer per store.js
export default CartSlice.reducer;