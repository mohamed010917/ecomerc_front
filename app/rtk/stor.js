"use client";

import { configureStore } from "@reduxjs/toolkit";
import banersReducer, { banersApi } from "./slice/baners"
import { proudectsApi } from "./slice/proudects";
import { catgoryApi } from "./slice/catgory";
export const store = configureStore({
    reducer: {
        [banersApi.reducerPath]: banersApi.reducer,
        [proudectsApi.reducerPath]: proudectsApi.reducer,
        [catgoryApi.reducerPath]: catgoryApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
      .concat(banersApi.middleware)
      .concat(proudectsApi.middleware)
      .concat(catgoryApi.middleware),
});