import React, { useMemo, useState } from "react";
import {
  BsCalendar3,
  BsCashStack,
  BsCheckCircleFill,
  BsClockHistory,
  BsDownload,
  BsEye,
  BsPeopleFill,
  BsWallet2,
  BsXCircleFill,
} from "react-icons/bs";

import "./PayrollHistory.css";

const payrollHistoryData = [
  {
    id: 1,
    month: "September 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 8,
    pendingEmployees: 2,
    grossPayroll: 419000,
    totalDeductions: 41710,
    netPayroll: 377290,
    processedDate: "30 Sep 2026",
    status: "Pending",
  },
  {
    id: 2,
    month: "August 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 414500,
    totalDeductions: 40950,
    netPayroll: 373550,
    processedDate: "31 Aug 2026",
    status: "Processed",
  },
  {
    id: 3,
    month: "July 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 411000,
    totalDeductions: 40520,
    netPayroll: 370480,
    processedDate: "31 Jul 2026",
    status: "Processed",
  },
  {
    id: 4,
    month: "June 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 408500,
    totalDeductions: 40180,
    netPayroll: 368320,
    processedDate: "30 Jun 2026",
    status: "Processed",
  },
  {
    id: 5,
    month: "May 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 405000,
    totalDeductions: 39750,
    netPayroll: 365250,
    processedDate: "31 May 2026",
    status: "Processed",
  },
  {
    id: 6,
    month: "April 2026",
    financialYear: "2026-27",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 402500,
    totalDeductions: 39320,
    netPayroll: 363180,
    processedDate: "30 Apr 2026",
    status: "Processed",
  },
  {
    id: 7,
    month: "March 2026",
    financialYear: "2025-26",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 399000,
    totalDeductions: 38890,
    netPayroll: 360110,
    processedDate: "31 Mar 2026",
    status: "Processed",
  },
  {
    id: 8,
    month: "February 2026",
    financialYear: "2025-26",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 396500,
    totalDeductions: 38650,
    netPayroll: 357850,
    processedDate: "28 Feb 2026",
    status: "Processed",
  },
  {
    id: 9,
    month: "January 2026",
    financialYear: "2025-26",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 393000,
    totalDeductions: 38320,
    netPayroll: 354680,
    processedDate: "31 Jan 2026",
    status: "Processed",
  },
  {
    id: 10,
    month: "December 2025",
    financialYear: "2025-26",
    totalEmployees: 10,
    processedEmployees: 10,
    pendingEmployees: 0,
    grossPayroll: 390500,
    totalDeductions: 38010,
    netPayroll: 352490,
    processedDate: "31 Dec 2025",
    status: "Processed",
  },
];

const financialYearOptions = [
  { value: "", label: "All Financial Years" },
  { value: "2026-27", label: "FY 2026-27" },
  { value: "2025-26", label: "FY 2025-26" },
];

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Processed", label: "Processed" },
  { value: "Pending", label: "Pending" },
];

const ITEMS_PER_PAGE = 6;

const PayrollHistory = () => {
  const [history, setHistory] = useState(payrollHistoryData);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const filteredHistory = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return history.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.month.toLowerCase().includes(searchValue) ||
        item.financialYear.toLowerCase().includes(searchValue);

      const matchesYear =
        !selectedYear || item.financialYear === selectedYear;

      const matchesStatus =
        !selectedStatus || item.status === selectedStatus;

      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [history, search, selectedYear, selectedStatus]);

  const totalPages = Math.ceil(
    filteredHistory.length / ITEMS_PER_PAGE
  );

  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredHistory.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredHistory, currentPage]);

  const totalPayroll = useMemo(() => {
    return filteredHistory.reduce(
      (total, item) => total + item.netPayroll,
      0
    );
  }, [filteredHistory]);

  const processedCount = filteredHistory.filter(
    (item) => item.status === "Processed"
  ).length;

  const pendingCount = filteredHistory.filter(
    (item) => item.status === "Pending"
  ).length;

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedYear("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (filteredHistory.length === 0) {
      alert("No payroll history available to export.");
      return;
    }

    const headers = [
      "Month",
      "Financial Year",
      "Total Employees",
      "Processed Employees",
      "Pending Employees",
      "Gross Payroll",
      "Total Deductions",
      "Net Payroll",
      "Processed Date",
      "Status",
    ];

    const rows = filteredHistory.map((item) => [
      item.month,
      item.financialYear,
      item.totalEmployees,
      item.processedEmployees,
      item.pendingEmployees,
      item.grossPayroll,
      item.totalDeductions,
      item.netPayroll,
      item.processedDate,
      item.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(value ?? "");
            return `"${stringValue.replace(/"/g, '""')}"`;
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
    link.download = "Payroll_History.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleProcessRecord = (record) => {
    if (record.status === "Processed") {
      alert(`${record.month} payroll is already processed.`);
      return;
    }

    const confirmed = window.confirm(
      `Process payroll for ${record.month}?`
    );

    if (!confirmed) return;

    setHistory((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              status: "Processed",
              processedEmployees: item.totalEmployees,
              pendingEmployees: 0,
            }
          : item
      )
    );

    setSelectedRecord((prev) =>
      prev && prev.id === record.id
        ? {
            ...prev,
            status: "Processed",
            processedEmployees: prev.totalEmployees,
            pendingEmployees: 0,
          }
        : prev
    );

    alert(`${record.month} payroll processed successfully.`);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="payroll-history-section">
      <div className="payroll-history-header">
        <div>
          <span className="payroll-history-eyebrow">
            PAYROLL ARCHIVE
          </span>

          <h2>Payroll History</h2>

          <p>
            Review previous payroll periods, salary totals and
            processing status.
          </p>
        </div>

        <button
          className="payroll-history-export-btn"
          onClick={handleExport}
        >
          <BsDownload />
          Export History
        </button>
      </div>

      <div className="payroll-history-stats">
        <div className="payroll-history-stat-card">
          <div className="payroll-history-stat-icon employees">
            <BsPeopleFill />
          </div>

          <div>
            <span>Payroll Periods</span>
            <strong>{filteredHistory.length}</strong>
          </div>
        </div>

        <div className="payroll-history-stat-card">
          <div className="payroll-history-stat-icon payroll">
            <BsWallet2 />
          </div>

          <div>
            <span>Total Net Payroll</span>
            <strong>{formatCurrency(totalPayroll)}</strong>
          </div>
        </div>

        <div className="payroll-history-stat-card">
          <div className="payroll-history-stat-icon processed">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Processed Periods</span>
            <strong>{processedCount}</strong>
          </div>
        </div>

        <div className="payroll-history-stat-card">
          <div className="payroll-history-stat-icon pending">
            <BsClockHistory />
          </div>

          <div>
            <span>Pending Periods</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>
      </div>

      <div className="payroll-history-filter-card">
        <div className="payroll-history-filter-title">
          <div>
            <h3>Historical Payroll Records</h3>
            <p>
              Search and filter previously processed payroll.
            </p>
          </div>

          <button
            className="payroll-history-reset"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="payroll-history-filter-grid">
          <div className="payroll-history-field payroll-history-search">
            <label>Search Period</label>

            <div className="payroll-history-input-wrapper">
              <BsCalendar3 />

              <input
                type="text"
                placeholder="Search month or financial year..."
                value={search}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
              />
            </div>
          </div>

          <div className="payroll-history-field">
            <label>Financial Year</label>

            <select
              value={selectedYear}
              onChange={(e) =>
                handleYearChange(e.target.value)
              }
            >
              {financialYearOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="payroll-history-field">
            <label>Status</label>

            <select
              value={selectedStatus}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="payroll-history-table-card">
        <div className="payroll-history-table-wrapper">
          <table className="payroll-history-table">
            <thead>
              <tr>
                <th>Payroll Period</th>
                <th>Employees</th>
                <th>Gross Payroll</th>
                <th>Deductions</th>
                <th>Net Payroll</th>
                <th>Processed Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="payroll-history-period-cell">
                        <div className="payroll-history-month-icon">
                          <BsCalendar3 />
                        </div>

                        <div>
                          <strong>{item.month}</strong>
                          <span>
                            FY {item.financialYear}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="payroll-history-employee-count">
                        <strong>{item.totalEmployees}</strong>

                        <span>
                          {item.processedEmployees} processed
                        </span>
                      </div>
                    </td>

                    <td>
                      <strong className="payroll-history-money">
                        {formatCurrency(item.grossPayroll)}
                      </strong>
                    </td>

                    <td>
                      <strong className="payroll-history-deduction">
                        {formatCurrency(item.totalDeductions)}
                      </strong>
                    </td>

                    <td>
                      <strong className="payroll-history-net">
                        {formatCurrency(item.netPayroll)}
                      </strong>
                    </td>

                    <td>
                      <span className="payroll-history-date">
                        {item.processedDate}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`payroll-history-status ${
                          item.status === "Processed"
                            ? "processed"
                            : "pending"
                        }`}
                      >
                        {item.status === "Processed" ? (
                          <BsCheckCircleFill />
                        ) : (
                          <BsClockHistory />
                        )}

                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="payroll-history-actions">
                        <button
                          title="View Payroll"
                          onClick={() =>
                            setSelectedRecord(item)
                          }
                        >
                          <BsEye />
                        </button>

                        {item.status === "Pending" && (
                          <button
                            className="process"
                            title="Process Payroll"
                            onClick={() =>
                              handleProcessRecord(item)
                            }
                          >
                            <BsCashStack />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="payroll-history-empty"
                  >
                    <BsXCircleFill />
                    <strong>No payroll history found</strong>
                    <span>
                      Try changing your search or filters.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredHistory.length > 0 && (
        <div className="payroll-history-pagination">
          <div>
            Showing{" "}
            <strong>
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredHistory.length
              )}
            </strong>{" "}
            of{" "}
            <strong>{filteredHistory.length}</strong>{" "}
            periods
          </div>

          <div className="payroll-history-pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                className={
                  currentPage === page ? "active" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={goToNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div className="payroll-history-modal-overlay">
          <div className="payroll-history-modal">
            <div className="payroll-history-modal-header">
              <div>
                <span>PAYROLL SUMMARY</span>
                <h3>{selectedRecord.month}</h3>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
              >
                ×
              </button>
            </div>

            <div className="payroll-history-modal-body">
              <div className="payroll-history-summary-top">
                <div>
                  <span>Financial Year</span>
                  <strong>
                    FY {selectedRecord.financialYear}
                  </strong>
                </div>

                <span
                  className={`payroll-history-status ${
                    selectedRecord.status === "Processed"
                      ? "processed"
                      : "pending"
                  }`}
                >
                  {selectedRecord.status === "Processed" ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsClockHistory />
                  )}
                  {selectedRecord.status}
                </span>
              </div>

              <div className="payroll-history-modal-grid">
                <div>
                  <BsPeopleFill />
                  <span>Total Employees</span>
                  <strong>
                    {selectedRecord.totalEmployees}
                  </strong>
                </div>

                <div>
                  <BsCheckCircleFill />
                  <span>Processed</span>
                  <strong>
                    {selectedRecord.processedEmployees}
                  </strong>
                </div>

                <div>
                  <BsClockHistory />
                  <span>Pending</span>
                  <strong>
                    {selectedRecord.pendingEmployees}
                  </strong>
                </div>

                <div>
                  <BsCashStack />
                  <span>Gross Payroll</span>
                  <strong>
                    {formatCurrency(
                      selectedRecord.grossPayroll
                    )}
                  </strong>
                </div>

                <div>
                  <BsWallet2 />
                  <span>Total Deductions</span>
                  <strong>
                    {formatCurrency(
                      selectedRecord.totalDeductions
                    )}
                  </strong>
                </div>

                <div>
                  <BsCashStack />
                  <span>Net Payroll</span>
                  <strong className="net">
                    {formatCurrency(
                      selectedRecord.netPayroll
                    )}
                  </strong>
                </div>
              </div>

              <div className="payroll-history-processing-info">
                <span>Processed Date</span>
                <strong>
                  {selectedRecord.processedDate}
                </strong>
              </div>
            </div>

            <div className="payroll-history-modal-footer">
              {selectedRecord.status === "Pending" && (
                <button
                  className="payroll-history-process-btn"
                  onClick={() =>
                    handleProcessRecord(selectedRecord)
                  }
                >
                  <BsCashStack />
                  Process Payroll
                </button>
              )}

              <button
                className="payroll-history-close-btn"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PayrollHistory;