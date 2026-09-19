import { api } from '../../services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: '/profile/me',
        method: 'GET',
      }),

      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMyProfileQuery,
} = authApi;