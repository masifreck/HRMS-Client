import { api } from "../../services/api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSuperAdminDashboard: builder.query({
      query: () => ({
        url: "/dashboard/super-admin",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getCompanyDashboard: builder.query({
      query: () => ({
        url: "/dashboard/company",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetSuperAdminDashboardQuery,
  useGetCompanyDashboardQuery,
} = dashboardApi;