import React, { useMemo, useState } from "react";
import {
  FiBriefcase,
  FiPlus,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  useGetCompaniesQuery,
} from "../../../features/company/companyApi";

import "./Companies.css";

const getStatusClass = (status) => {
  switch (status) {
    case "ACTIVE":
      return "company-status-active";

    case "SUSPENDED":
      return "company-status-suspended";

    case "INACTIVE":
      return "company-status-inactive";

    default:
      return "company-status-default";
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const Companies = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCompaniesQuery();

  const companies = data?.data || [];

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        company.companyName
          ?.toLowerCase()
          .includes(searchValue) ||
        company.companyCode
          ?.toLowerCase()
          .includes(searchValue) ||
        company.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        !status ||
        company.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    companies,
    search,
    status,
  ]);

  return (
    <div className="companies-page">

      {/* HEADER */}

      <div className="companies-header">

        <div>
          <span className="companies-eyebrow">
            PLATFORM
          </span>

          <h1>
            Companies
          </h1>

          <p>
            Manage companies registered
            on your HRMS platform.
          </p>
        </div>

        <button
          type="button"
          className="company-primary-button"
          onClick={() =>
            navigate(
              "/super-admin/companies/register"
            )
          }
        >
          <FiPlus />

          <span>
            Register company
          </span>
        </button>

      </div>


      {/* TOOLBAR */}

      <div className="companies-toolbar">

        <div className="company-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search company, code or email..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <select
          className="company-status-filter"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
        >
          <option value="">
            All status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>


        <button
          type="button"
          className="company-refresh-button"
          onClick={refetch}
          disabled={isFetching}
          title="Refresh"
        >
          <FiRefreshCw
            className={
              isFetching
                ? "company-refresh-spin"
                : ""
            }
          />
        </button>

      </div>


      {/* ERROR */}

      {isError && (
        <div className="companies-error">

          <div>
            {error?.data?.message ||
              "Unable to load companies."}
          </div>

          <button
            type="button"
            onClick={refetch}
          >
            Try again
          </button>

        </div>
      )}


      {/* TABLE */}

      <div className="companies-table-card">

        {isLoading ? (
          <div className="companies-loading">

            <div className="company-loading-spinner" />

            <span>
              Loading companies...
            </span>

          </div>
        ) : filteredCompanies.length === 0 ? (

          <div className="companies-empty">

            <div className="companies-empty-icon">
              <FiBriefcase />
            </div>

            <h3>
              No companies found
            </h3>

            <p>
              {search || status
                ? "Try changing your search or filter."
                : "Register your first company to get started."}
            </p>

            {!search && !status && (
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/super-admin/companies/register"
                  )
                }
              >
                <FiPlus />
                Register company
              </button>
            )}

          </div>

        ) : (

          <div className="companies-table-wrapper">

            <table className="companies-table">

              <thead>
                <tr>
                  <th>
                    Company
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Employees
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Created
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredCompanies.map(
                  (company) => (
                    <tr
                      key={company.id}
                    >

                      <td>

                        <div className="company-cell">

                          <div className="company-avatar">
                            {company.companyName
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <div>

                            <strong>
                              {company.companyName}
                            </strong>

                            <span>
                              {company.companyCode}
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="company-contact">

                          <span>
                            {company.email ||
                              "No email"}
                          </span>

                          <span>
                            {company.phone ||
                              "No phone"}
                          </span>

                        </div>

                      </td>

                      <td>
                        <span className="company-limit">
                          {company.employeeLimit ??
                            0}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`company-status ${getStatusClass(
                            company.status
                          )}`}
                        >
                          {company.status}
                        </span>

                      </td>

                      <td>
                        <span className="company-date">
                          {formatDate(
                            company.createdAt
                          )}
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="company-view-button"
                          onClick={() =>
                            navigate(
                              `/super-admin/companies/${company.id}`
                            )
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Companies;