import React from "react";
import { BsSearch, BsArrowClockwise, BsDownload } from "react-icons/bs";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import {
  reimbursementDepartmentOptions,
  reimbursementTypeOptions,
  reimbursementStatusOptions,
} from "./ReimbursementData";

import "./ReimbursementToolbar.css";

const ReimbursementToolbar = ({
  search,
  setSearch,

  department,
  setDepartment,

  reimbursementType,
  setReimbursementType,

  status,
  setStatus,

  fromDate,
  setFromDate,

  toDate,
  setToDate,

  onReset,
  onExport,
}) => {
  return (
    <div className="reimbursement-toolbar">

      {/* Toolbar Header */}
      <div className="reimbursement-toolbar-header">
        <div>
          <h3 className="reimbursement-toolbar-title">
            Reimbursement Claims
          </h3>

          <p className="reimbursement-toolbar-subtitle">
            Search and filter employee reimbursement claims
          </p>
        </div>

        <div className="reimbursement-toolbar-actions">
          <button
            type="button"
            className="reimbursement-toolbar-btn reset-btn"
            onClick={onReset}
          >
            <BsArrowClockwise />
            <span>Reset</span>
          </button>

          <button
            type="button"
            className="reimbursement-toolbar-btn export-btn"
            onClick={onExport}
          >
            <BsDownload />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="reimbursement-filter-grid">

        {/* Search */}
        <div className="reimbursement-filter-search">
          <label className="reimbursement-filter-label">
            Search Employee / Claim
          </label>

          <div className="reimbursement-search-wrapper">
            <BsSearch className="reimbursement-search-icon" />

            <input
              type="text"
              className="reimbursement-search-input"
              placeholder="Search employee, claim ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Department */}
        <CustomDropdown
          label="Department"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          options={reimbursementDepartmentOptions}
        />

        {/* Reimbursement Type */}
        <CustomDropdown
          label="Expense Type"
          name="reimbursementType"
          value={reimbursementType}
          onChange={(e) => setReimbursementType(e.target.value)}
          options={reimbursementTypeOptions}
        />

        {/* Status */}
        <CustomDropdown
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={reimbursementStatusOptions}
        />

        {/* From Date */}
        <div className="reimbursement-date-field">
          <label
            htmlFor="reimbursement-from-date"
            className="reimbursement-filter-label"
          >
            From Date
          </label>

          <input
            id="reimbursement-from-date"
            type="date"
            className="reimbursement-date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className="reimbursement-date-field">
          <label
            htmlFor="reimbursement-to-date"
            className="reimbursement-filter-label"
          >
            To Date
          </label>

          <input
            id="reimbursement-to-date"
            type="date"
            className="reimbursement-date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
};

export default ReimbursementToolbar;