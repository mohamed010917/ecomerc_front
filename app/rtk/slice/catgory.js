import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catgoryApi = createApi({
  reducerPath: "catgoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }), // ضع رابط API الصحيح
  endpoints: (builder) => ({
    getTopcatgory: builder.query({
      query: () => "/top-catgory",
    }),
  }),
});

export const { useGetTopcatgoryQuery } = catgoryApi;