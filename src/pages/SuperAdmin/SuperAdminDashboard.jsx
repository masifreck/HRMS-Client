import React from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiUsers,
} from "react-icons/fi";

import {
  useGetSuperAdminDashboardQuery,
} from "../../features/dashboard/dashboardApi";

import "./SuperAdminDashboard.css";

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case "ACTIVE":
      return "status-active";

    case "TRIAL":
      return "status-trial";

    case "PAUSED":
      return "status-paused";

    case "SUSPENDED":
      return "status-suspended";

    case "EXPIRED":
      return "status-expired";

    case "CANCELLED":
      return "status-cancelled";

    default:
      return "status-default";
  }
};

const StatCard = ({
  label,
  value,
  icon,
  description,
}) => {
  return (
    <div className="sa-stat-card">

      <div className="sa-stat-top">
        <div className="sa-stat-icon">
          {icon}
        </div>
      </div>

      <div className="sa-stat-value">
        {value ?? 0}
      </div>

      <div className="sa-stat-label">
        {label}
      </div>

      {description && (
        <div className="sa-stat-description">
          {description}
        </div>
      )}

    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="sa-dashboard">

      <div className="sa-page-header">
        <div>
          <div className="sa-skeleton sa-skeleton-title" />
          <div className="sa-skeleton sa-skeleton-subtitle" />
        </div>
      </div>

      <div className="sa-stat-grid">

        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              className="sa-stat-card sa-loading-card"
              key={index}
            >
              <div className="sa-skeleton sa-skeleton-icon" />
              <div className="sa-skeleton sa-skeleton-number" />
              <div className="sa-skeleton sa-skeleton-text" />
            </div>
          )
        )}

      </div>

      <div className="sa-content-grid">

        <div className="sa-panel">
          <div className="sa-skeleton sa-skeleton-panel-title" />

          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                className="sa-skeleton-row"
                key={index}
              >
                <div className="sa-skeleton sa-skeleton-avatar" />

                <div className="sa-skeleton-content">
                  <div className="sa-skeleton sa-skeleton-line" />
                  <div className="sa-skeleton sa-skeleton-line-small" />
                </div>
              </div>
            )
          )}
        </div>

        <div className="sa-panel">
          <div className="sa-skeleton sa-skeleton-panel-title" />

          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                className="sa-skeleton-row"
                key={index}
              >
                <div className="sa-skeleton sa-skeleton-avatar" />

                <div className="sa-skeleton-content">
                  <div className="sa-skeleton sa-skeleton-line" />
                  <div className="sa-skeleton sa-skeleton-line-small" />
                </div>
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
};

const SuperAdminDashboard = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetSuperAdminDashboardQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="sa-dashboard">

        <div className="sa-error-state">

          <div className="sa-error-icon">
            <FiAlertCircle />
          </div>

          <h3>
            Unable to load dashboard
          </h3>

          <p>
            {error?.data?.message ||
              "Something went wrong while loading dashboard data."}
          </p>

          <button
            type="button"
            onClick={refetch}
            className="sa-retry-button"
          >
            Try again
          </button>

        </div>

      </div>
    );
  }

  const dashboard = data?.data || {};

  const {
    totalCompanies = 0,
    activeCompanies = 0,
    suspendedCompanies = 0,
    inactiveCompanies = 0,

    totalUsers = 0,
    totalAdmins = 0,

    activeSubscriptions = 0,
    pausedSubscriptions = 0,
    expiredSubscriptions = 0,
    cancelledSubscriptions = 0,

    recentCompanies = [],
    recentSubscriptions = [],
  } = dashboard;

  return (
    <div className="sa-dashboard">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="sa-page-header">

        <div>

          <div className="sa-title-row">

            <h1>
              Platform overview
            </h1>

            {isFetching && (
              <span className="sa-refresh-indicator">
                Updating...
              </span>
            )}

          </div>

          <p>
            Monitor companies, users and
            subscriptions across your HRMS platform.
          </p>

        </div>

        <div className="sa-header-status">
          <span className="sa-live-dot" />
          Platform live
        </div>

      </div>


      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <div className="sa-stat-grid">

        <StatCard
          label="Total companies"
          value={totalCompanies}
          icon={<FiBriefcase />}
          description={`${activeCompanies} currently active`}
        />

        <StatCard
          label="Active companies"
          value={activeCompanies}
          icon={<FiCheckCircle />}
          description={`${suspendedCompanies} suspended`}
        />

        <StatCard
          label="Total users"
          value={totalUsers}
          icon={<FiUsers />}
          description={`${totalAdmins} administrators`}
        />

        <StatCard
          label="Active subscriptions"
          value={activeSubscriptions}
          icon={<FiCreditCard />}
          description="Currently running"
        />

        <StatCard
          label="Paused subscriptions"
          value={pausedSubscriptions}
          icon={<FiClock />}
          description="Temporarily paused"
        />

        <StatCard
          label="Expired subscriptions"
          value={expiredSubscriptions}
          icon={<FiActivity />}
          description="Requires attention"
        />

        <StatCard
          label="Cancelled subscriptions"
          value={cancelledSubscriptions}
          icon={<FiAlertCircle />}
          description="No longer active"
        />

        <StatCard
          label="Inactive companies"
          value={inactiveCompanies}
          icon={<FiBriefcase />}
          description="Currently inactive"
        />

      </div>


      {/* =====================================================
          RECENT DATA
      ====================================================== */}

      <div className="sa-content-grid">

        {/* RECENT COMPANIES */}

        <section className="sa-panel">

          <div className="sa-panel-header">

            <div>
              <h2>
                Recent companies
              </h2>

              <p>
                Latest companies registered
                on the platform.
              </p>
            </div>

          </div>

          {recentCompanies.length === 0 ? (
            <div className="sa-empty-state">
              No companies found.
            </div>
          ) : (
            <div className="sa-list">

              {recentCompanies.map(
                (company) => (
                  <div
                    className="sa-list-item"
                    key={company.id}
                  >

                    <div className="sa-list-avatar">
                      {company.companyName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </div>

                    <div className="sa-list-main">

                      <div className="sa-list-title">
                        {company.companyName}
                      </div>

                      <div className="sa-list-meta">
                        {company.companyCode ||
                          "No company code"}
                        {" • "}
                        {formatDate(
                          company.createdAt
                        )}
                      </div>

                    </div>

                    <span
                      className={`sa-status ${getStatusClass(
                        company.status
                      )}`}
                    >
                      {company.status}
                    </span>

                  </div>
                )
              )}

            </div>
          )}

        </section>


        {/* RECENT SUBSCRIPTIONS */}

        <section className="sa-panel">

          <div className="sa-panel-header">

            <div>
              <h2>
                Recent subscriptions
              </h2>

              <p>
                Latest subscription activity.
              </p>
            </div>

          </div>

          {recentSubscriptions.length === 0 ? (
            <div className="sa-empty-state">
              No subscriptions found.
            </div>
          ) : (
            <div className="sa-list">

              {recentSubscriptions.map(
                (subscription) => (
                  <div
                    className="sa-list-item"
                    key={subscription.id}
                  >

                    <div className="sa-list-avatar subscription-avatar">
                      <FiCreditCard />
                    </div>

                    <div className="sa-list-main">

                      <div className="sa-list-title">
                        {subscription.company
                          ?.companyName ||
                          "Unknown company"}
                      </div>

                      <div className="sa-list-meta">
                        {subscription.plan
                          ?.name ||
                          "No plan"}
                        {" • "}
                        Ends{" "}
                        {formatDate(
                          subscription.endDate
                        )}
                      </div>

                    </div>

                    <span
                      className={`sa-status ${getStatusClass(
                        subscription.status
                      )}`}
                    >
                      {subscription.status}
                    </span>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </div>

    </div>
  );
};

export default SuperAdminDashboard;