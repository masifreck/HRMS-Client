import React from "react";
import {
  BsEye,
  BsPencilSquare,
  BsCheckCircle,
  BsXCircle,
  BsCashStack,
  BsTrash,
  BsThreeDotsVertical,
  BsPaperclip,
} from "react-icons/bs";

import "./ReimbursementTable.css";

const ReimbursementTable = ({
  data = [],
  onView,
  onEdit,
  onApprove,
  onReject,
  onMarkPaid,
  onDelete,
}) => {
  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      case "Paid":
        return "status-paid";

      default:
        return "";
    }
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleAction = (callback, item) => {
    if (typeof callback === "function") {
      callback(item);
    }
  };

  if (!data.length) {
    return (
      <div className="reimbursement-table-card">

        <div className="reimbursement-table-empty">
          <div className="reimbursement-empty-icon">
            <BsCashStack />
          </div>

          <h3>No reimbursement claims found</h3>

          <p>
            No reimbursement records match the selected filters.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="reimbursement-table-card">

      {/* Desktop Table */}
      <div className="reimbursement-table-wrapper">
        <table className="reimbursement-table">

          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Expense Type</th>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Approver</th>
              <th className="reimbursement-actions-header">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>

                {/* Claim ID */}
                <td>
                  <div className="reimbursement-claim-cell">
                    <span className="reimbursement-claim-id">
                      {item.claimId}
                    </span>

                    {item.receiptAttached && (
                      <span
                        className="reimbursement-attachment"
                        title="Receipt attached"
                      >
                        <BsPaperclip />
                      </span>
                    )}
                  </div>
                </td>

                {/* Employee */}
                <td>
                  <div className="reimbursement-employee-cell">

                    <div className="reimbursement-avatar">
                      {getInitials(item.employeeName)}
                    </div>

                    <div className="reimbursement-employee-info">
                      <span className="reimbursement-employee-name">
                        {item.employeeName}
                      </span>

                      <span className="reimbursement-employee-id">
                        {item.employeeId}
                      </span>
                    </div>

                  </div>
                </td>

                {/* Department */}
                <td>
                  <span className="reimbursement-department">
                    {item.department}
                  </span>
                </td>

                {/* Expense Type */}
                <td>
                  <span className="reimbursement-expense-type">
                    {item.reimbursementType}
                  </span>
                </td>

                {/* Expense Date */}
                <td>
                  <span className="reimbursement-date">
                    {formatDate(item.expenseDate)}
                  </span>
                </td>

                {/* Amount */}
                <td>
                  <div className="reimbursement-amount-cell">
                    <span className="reimbursement-amount">
                      {formatCurrency(item.amount)}
                    </span>

                    {item.approvedAmount > 0 &&
                      item.approvedAmount !== item.amount && (
                        <span className="reimbursement-approved-small">
                          Approved: {formatCurrency(item.approvedAmount)}
                        </span>
                      )}
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`reimbursement-status ${getStatusClass(
                      item.status
                    )}`}
                  >
                    <span className="reimbursement-status-dot" />
                    {item.status}
                  </span>
                </td>

                {/* Approver */}
                <td>
                  <div className="reimbursement-approver">
                    {item.approver || "-"}
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="reimbursement-action-buttons">

                    {/* View */}
                    <button
                      type="button"
                      className="reimbursement-action-btn view"
                      title="View Details"
                      onClick={() =>
                        handleAction(onView, item)
                      }
                    >
                      <BsEye />
                    </button>

                    {/* Edit */}
                    {item.status === "Pending" && (
                      <button
                        type="button"
                        className="reimbursement-action-btn edit"
                        title="Edit Claim"
                        onClick={() =>
                          handleAction(onEdit, item)
                        }
                      >
                        <BsPencilSquare />
                      </button>
                    )}

                    {/* Approve */}
                    {item.status === "Pending" && (
                      <button
                        type="button"
                        className="reimbursement-action-btn approve"
                        title="Approve Claim"
                        onClick={() =>
                          handleAction(onApprove, item)
                        }
                      >
                        <BsCheckCircle />
                      </button>
                    )}

                    {/* Reject */}
                    {item.status === "Pending" && (
                      <button
                        type="button"
                        className="reimbursement-action-btn reject"
                        title="Reject Claim"
                        onClick={() =>
                          handleAction(onReject, item)
                        }
                      >
                        <BsXCircle />
                      </button>
                    )}

                    {/* Mark Paid */}
                    {item.status === "Approved" && (
                      <button
                        type="button"
                        className="reimbursement-action-btn paid"
                        title="Mark as Paid"
                        onClick={() =>
                          handleAction(onMarkPaid, item)
                        }
                      >
                        <BsCashStack />
                      </button>
                    )}

                    {/* Delete */}
                    {item.status !== "Paid" && (
                      <button
                        type="button"
                        className="reimbursement-action-btn delete"
                        title="Delete Claim"
                        onClick={() =>
                          handleAction(onDelete, item)
                        }
                      >
                        <BsTrash />
                      </button>
                    )}

                    {/* More indicator */}
                    <button
                      type="button"
                      className="reimbursement-action-btn more"
                      title="More Actions"
                    >
                      <BsThreeDotsVertical />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Mobile Cards */}
      <div className="reimbursement-mobile-list">

        {data.map((item) => (
          <div
            className="reimbursement-mobile-card"
            key={item.id}
          >

            {/* Mobile Header */}
            <div className="reimbursement-mobile-header">

              <div>
                <div className="reimbursement-mobile-claim">
                  {item.claimId}

                  {item.receiptAttached && (
                    <BsPaperclip className="mobile-attachment-icon" />
                  )}
                </div>

                <div className="reimbursement-mobile-date">
                  Submitted {formatDate(item.submittedDate)}
                </div>
              </div>

              <span
                className={`reimbursement-status ${getStatusClass(
                  item.status
                )}`}
              >
                <span className="reimbursement-status-dot" />
                {item.status}
              </span>

            </div>

            {/* Employee */}
            <div className="reimbursement-mobile-employee">

              <div className="reimbursement-avatar">
                {getInitials(item.employeeName)}
              </div>

              <div>
                <div className="reimbursement-employee-name">
                  {item.employeeName}
                </div>

                <div className="reimbursement-mobile-meta">
                  {item.employeeId} • {item.department}
                </div>
              </div>

            </div>

            {/* Information */}
            <div className="reimbursement-mobile-info-grid">

              <div>
                <span>Expense Type</span>
                <strong>{item.reimbursementType}</strong>
              </div>

              <div>
                <span>Expense Date</span>
                <strong>{formatDate(item.expenseDate)}</strong>
              </div>

              <div>
                <span>Claim Amount</span>
                <strong>
                  {formatCurrency(item.amount)}
                </strong>
              </div>

              <div>
                <span>Approver</span>
                <strong>{item.approver || "-"}</strong>
              </div>

            </div>

            {/* Mobile Actions */}
            <div className="reimbursement-mobile-actions">

              <button
                type="button"
                className="mobile-action view"
                onClick={() =>
                  handleAction(onView, item)
                }
              >
                <BsEye />
                View
              </button>

              {item.status === "Pending" && (
                <>
                  <button
                    type="button"
                    className="mobile-action edit"
                    onClick={() =>
                      handleAction(onEdit, item)
                    }
                  >
                    <BsPencilSquare />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="mobile-action approve"
                    onClick={() =>
                      handleAction(onApprove, item)
                    }
                  >
                    <BsCheckCircle />
                    Approve
                  </button>

                  <button
                    type="button"
                    className="mobile-action reject"
                    onClick={() =>
                      handleAction(onReject, item)
                    }
                  >
                    <BsXCircle />
                    Reject
                  </button>
                </>
              )}

              {item.status === "Approved" && (
                <button
                  type="button"
                  className="mobile-action paid"
                  onClick={() =>
                    handleAction(onMarkPaid, item)
                  }
                >
                  <BsCashStack />
                  Mark Paid
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ReimbursementTable;