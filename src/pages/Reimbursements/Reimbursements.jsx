import React, { useMemo, useState } from "react";
import {
  BsPlusLg,
  BsReceipt,
  BsCheckCircle,
  BsXCircle,
  BsCashStack,
  BsExclamationTriangle,
} from "react-icons/bs";

import ReimbursementToolbar from "./components/ReimbursementToolbar";
import ReimbursementSummary from "./components/ReimbursementSummary";
import ReimbursementTable from "./components/ReimbursementTable";
import ReimbursementDetails from "./components/ReimbursementDetails";
import ApplyReimbursement from "./components/ApplyReimbursement";

import {
  reimbursementData,
  getReimbursementSummary,
} from "./components/ReimbursementData";

import "./Reimbursements.css";

const ITEMS_PER_PAGE = 6;

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getDateTime = () => {
  return new Date().toISOString();
};

const getFormattedTimelineDate = () => {
  const date = new Date();

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Reimbursements = () => {
  /* =======================================================
     DATA
  ======================================================= */

  const [claims, setClaims] = useState(
    reimbursementData
  );

  /* =======================================================
     FILTERS
  ======================================================= */

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [reimbursementType, setReimbursementType] =
    useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const [currentPage, setCurrentPage] = useState(1);

  /* =======================================================
     MODALS
  ======================================================= */

  const [selectedReimbursement, setSelectedReimbursement] =
    useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [showApplyModal, setShowApplyModal] =
    useState(false);

  const [editingReimbursement, setEditingReimbursement] =
    useState(null);

  /* =======================================================
     FILTER DATA
  ======================================================= */

  const filteredClaims = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return claims.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.claimId
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        item.employeeName
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        item.employeeId
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        item.department
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesDepartment =
        !department ||
        item.department === department;

      const matchesType =
        !reimbursementType ||
        item.reimbursementType ===
          reimbursementType;

      const matchesStatus =
        !status ||
        item.status === status;

      const matchesFromDate =
        !fromDate ||
        item.expenseDate >= fromDate;

      const matchesToDate =
        !toDate ||
        item.expenseDate <= toDate;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesType &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [
    claims,
    search,
    department,
    reimbursementType,
    status,
    fromDate,
    toDate,
  ]);

  /* =======================================================
     PAGINATION DATA
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredClaims.length / ITEMS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedClaims = filteredClaims.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {
    return getReimbursementSummary(claims);
  }, [claims]);

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const handleReset = () => {
    setSearch("");
    setDepartment("");
    setReimbursementType("");
    setStatus("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  /* =======================================================
     SEARCH/FILTER PAGE RESET
  ======================================================= */

  const updateFilter = (setter) => {
    return (value) => {
      setter(value);
      setCurrentPage(1);
    };
  };

  /* =======================================================
     VIEW
  ======================================================= */

  const handleView = (claim) => {
    setSelectedReimbursement(claim);
    setShowDetails(true);
  };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = (claim) => {
    if (claim.status !== "Pending") {
      return;
    }

    setEditingReimbursement(claim);
    setShowApplyModal(true);
  };

  /* =======================================================
     CLOSE DETAILS
  ======================================================= */

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedReimbursement(null);
  };

  /* =======================================================
     CLOSE APPLY
  ======================================================= */

  const handleCloseApply = () => {
    setShowApplyModal(false);
    setEditingReimbursement(null);
  };

  /* =======================================================
     APPROVE
  ======================================================= */

  const handleApprove = (claim) => {
    if (!claim || claim.status !== "Pending") {
      return;
    }

    const now = getDateTime();

    const timelineEntry = {
      status: "Approved",
      date: getFormattedTimelineDate(),
      user: "Admin",
      remarks:
        "Reimbursement claim approved for payment.",
    };

    setClaims((previous) =>
      previous.map((item) => {
        if (item.id !== claim.id) {
          return item;
        }

        return {
          ...item,
          status: "Approved",
          approvedAmount: Number(item.amount || 0),
          approvedOn: now,
          approvalTimeline: [
            ...(item.approvalTimeline || []),
            timelineEntry,
          ],
        };
      })
    );

    setSelectedReimbursement((previous) => {
      if (!previous || previous.id !== claim.id) {
        return previous;
      }

      return {
        ...previous,
        status: "Approved",
        approvedAmount: Number(
          previous.amount || 0
        ),
        approvedOn: now,
        approvalTimeline: [
          ...(previous.approvalTimeline || []),
          timelineEntry,
        ],
      };
    });
  };

  /* =======================================================
     REJECT
  ======================================================= */

  const handleReject = (claim) => {
    if (!claim || claim.status !== "Pending") {
      return;
    }

    const reason = window.prompt(
      "Enter rejection reason:",
      "Expense is not eligible as per reimbursement policy."
    );

    if (reason === null) {
      return;
    }

    const finalReason =
      reason.trim() ||
      "Claim rejected by approver.";

    const now = getDateTime();

    const timelineEntry = {
      status: "Rejected",
      date: getFormattedTimelineDate(),
      user: "Admin",
      remarks: finalReason,
    };

    setClaims((previous) =>
      previous.map((item) => {
        if (item.id !== claim.id) {
          return item;
        }

        return {
          ...item,
          status: "Rejected",
          approvedAmount: 0,
          paidAmount: 0,
          approvedOn: null,
          paidOn: null,
          rejectionReason: finalReason,
          approvalTimeline: [
            ...(item.approvalTimeline || []),
            timelineEntry,
          ],
        };
      })
    );

    setSelectedReimbursement((previous) => {
      if (!previous || previous.id !== claim.id) {
        return previous;
      }

      return {
        ...previous,
        status: "Rejected",
        approvedAmount: 0,
        paidAmount: 0,
        approvedOn: null,
        paidOn: null,
        rejectionReason: finalReason,
        approvalTimeline: [
          ...(previous.approvalTimeline || []),
          timelineEntry,
        ],
      };
    });
  };

  /* =======================================================
     MARK PAID
  ======================================================= */

  const handleMarkPaid = (claim) => {
    if (!claim || claim.status !== "Approved") {
      return;
    }

    const confirmed = window.confirm(
      `Mark ${claim.claimId} as paid?`
    );

    if (!confirmed) {
      return;
    }

    const now = getDateTime();

    const timelineEntry = {
      status: "Paid",
      date: getFormattedTimelineDate(),
      user: "Finance Team",
      remarks:
        "Payment processed successfully.",
    };

    setClaims((previous) =>
      previous.map((item) => {
        if (item.id !== claim.id) {
          return item;
        }

        return {
          ...item,
          status: "Paid",
          paidAmount: Number(
            item.approvedAmount || item.amount || 0
          ),
          paidOn: now,
          approvalTimeline: [
            ...(item.approvalTimeline || []),
            timelineEntry,
          ],
        };
      })
    );

    setSelectedReimbursement((previous) => {
      if (!previous || previous.id !== claim.id) {
        return previous;
      }

      return {
        ...previous,
        status: "Paid",
        paidAmount: Number(
          previous.approvedAmount ||
            previous.amount ||
            0
        ),
        paidOn: now,
        approvalTimeline: [
          ...(previous.approvalTimeline || []),
          timelineEntry,
        ],
      };
    });
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = (claim) => {
    if (!claim) {
      return;
    }

    if (claim.status === "Paid") {
      window.alert(
        "Paid reimbursement claims cannot be deleted."
      );

      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${claim.claimId}?`
    );

    if (!confirmed) {
      return;
    }

    setClaims((previous) =>
      previous.filter(
        (item) => item.id !== claim.id
      )
    );

    if (
      selectedReimbursement?.id === claim.id
    ) {
      handleCloseDetails();
    }

    setCurrentPage((page) =>
      Math.min(
        page,
        Math.max(
          1,
          Math.ceil(
            (filteredClaims.length - 1) /
              ITEMS_PER_PAGE
          )
        )
      )
    );
  };

  /* =======================================================
     ADD / EDIT SUBMIT
  ======================================================= */

  const handleSubmitReimbursement = async (
    payload
  ) => {
    if (editingReimbursement) {
      setClaims((previous) =>
        previous.map((item) => {
          if (
            item.id !== editingReimbursement.id
          ) {
            return item;
          }

          return {
            ...item,
            ...payload,
            id: item.id,
            claimId: item.claimId,
            status: item.status,
            approvedAmount: item.approvedAmount,
            paidAmount: item.paidAmount,
            approvedOn: item.approvedOn,
            paidOn: item.paidOn,
            approvalTimeline:
              item.approvalTimeline,
            createdOn: item.createdOn,
            updatedOn: getDateTime(),
          };
        })
      );
    } else {
      const nextId =
        claims.length > 0
          ? Math.max(
              ...claims.map((item) =>
                Number(item.id)
              )
            ) + 1
          : 1;

      const claimNumber = String(
        nextId
      ).padStart(3, "0");

      const now = getDateTime();

      const newClaim = {
        ...payload,

        id: nextId,

        claimId: `RMB-2026-${claimNumber}`,

        designation: "Employee",

        approvedAmount: 0,

        paidAmount: 0,

        status: "Pending",

        approver: "Priya Singh",

        approverId: "EMP-1023",

        receiptAttached:
          Boolean(payload.receiptAttached),

        createdOn: now,

        submittedDate:
          getTodayDate(),

        approvedOn: null,

        paidOn: null,

        rejectionReason: "",

        approvalTimeline: [
          {
            status: "Submitted",
            date:
              getFormattedTimelineDate(),
            user:
              payload.employeeName ||
              "Employee",
            remarks:
              "Reimbursement claim submitted for approval.",
          },
        ],
      };

      setClaims((previous) => [
        newClaim,
        ...previous,
      ]);

      setCurrentPage(1);
    }

    handleCloseApply();
  };

  /* =======================================================
     CSV EXPORT
  ======================================================= */

  const handleExport = () => {
    if (!filteredClaims.length) {
      window.alert(
        "There are no reimbursement records to export."
      );

      return;
    }

    const headers = [
      "Claim ID",
      "Employee ID",
      "Employee",
      "Department",
      "Expense Type",
      "Expense Date",
      "Submitted Date",
      "Claim Amount",
      "Approved Amount",
      "Paid Amount",
      "Payment Mode",
      "Status",
      "Approver",
    ];

    const rows = filteredClaims.map(
      (item) => [
        item.claimId,
        item.employeeId,
        item.employeeName,
        item.department,
        item.reimbursementType,
        item.expenseDate,
        item.submittedDate,
        item.amount,
        item.approvedAmount || 0,
        item.paidAmount || 0,
        item.paymentMode,
        item.status,
        item.approver || "",
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text = String(
              value ?? ""
            ).replace(/"/g, '""');

            return `"${text}"`;
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
    link.download = `reimbursement-claims-${getTodayDate()}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =======================================================
     PAGINATION
  ======================================================= */

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

  const pageStart =
    filteredClaims.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const pageEnd = Math.min(
    safeCurrentPage * ITEMS_PER_PAGE,
    filteredClaims.length
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="reimbursements-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="reimbursements-page-header">

        <div className="reimbursements-page-title">

          <div className="reimbursements-title-icon">
            <BsReceipt />
          </div>

          <div>
            <h1>Reimbursement Management</h1>

            <p>
              Manage employee expense claims,
              approvals and payments
            </p>
          </div>

        </div>

        <button
          type="button"
          className="reimbursements-add-btn"
          onClick={() => {
            setEditingReimbursement(null);
            setShowApplyModal(true);
          }}
        >
          <BsPlusLg />
          <span>Apply Reimbursement</span>
        </button>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <ReimbursementSummary
        summary={summary}
      />

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <ReimbursementToolbar
        search={search}
        setSearch={updateFilter(setSearch)}

        department={department}
        setDepartment={updateFilter(
          setDepartment
        )}

        reimbursementType={
          reimbursementType
        }
        setReimbursementType={updateFilter(
          setReimbursementType
        )}

        status={status}
        setStatus={updateFilter(setStatus)}

        fromDate={fromDate}
        setFromDate={updateFilter(setFromDate)}

        toDate={toDate}
        setToDate={updateFilter(setToDate)}

        onReset={handleReset}
        onExport={handleExport}
      />

      {/* =================================================
          CONTENT CARD
      ================================================= */}

      <div className="reimbursements-content-card">

        <div className="reimbursements-content-header">

          <div>
            <h2>Reimbursement Claims</h2>

            <p>
              {filteredClaims.length} claim
              {filteredClaims.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

          <div className="reimbursements-content-status">
            <BsCheckCircle />
            <span>
              {summary.pendingClaims} pending
              approval
            </span>
          </div>

        </div>

        <ReimbursementTable
          data={paginatedClaims}
          onView={handleView}
          onEdit={handleEdit}
          onApprove={handleApprove}
          onReject={handleReject}
          onMarkPaid={handleMarkPaid}
          onDelete={handleDelete}
        />

        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredClaims.length > 0 && (
          <div className="reimbursements-pagination">

            <div className="reimbursements-pagination-info">
              Showing{" "}
              <strong>{pageStart}</strong>{" "}
              to{" "}
              <strong>{pageEnd}</strong>{" "}
              of{" "}
              <strong>
                {filteredClaims.length}
              </strong>{" "}
              claims
            </div>

            <div className="reimbursements-pagination-controls">

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

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .slice(
                  Math.max(
                    0,
                    safeCurrentPage - 3
                  ),
                  Math.min(
                    totalPages,
                    safeCurrentPage + 2
                  )
                )
                .map((page) => (
                  <button
                    key={page}
                    type="button"
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
                onClick={handleNextPage}
              >
                Next
              </button>

            </div>

          </div>
        )}

      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      <ReimbursementDetails
        reimbursement={
          showDetails
            ? selectedReimbursement
            : null
        }
        onClose={handleCloseDetails}
        onApprove={handleApprove}
        onReject={handleReject}
        onMarkPaid={handleMarkPaid}
      />

      {/* =================================================
          APPLY / EDIT MODAL
      ================================================= */}

      <ApplyReimbursement
        isOpen={showApplyModal}
        reimbursement={
          editingReimbursement
        }
        onClose={handleCloseApply}
        onSubmit={
          handleSubmitReimbursement
        }
      />

    </div>
  );
};

export default Reimbursements;