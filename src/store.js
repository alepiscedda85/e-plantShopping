// Import Redux Toolkit's configureStore
import { configureStore } from "@reduxjs/toolkit";

// Import reducer from your slice
import cartReducer from "./CartSlice";

// Create the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;