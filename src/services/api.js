import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'hrmsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('hrms_token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),

  tagTypes: [
    'Profile',
    'Dashboard',
    'Company',
    'Subscription',
    'Employee',
  ],

  endpoints: () => ({}),
});