import React, { useMemo, useState } from "react";
import {
  BsPlusLg,
  BsReceipt,
  BsCheckCircle,
  BsClockHistory,
} from "react-icons/bs";

import PayrollToolbar from "./components/PayrollToolbar";
import PayrollSummary from "./components/PayrollSummary";
import PayrollTable from "./components/PayrollTable";
import PayrollDetails from "./components/PayrollDetails";
import PayrollProcess from "./components/PayrollProcess";
import PayrollPayslip from "./components/PayrollPayslip";
import PayrollConfiguration from "./components/PayrollConfiguration";
import EmployeeSalaryStructure from "./components/EmployeeSalaryStructure";
import PayrollHistory from "./components/PayrollHistory";
import PayrollReports from "./components/PayrollReports";

import {
  payrollData,
} from "./components/PayrollData";

import "./Payroll.css";

const PAGE_SIZE = 6;

const Payroll = () => {
  /* =========================================================
     DATA
  ========================================================= */

  const [payrollRecords, setPayrollRecords] = useState(payrollData);

  /* =========================================================
     FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [selectedMonth, setSelectedMonth] =
    useState("September 2026");
  const [selectedYear, setSelectedYear] =
    useState("2026-27");

  /* =========================================================
     PAGINATION
  ========================================================= */

  const [currentPage, setCurrentPage] = useState(1);

  /* =========================================================
     MODAL / PANEL STATES
  ========================================================= */

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showPayslip, setShowPayslip] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showSalaryStructure, setShowSalaryStructure] =
    useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showReports, setShowReports] = useState(false);

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredPayroll = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return payrollRecords.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.employeeName?.toLowerCase().includes(searchValue) ||
        item.employeeId?.toLowerCase().includes(searchValue) ||
        item.department?.toLowerCase().includes(searchValue) ||
        item.designation?.toLowerCase().includes(searchValue);

      const matchesDepartment =
        !department || item.department === department;

      const matchesStatus =
        !status || item.status === status;

      /*
       * Current mock dataset represents September 2026.
       * Month/year filters are kept compatible with the existing
       * frontend structure without pretending that historical
       * mock payroll data exists.
       */
      const matchesMonth =
        !selectedMonth ||
        selectedMonth === "September 2026" ||
        item.month === selectedMonth;

      const matchesYear =
        !selectedYear ||
        selectedYear === "2026-27" ||
        item.financialYear === selectedYear;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesMonth &&
        matchesYear
      );
    });
  }, [
    payrollRecords,
    search,
    department,
    status,
    selectedMonth,
    selectedYear,
  ]);

  /* =========================================================
     PAGINATION DATA
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayroll.length / PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedPayroll = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * PAGE_SIZE;

    return filteredPayroll.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [filteredPayroll, safeCurrentPage]);

  /* =========================================================
     SUMMARY
  ========================================================= */

  const summary = useMemo(() => {
    const totalEmployees = filteredPayroll.length;

    const processedEmployees = filteredPayroll.filter(
      (item) => item.status === "Processed"
    ).length;

    const pendingEmployees = filteredPayroll.filter(
      (item) => item.status === "Pending"
    ).length;

    const grossSalary = filteredPayroll.reduce(
      (total, item) =>
        total + Number(item.gross || 0),
      0
    );

    const totalDeductions = filteredPayroll.reduce(
      (total, item) =>
        total + Number(item.totalDeductions || 0),
      0
    );

    const netSalary = filteredPayroll.reduce(
      (total, item) =>
        total + Number(item.net || 0),
      0
    );

    return {
      totalEmployees,
      processedEmployees,
      pendingEmployees,
      grossSalary,
      totalDeductions,
      netSalary,
    };
  }, [filteredPayroll]);

  /* =========================================================
     FILTER HANDLERS
  ========================================================= */

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setDepartment("");
    setStatus("");
    setSelectedMonth("September 2026");
    setSelectedYear("2026-27");
    setCurrentPage(1);
  };

  /* =========================================================
     VIEW DETAILS
  ========================================================= */

  const handleView = (payroll) => {
    setSelectedPayroll(payroll);
  };

  /* =========================================================
     PAYSLIP
  ========================================================= */

  const handleViewPayslip = (payroll) => {
    setSelectedPayroll(payroll);
    setShowPayslip(true);
  };

  /* =========================================================
     PROCESS PAYROLL
  ========================================================= */

  const handleOpenProcess = () => {
    setShowProcessModal(true);
  };

  const handleProcessPayroll = (selectedIds = []) => {
    setPayrollRecords((previous) =>
      previous.map((item) => {
        const shouldProcess =
          selectedIds.length === 0 ||
          selectedIds.includes(item.id) ||
          selectedIds.includes(item.employeeId);

        if (
          shouldProcess &&
          item.status === "Pending"
        ) {
          return {
            ...item,
            status: "Processed",
            processedOn:
              new Date().toISOString(),
          };
        }

        return item;
      })
    );

    setShowProcessModal(false);
  };

  /* =========================================================
     EXPORT CSV
  ========================================================= */

  const handleExport = () => {
    if (!filteredPayroll.length) {
      alert("No payroll records available to export.");
      return;
    }

    const headers = [
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Basic Salary",
      "HRA",
      "Special Allowance",
      "Conveyance",
      "Medical Allowance",
      "Other Earnings",
      "Gross Salary",
      "PF",
      "ESI",
      "Professional Tax",
      "TDS",
      "Loan Deduction",
      "Other Deductions",
      "Total Deductions",
      "Net Salary",
      "Working Days",
      "Present Days",
      "Leave Days",
      "LOP Days",
      "Status",
    ];

    const rows = filteredPayroll.map((item) => [
      item.employeeId,
      item.employeeName,
      item.department,
      item.designation,
      item.basic,
      item.hra,
      item.specialAllowance,
      item.conveyance,
      item.medicalAllowance,
      item.otherEarnings,
      item.gross,
      item.pf,
      item.esi,
      item.pt,
      item.tds,
      item.loanDeduction,
      item.otherDeductions,
      item.totalDeductions,
      item.net,
      item.workingDays,
      item.present,
      item.leave,
      item.lop,
      item.status,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text = String(
              value ?? ""
            );

            return `"${text.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `Payroll_${selectedMonth.replace(
        /\s+/g,
        "_"
      )}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const handleOpenConfiguration = () => {
    setShowConfiguration(true);
  };

  const handleOpenSalaryStructure = () => {
    setShowSalaryStructure(true);
  };

  const handleOpenHistory = () => {
    setShowHistory(true);
  };

  const handleOpenReports = () => {
    setShowReports(true);
  };

  /* =========================================================
     CLOSE ALL PANELS
  ========================================================= */

  const handleClosePanels = () => {
    setSelectedPayroll(null);
    setShowProcessModal(false);
    setShowPayslip(false);
    setShowConfiguration(false);
    setShowSalaryStructure(false);
    setShowHistory(false);
    setShowReports(false);
  };

  /* =========================================================
     PAGINATION HANDLERS
  ========================================================= */

  const handlePreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="payroll-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="payroll-page-header">

        <div className="payroll-page-title-section">

          <div className="payroll-page-icon">
            <BsReceipt />
          </div>

          <div>
            <h1>Payroll Management</h1>

            <p>
              Manage employee salaries, payroll
              processing, payslips and payroll
              reports.
            </p>
          </div>

        </div>

        <div className="payroll-header-actions">

          <button
            type="button"
            className="payroll-secondary-btn"
            onClick={handleOpenReports}
          >
            <BsClockHistory />
            Reports
          </button>

          <button
            type="button"
            className="payroll-primary-btn"
            onClick={handleOpenProcess}
          >
            <BsPlusLg />
            Process Payroll
          </button>

        </div>

      </div>

      {/* =====================================================
          PERIOD CARD
      ===================================================== */}

      <div className="payroll-period-card">

        <div className="payroll-period-icon">
          <BsCheckCircle />
        </div>

        <div className="payroll-period-content">

          <span className="payroll-period-label">
            Current Payroll Period
          </span>

          <strong>
            {selectedMonth}
          </strong>

          <small>
            Financial Year: {selectedYear}
          </small>

        </div>

        <div className="payroll-period-status">
          <span className="payroll-period-dot" />
          Active Period
        </div>

      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <PayrollToolbar
        search={search}
        setSearch={handleSearchChange}
        department={department}
        setDepartment={handleDepartmentChange}
        status={status}
        setStatus={handleStatusChange}
        selectedMonth={selectedMonth}
        setSelectedMonth={handleMonthChange}
        selectedYear={selectedYear}
        setSelectedYear={handleYearChange}
        onReset={handleResetFilters}
        onExport={handleExport}
      />

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <PayrollSummary
        summary={summary}
      />

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="payroll-quick-actions">

        <button
          type="button"
          onClick={handleOpenSalaryStructure}
        >
          <span>
            Employee Salary Structure
          </span>
          <small>
            Manage salary components
          </small>
        </button>

        <button
          type="button"
          onClick={handleOpenConfiguration}
        >
          <span>
            Payroll Configuration
          </span>
          <small>
            Configure payroll rules
          </small>
        </button>

        <button
          type="button"
          onClick={handleOpenHistory}
        >
          <span>
            Payroll History
          </span>
          <small>
            View previous payroll records
          </small>
        </button>

        <button
          type="button"
          onClick={handleOpenReports}
        >
          <span>
            Reports & Analytics
          </span>
          <small>
            Payroll insights and reports
          </small>
        </button>

      </div>

      {/* =====================================================
          PAYROLL TABLE
      ===================================================== */}

      <div className="payroll-table-card">

        <div className="payroll-table-header">

          <div>
            <h2>Payroll Records</h2>

            <p>
              Showing{" "}
              {filteredPayroll.length}{" "}
              payroll record
              {filteredPayroll.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <div className="payroll-table-period">
            {selectedMonth}
          </div>

        </div>

        <PayrollTable
          data={paginatedPayroll}
          onView={handleView}
          onPayslip={handleViewPayslip}
        />

        {/* ===================================================
            PAGINATION
        =================================================== */}

        {filteredPayroll.length > 0 && (
          <div className="payroll-pagination">

            <div className="payroll-pagination-info">
              Showing{" "}
              <strong>
                {(safeCurrentPage - 1) *
                  PAGE_SIZE +
                  1}
              </strong>
              {" - "}
              <strong>
                {Math.min(
                  safeCurrentPage *
                    PAGE_SIZE,
                  filteredPayroll.length
                )}
              </strong>
              {" of "}
              <strong>
                {filteredPayroll.length}
              </strong>
            </div>

            <div className="payroll-pagination-controls">

              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={
                  handlePreviousPage
                }
              >
                Previous
              </button>

              {pageNumbers.map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    page ===
                    safeCurrentPage
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handlePageChange(
                      page
                    )
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={
                  handleNextPage
                }
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* Empty state */}

        {!filteredPayroll.length && (
          <div className="payroll-empty-state">

            <div className="payroll-empty-icon">
              <BsReceipt />
            </div>

            <h3>
              No Payroll Records Found
            </h3>

            <p>
              No payroll records match the
              selected filters.
            </p>

            <button
              type="button"
              onClick={
                handleResetFilters
              }
            >
              Reset Filters
            </button>

          </div>
        )}

      </div>

      {/* =====================================================
          PAYROLL DETAILS
      ===================================================== */}

      {selectedPayroll &&
        !showPayslip && (
          <PayrollDetails
            payroll={selectedPayroll}
            onClose={
              handleClosePanels
            }
            onPayslip={() =>
              handleViewPayslip(
                selectedPayroll
              )
            }
          />
        )}

      {/* =====================================================
          PROCESS PAYROLL
      ===================================================== */}

      {showProcessModal && (
        <PayrollProcess
          data={filteredPayroll}
          onClose={
            handleClosePanels
          }
          onProcess={
            handleProcessPayroll
          }
        />
      )}

      {/* =====================================================
          PAYSLIP
      ===================================================== */}

      {showPayslip &&
        selectedPayroll && (
          <PayrollPayslip
            payroll={selectedPayroll}
            onClose={
              handleClosePanels
            }
          />
        )}

      {/* =====================================================
          PAYROLL CONFIGURATION
      ===================================================== */}

      {showConfiguration && (
        <PayrollConfiguration
          onClose={
            handleClosePanels
          }
        />
      )}

      {/* =====================================================
          EMPLOYEE SALARY STRUCTURE
      ===================================================== */}

      {showSalaryStructure && (
        <EmployeeSalaryStructure
          onClose={
            handleClosePanels
          }
        />
      )}

      {/* =====================================================
          PAYROLL HISTORY
      ===================================================== */}

      {showHistory && (
        <PayrollHistory
          onClose={
            handleClosePanels
          }
        />
      )}

      {/* =====================================================
          PAYROLL REPORTS
      ===================================================== */}

      {showReports && (
        <PayrollReports
          onClose={
            handleClosePanels
          }
        />
      )}

    </div>
  );
};

export default Payroll;