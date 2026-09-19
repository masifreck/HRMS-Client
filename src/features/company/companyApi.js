import { api } from "../../services/api";

export const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: (params = {}) => ({
        url: "/super-admin/companies",
        method: "GET",
        params,
      }),

      providesTags: ["Company"],
    }),

    getCompanyById: builder.query({
      query: (id) => ({
        url: `/super-admin/companies/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, id) => [
        {
          type: "Company",
          id,
        },
      ],
    }),

    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "/super-admin/companies",
        method: "POST",
        body: companyData,
      }),

      invalidatesTags: ["Company", "Dashboard"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, ...companyData }) => ({
        url: `/super-admin/companies/${id}`,
        method: "PUT",
        body: companyData,
      }),

      invalidatesTags: ["Company", "Dashboard"],
    }),

    activateCompany: builder.mutation({
      query: (id) => ({
        url: `/super-admin/companies/${id}/activate`,
        method: "PATCH",
      }),

      invalidatesTags: ["Company", "Dashboard"],
    }),

    suspendCompany: builder.mutation({
      query: (id) => ({
        url: `/super-admin/companies/${id}/suspend`,
        method: "PATCH",
      }),

      invalidatesTags: ["Company", "Dashboard"],
    }),

    createCompanyAdmin: builder.mutation({
      query: ({ companyId, ...adminData }) => ({
        url: `/super-admin/companies/${companyId}/admin`,
        method: "POST",
        body: adminData,
      }),

      invalidatesTags: ["Company", "Dashboard"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useActivateCompanyMutation,
  useSuspendCompanyMutation,
  useCreateCompanyAdminMutation,
} = companyApi;