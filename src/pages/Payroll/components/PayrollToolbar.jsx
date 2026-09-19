import React from "react";
import {
  BsSearch,
  BsArrowClockwise,
  BsDownload,
  BsCalendar3,
} from "react-icons/bs";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import {
  payrollDepartmentOptions,
  payrollStatusOptions,
  payrollMonthOptions,
  payrollYearOptions,
} from "./PayrollData";

import "./PayrollToolbar.css";

const PayrollToolbar = ({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  onReset,
  onExport,
}) => {
  return (
    <div className="payroll-toolbar">

      {/* =====================================================
          TOOLBAR HEADER
      ===================================================== */}

      <div className="payroll-toolbar-header">

        <div className="payroll-toolbar-title">

          <div className="payroll-toolbar-title-icon">
            <BsCalendar3 />
          </div>

          <div>
            <h2>Payroll Management</h2>

            <p>
              Search, filter and manage employee payroll records
            </p>
          </div>

        </div>

        <div className="payroll-toolbar-actions">

          <button
            type="button"
            className="payroll-toolbar-btn payroll-reset-btn"
            onClick={onReset}
          >
            <BsArrowClockwise />
            <span>Reset</span>
          </button>

          <button
            type="button"
            className="payroll-toolbar-btn payroll-export-btn"
            onClick={onExport}
          >
            <BsDownload />
            <span>Export CSV</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="payroll-filter-grid">

        {/* Search */}

        <div className="payroll-search-wrapper">

          <CustomTextInput
            label="Search Employee"
            name="payrollSearch"
            id="payrollSearch"
            placeholder="Name, employee ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <BsSearch className="payroll-search-icon" />

        </div>

        {/* Month */}

        <CustomDropdown
          label="Payroll Month"
          name="payrollMonth"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
          options={payrollMonthOptions}
        />

        {/* Financial Year */}

        <CustomDropdown
          label="Financial Year"
          name="payrollYear"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(e.target.value)
          }
          options={payrollYearOptions}
        />

        {/* Department */}

        <CustomDropdown
          label="Department"
          name="payrollDepartment"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          options={payrollDepartmentOptions}
        />

        {/* Status */}

        <CustomDropdown
          label="Payroll Status"
          name="payrollStatus"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          options={payrollStatusOptions}
        />

      </div>

    </div>
  );
};

export default PayrollToolbar;