import React, { useMemo, useState } from "react";
import {
  BsArrowClockwise,
  BsDownload,
  BsPlayCircle,
} from "react-icons/bs";

import PayrollSummary from "./components/PayrollSummary";
import PayrollTable from "./components/PayrollTable";
import PayrollDetails from "./components/PayrollDetails";
import PayrollProcess from "./components/PayrollProcess";
import PayrollPayslip from "./components/PayrollPayslip";
import PayrollHistory from "./components/PayrollHistory";
import PayrollReports from "./components/PayrollReports";
import EmployeeSalaryStructure from "./components/EmployeeSalaryStructure";
import PayrollConfiguration from "./components/PayrollConfiguration";

import {
  payrollData,
  payrollDepartmentOptions,
  payrollStatusOptions,
  payrollMonthOptions,
  payrollYearOptions,
} from "./components/PayrollData";

import "./Payroll.css";

const ITEMS_PER_PAGE = 6;

const Payroll = () => {
  /* =========================================
     STATE
  ========================================= */

  const [employees, setEmployees] = useState(payrollData);

  const [search, setSearch] = useState("");

  const [selectedMonth, setSelectedMonth] = useState(
    "September 2026"
  );

  const [selectedYear, setSelectedYear] = useState(
    "2026-27"
  );

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPayroll, setSelectedPayroll] =
    useState(null);

  const [editingPayroll, setEditingPayroll] =
    useState(null);
const [selectedPayslip, setSelectedPayslip] = useState(null);
  /* =========================================
     FILTER PAYROLL DATA
  ========================================= */

  const filteredPayrollData = useMemo(() => {
    return employees.filter((employee) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        employee.employeeName
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.employeeId
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.department
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.designation
          ?.toLowerCase()
          .includes(searchValue);

      const matchesDepartment =
        !selectedDepartment ||
        employee.department === selectedDepartment;

      const matchesStatus =
        !selectedStatus ||
        employee.status === selectedStatus;

      const matchesMonth =
        !selectedMonth ||
        employee.month === selectedMonth;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesMonth
      );
    });
  }, [
    employees,
    search,
    selectedDepartment,
    selectedStatus,
    selectedMonth,
  ]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredPayrollData.length / ITEMS_PER_PAGE
  );

  const paginatedData = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredPayrollData.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredPayrollData, currentPage]);

  /* =========================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================= */

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  /* =========================================
     RESET FILTERS
  ========================================= */

  const resetFilters = () => {
    setSearch("");
    setSelectedMonth("September 2026");
    setSelectedYear("2026-27");
    setSelectedDepartment("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  /* =========================================
     SAVE / UPDATE PAYROLL
  ========================================= */

  const handleSavePayroll = (updatedPayroll) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === updatedPayroll.id
          ? updatedPayroll
          : employee
      )
    );

    setEditingPayroll(null);

    /*
      Keep selected payroll synchronized
      if details were previously opened.
    */

    if (
      selectedPayroll &&
      selectedPayroll.id === updatedPayroll.id
    ) {
      setSelectedPayroll(updatedPayroll);
    }
  };

  /* =========================================
     PROCESS PAYROLL
  ========================================= */

  const handleProcessPayroll = () => {
    const pendingEmployees = employees.filter(
      (employee) =>
        employee.status === "Pending" &&
        employee.month === selectedMonth
    );

    if (pendingEmployees.length === 0) {
      alert(
        "There is no pending payroll to process for the selected month."
      );

      return;
    }

    const confirmed = window.confirm(
      `Process payroll for ${pendingEmployees.length} pending employee(s) for ${selectedMonth}?`
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.map((employee) => {
        if (
          employee.status === "Pending" &&
          employee.month === selectedMonth
        ) {
          return {
            ...employee,
            status: "Processed",
          };
        }

        return employee;
      })
    );

    alert(
      `Payroll processed successfully for ${pendingEmployees.length} employee(s).`
    );
  };

  /* =========================================
     EXPORT CSV
  ========================================= */

  const handleExport = () => {
    if (filteredPayrollData.length === 0) {
      alert("No payroll records available to export.");

      return;
    }

    const headers = [
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Month",
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
      "Present",
      "Leave",
      "LOP",
      "Status",
    ];

    const rows = filteredPayrollData.map((employee) => [
      employee.employeeId,
      employee.employeeName,
      employee.department,
      employee.designation,
      employee.month,
      employee.basic,
      employee.hra,
      employee.specialAllowance,
      employee.conveyance,
      employee.medicalAllowance,
      employee.otherEarnings,
      employee.gross,
      employee.pf,
      employee.esi,
      employee.professionalTax,
      employee.tds,
      employee.loanDeduction,
      employee.otherDeductions,
      employee.totalDeductions,
      employee.net,
      employee.workingDays,
      employee.present,
      employee.leave,
      employee.lop,
      employee.status,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(
              value ?? ""
            );

            return `"${stringValue.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `Payroll_${selectedMonth.replace(
      /\s+/g,
      "_"
    )}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================
     PAGINATION HANDLERS
  ========================================= */

  const goToPreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  /* =========================================
     PAGE NUMBERS
  ========================================= */

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="payroll-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="payroll-page-header">

        <div>
          <p className="payroll-page-eyebrow">
            PAYROLL MANAGEMENT
          </p>

          <h1>
            Payroll
          </h1>

          <p className="payroll-page-subtitle">
            Manage employee salaries, deductions,
            attendance and monthly payroll processing.
          </p>
        </div>

        <div className="payroll-header-actions">

          <button
            className="payroll-reset-btn"
            onClick={resetFilters}
          >
            <BsArrowClockwise />
            Reset
          </button>

          <button
            className="payroll-export-btn"
            onClick={handleExport}
          >
            <BsDownload />
            Export
          </button>

          <button
            className="payroll-process-btn"
            onClick={handleProcessPayroll}
          >
            <BsPlayCircle />
            Process Payroll
          </button>

        </div>

      </div>


      {/* =====================================
          PAYROLL PERIOD
      ===================================== */}

      <div className="payroll-period-card">

        <div className="payroll-period-info">

          <div className="payroll-period-icon">
            <BsPlayCircle />
          </div>

          <div>
            <span>
              PAYROLL PERIOD
            </span>

            <strong>
              {selectedMonth}
            </strong>
          </div>

        </div>

        <div className="payroll-period-selects">

          <div className="payroll-period-field">

            <label>
              Payroll Month
            </label>

            <select
              value={selectedMonth}
              onChange={(e) =>
                handleMonthChange(e.target.value)
              }
            >
              {payrollMonthOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

          </div>

          <div className="payroll-period-field">

            <label>
              Financial Year
            </label>

            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            >
              {payrollYearOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

          </div>

        </div>

      </div>


      {/* =====================================
          SUMMARY
      ===================================== */}

      <PayrollSummary
        data={filteredPayrollData}
      />


      {/* =====================================
          FILTER CARD
      ===================================== */}

      <div className="payroll-filter-card">

        <div className="payroll-filter-header">

          <div>
            <h3>
              Payroll Records
            </h3>

            <p>
              Search and filter employee payroll
              records.
            </p>
          </div>

          <div className="payroll-result-count">
            {filteredPayrollData.length}{" "}
            Records
          </div>

        </div>


        <div className="payroll-filter-grid">

          {/* SEARCH */}

          <div className="payroll-filter-field payroll-search-field">

            <label>
              Search Employee
            </label>

            <input
              type="text"
              placeholder="Search by name, ID, department..."
              value={search}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
            />

          </div>


          {/* DEPARTMENT */}

          <div className="payroll-filter-field">

            <label>
              Department
            </label>

            <select
              value={selectedDepartment}
              onChange={(e) =>
                handleDepartmentChange(
                  e.target.value
                )
              }
            >
              {payrollDepartmentOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

          </div>


          {/* STATUS */}

          <div className="payroll-filter-field">

            <label>
              Status
            </label>

            <select
              value={selectedStatus}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value
                )
              }
            >
              {payrollStatusOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

          </div>

        </div>

      </div>


      {/* =====================================
          PAYROLL TABLE
      ===================================== */}

    <PayrollTable
  data={paginatedData}
  onView={(employee) => {
    setSelectedPayroll(employee);
  }}
  onEdit={(employee) => {
    setEditingPayroll(employee);
  }}
  onPayslip={(employee) => {
    setSelectedPayslip(employee);
  }}
/>


      {/* =====================================
          PAGINATION
      ===================================== */}

 {filteredPayrollData.length > 0 && (
  <div className="payroll-pagination">
    {/* existing pagination */}
  </div>
)}

<PayrollHistory />
<PayrollReports />

{selectedPayroll && (
  <PayrollDetails
    employee={selectedPayroll}
    onClose={() => setSelectedPayroll(null)}
  />
)}

{editingPayroll && (
  <PayrollProcess
    employee={editingPayroll}
    onClose={() => setEditingPayroll(null)}
    onSave={handleSavePayroll}
  />
)}

{selectedPayslip && (
  <PayrollPayslip
    employee={selectedPayslip}
    onClose={() => setSelectedPayslip(null)}
  />
)}


      {/* =====================================
          PAYROLL DETAILS MODAL
      ===================================== */}

    {selectedPayroll && (
  <PayrollDetails
    employee={selectedPayroll}
    onClose={() =>
      setSelectedPayroll(null)
    }
  />
)}

{editingPayroll && (
  <PayrollProcess
    employee={editingPayroll}
    onClose={() =>
      setEditingPayroll(null)
    }
    onSave={handleSavePayroll}
  />
)}

{selectedPayslip && (
  <PayrollPayslip
    employee={selectedPayslip}
    onClose={() =>
      setSelectedPayslip(null)
    }
  />
)}


      {/* =====================================
          PAYROLL PROCESS MODAL
      ===================================== */}

      {editingPayroll && (
        <PayrollProcess
          employee={editingPayroll}
          onClose={() =>
            setEditingPayroll(null)
          }
          onSave={handleSavePayroll}
        />
      )}
<PayrollConfiguration />

<EmployeeSalaryStructure />
    </div>
    
  );
};

export default Payroll;