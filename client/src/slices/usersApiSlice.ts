import { apiSlice } from './apiSlice';

const USERS_URL = '/auth';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    checkAuth: builder.query({
      query: () => ({
        url: `${USERS_URL}/checkAuth`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckAuthQuery,
  useLogoutMutation,
} = usersApiSlice;
