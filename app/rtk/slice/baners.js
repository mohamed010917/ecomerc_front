import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const banersApi = createApi({
  reducerPath: "banersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }), // ضع رابط API الصحيح
  endpoints: (builder) => ({
    getTopBaners: builder.query({
      query: () => "/top-baners",
    }),
  }),
});

export const { useGetTopBanersQuery } = banersApi;
