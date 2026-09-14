import React, { useState } from "react";
import {
  BsCalendar3,
  BsChevronDown,
  BsArrowClockwise,
} from "react-icons/bs";

import "./DashboardToolbar.css";

function DashboardToolbar({
  dateRange,
  onDateRangeChange,
  onRefresh,
  refreshing,
  lastUpdated,
}) {
  const handleDateChange = (event) => {
    onDateRangeChange(event.target.value);
  };

  return (
    <div className="dashboard-toolbar">

      {/* ================================= */}
      {/* Left */}
      {/* ================================= */}

      <div className="dashboard-toolbar-left">

        <div className="dashboard-page-title">

          <h2>Dashboard</h2>

          <div className="dashboard-live-status">
            <span className="live-dot"></span>
            Live
          </div>

        </div>

        <div className="dashboard-subtitle-row">

          <p>
            Monitor your organization's workforce and HR activities.
          </p>

          {lastUpdated && (
            <span className="dashboard-last-updated">
              Updated {lastUpdated}
            </span>
          )}

        </div>

      </div>


      {/* ================================= */}
      {/* Right */}
      {/* ================================= */}

      <div className="dashboard-toolbar-right">

        <div className="date-selector">

          <BsCalendar3 />

          <select
            value={dateRange}
            onChange={handleDateChange}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Quarter">
              This Quarter
            </option>
            <option value="This Year">This Year</option>
          </select>

          <BsChevronDown className="date-chevron" />

        </div>


        <button
          type="button"
          className={`dashboard-refresh ${
            refreshing ? "refreshing" : ""
          }`}
          onClick={onRefresh}
          disabled={refreshing}
          title="Refresh Dashboard"
        >

          <BsArrowClockwise />

        </button>

      </div>

    </div>
  );
}

export default DashboardToolbar;