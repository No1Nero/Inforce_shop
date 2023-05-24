import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productsApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(productApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;