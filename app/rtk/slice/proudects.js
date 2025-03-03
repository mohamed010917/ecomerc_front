import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proudectsApi = createApi({
  reducerPath: "proudectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }), // ضع رابط API الصحيح
  endpoints: (builder) => ({
    getTopProudects: builder.query({
      query: () => "/top-proudect",
    }),
  }),
});

export const { useGetTopProudectsQuery } = proudectsApi;