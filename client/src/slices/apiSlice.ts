import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
});

const apiSlice = createApi({
  baseQuery: baseQuery,

  endpoints: (builder) => ({}),
});

export default apiSlice;
