import React from "react";
import {
  BsX,
  BsPerson,
  BsReceipt,
  BsCalendar3,
  BsCashStack,
  BsCreditCard,
  BsFileEarmarkText,
  BsPaperclip,
  BsCheckCircleFill,
  BsXCircleFill,
  BsClockFill,
  BsBuilding,
  BsShieldCheck,
} from "react-icons/bs";

import "./ReimbursementDetails.css";

const ReimbursementDetails = ({
  reimbursement,
  onClose,
  onApprove,
  onReject,
  onMarkPaid,
}) => {
  if (!reimbursement) {
    return null;
  }

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

  const formatDateTime = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "details-status-pending";

      case "Approved":
        return "details-status-approved";

      case "Rejected":
        return "details-status-rejected";

      case "Paid":
        return "details-status-paid";

      default:
        return "";
    }
  };

  const getTimelineIcon = (status) => {
    switch (status) {
      case "Submitted":
        return <BsClockFill />;

      case "Approved":
        return <BsCheckCircleFill />;

      case "Rejected":
        return <BsXCircleFill />;

      case "Paid":
        return <BsCashStack />;

      default:
        return <BsClockFill />;
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

  return (
    <div
      className="reimbursement-details-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="reimbursement-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reimbursement-details-title"
      >

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="reimbursement-details-header">

          <div className="reimbursement-details-header-left">

            <div className="reimbursement-details-header-icon">
              <BsReceipt />
            </div>

            <div>
              <h2 id="reimbursement-details-title">
                Reimbursement Details
              </h2>

              <p>
                {reimbursement.claimId}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="reimbursement-details-close"
            onClick={onClose}
            aria-label="Close"
          >
            <BsX />
          </button>

        </div>

        {/* =================================================
            STATUS BAR
        ================================================= */}
        <div className="reimbursement-details-status-bar">

          <div>
            <span className="details-status-label">
              Current Status
            </span>

            <span
              className={`reimbursement-details-status ${getStatusClass(
                reimbursement.status
              )}`}
            >
              <span className="details-status-dot" />
              {reimbursement.status}
            </span>
          </div>

          <div className="reimbursement-details-status-date">
            Submitted on{" "}
            <strong>
              {formatDate(reimbursement.submittedDate)}
            </strong>
          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}
        <div className="reimbursement-details-content">

          {/* =================================================
              EMPLOYEE INFORMATION
          ================================================= */}
          <section className="reimbursement-details-section">

            <div className="reimbursement-details-section-title">
              <div className="details-section-icon">
                <BsPerson />
              </div>

              <div>
                <h3>Employee Information</h3>
                <span>Claim submitted by employee</span>
              </div>
            </div>

            <div className="reimbursement-employee-profile">

              <div className="details-profile-avatar">
                {getInitials(reimbursement.employeeName)}
              </div>

              <div className="details-profile-info">
                <h4>{reimbursement.employeeName}</h4>

                <span>
                  {reimbursement.employeeId}
                </span>
              </div>

            </div>

            <div className="reimbursement-details-grid">

              <div className="details-info-item">
                <span>
                  <BsBuilding />
                  Department
                </span>

                <strong>
                  {reimbursement.department || "-"}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  <BsShieldCheck />
                  Designation
                </span>

                <strong>
                  {reimbursement.designation || "-"}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  Approver
                </span>

                <strong>
                  {reimbursement.approver || "-"}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  Approver ID
                </span>

                <strong>
                  {reimbursement.approverId || "-"}
                </strong>
              </div>

            </div>

          </section>

          {/* =================================================
              EXPENSE INFORMATION
          ================================================= */}
          <section className="reimbursement-details-section">

            <div className="reimbursement-details-section-title">
              <div className="details-section-icon">
                <BsFileEarmarkText />
              </div>

              <div>
                <h3>Expense Information</h3>
                <span>Details of the reimbursement claim</span>
              </div>
            </div>

            <div className="reimbursement-details-grid">

              <div className="details-info-item">
                <span>
                  <BsReceipt />
                  Claim ID
                </span>

                <strong>
                  {reimbursement.claimId}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  Expense Type
                </span>

                <strong>
                  {reimbursement.reimbursementType}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  <BsCalendar3 />
                  Expense Date
                </span>

                <strong>
                  {formatDate(reimbursement.expenseDate)}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  <BsCalendar3 />
                  Submitted Date
                </span>

                <strong>
                  {formatDate(reimbursement.submittedDate)}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  <BsCreditCard />
                  Payment Mode
                </span>

                <strong>
                  {reimbursement.paymentMode || "-"}
                </strong>
              </div>

              <div className="details-info-item">
                <span>
                  Receipt
                </span>

                <strong>
                  {reimbursement.receiptAttached
                    ? "Attached"
                    : "Not Attached"}
                </strong>
              </div>

            </div>

            {/* Description */}
            <div className="details-description-box">

              <span>Description</span>

              <p>
                {reimbursement.description || "No description provided."}
              </p>

            </div>

            {/* Remarks */}
            {reimbursement.remarks && (
              <div className="details-description-box">

                <span>Remarks</span>

                <p>
                  {reimbursement.remarks}
                </p>

              </div>
            )}

            {/* Rejection Reason */}
            {reimbursement.status === "Rejected" &&
              reimbursement.rejectionReason && (
                <div className="details-rejection-box">

                  <div className="details-rejection-icon">
                    <BsXCircleFill />
                  </div>

                  <div>
                    <span>Rejection Reason</span>

                    <p>
                      {reimbursement.rejectionReason}
                    </p>
                  </div>

                </div>
              )}

          </section>

          {/* =================================================
              FINANCIAL BREAKDOWN
          ================================================= */}
          <section className="reimbursement-details-section">

            <div className="reimbursement-details-section-title">
              <div className="details-section-icon">
                <BsCashStack />
              </div>

              <div>
                <h3>Financial Breakdown</h3>
                <span>Claimed, approved and paid amounts</span>
              </div>
            </div>

            <div className="reimbursement-financial-grid">

              <div className="financial-card claimed">

                <span>Claimed Amount</span>

                <strong>
                  {formatCurrency(reimbursement.amount)}
                </strong>

              </div>

              <div className="financial-card approved">

                <span>Approved Amount</span>

                <strong>
                  {formatCurrency(
                    reimbursement.approvedAmount
                  )}
                </strong>

              </div>

              <div className="financial-card paid">

                <span>Paid Amount</span>

                <strong>
                  {formatCurrency(
                    reimbursement.paidAmount
                  )}
                </strong>

              </div>

              <div className="financial-card balance">

                <span>Pending Payment</span>

                <strong>
                  {formatCurrency(
                    Math.max(
                      Number(
                        reimbursement.approvedAmount || 0
                      ) -
                        Number(
                          reimbursement.paidAmount || 0
                        ),
                      0
                    )
                  )}
                </strong>

              </div>

            </div>

            <div className="reimbursement-total-row">

              <span>Net Payable</span>

              <strong>
                {formatCurrency(
                  reimbursement.approvedAmount ||
                    reimbursement.amount
                )}
              </strong>

            </div>

          </section>

          {/* =================================================
              RECEIPT
          ================================================= */}
          <section className="reimbursement-details-section">

            <div className="reimbursement-details-section-title">
              <div className="details-section-icon">
                <BsPaperclip />
              </div>

              <div>
                <h3>Supporting Document</h3>
                <span>Receipt or supporting expense document</span>
              </div>
            </div>

            {reimbursement.receiptAttached ? (
              <div className="reimbursement-receipt-card">

                <div className="receipt-file-icon">
                  <BsPaperclip />
                </div>

                <div className="receipt-file-info">
                  <strong>
                    {reimbursement.receiptName ||
                      "Supporting document"}
                  </strong>

                  <span>
                    Receipt attached to this claim
                  </span>
                </div>

                <button
                  type="button"
                  className="receipt-preview-btn"
                  onClick={() =>
                    alert(
                      "Receipt preview will be connected with the document API."
                    )
                  }
                >
                  <BsEyeIcon />
                  Preview
                </button>

              </div>
            ) : (
              <div className="reimbursement-no-receipt">
                No receipt or supporting document attached.
              </div>
            )}

          </section>

          {/* =================================================
              APPROVAL TIMELINE
          ================================================= */}
          <section className="reimbursement-details-section">

            <div className="reimbursement-details-section-title">
              <div className="details-section-icon">
                <BsClockFill />
              </div>

              <div>
                <h3>Approval Timeline</h3>
                <span>Claim processing history</span>
              </div>
            </div>

            <div className="reimbursement-timeline">

              {reimbursement.approvalTimeline?.map(
                (timeline, index) => (
                  <div
                    className="reimbursement-timeline-item"
                    key={`${timeline.status}-${index}`}
                  >

                    <div className="timeline-line-wrapper">

                      <div
                        className={`timeline-icon timeline-${timeline.status.toLowerCase()}`}
                      >
                        {getTimelineIcon(timeline.status)}
                      </div>

                      {index !==
                        reimbursement.approvalTimeline.length - 1 && (
                        <div className="timeline-line" />
                      )}

                    </div>

                    <div className="timeline-content">

                      <div className="timeline-top">

                        <strong>
                          {timeline.status}
                        </strong>

                        <span>
                          {timeline.date}
                        </span>

                      </div>

                      <span className="timeline-user">
                        {timeline.user}
                      </span>

                      {timeline.remarks && (
                        <p>
                          {timeline.remarks}
                        </p>
                      )}

                    </div>

                  </div>
                )
              )}

              {!reimbursement.approvalTimeline?.length && (
                <div className="timeline-empty">
                  No approval activity available.
                </div>
              )}

            </div>

          </section>

          {/* =================================================
              SYSTEM INFORMATION
          ================================================= */}
          <section className="reimbursement-system-info">

            <div>
              <span>Created On</span>
              <strong>
                {formatDateTime(reimbursement.createdOn)}
              </strong>
            </div>

            <div>
              <span>Approved On</span>
              <strong>
                {formatDateTime(reimbursement.approvedOn)}
              </strong>
            </div>

            <div>
              <span>Paid On</span>
              <strong>
                {formatDateTime(reimbursement.paidOn)}
              </strong>
            </div>

          </section>

        </div>

        {/* =================================================
            FOOTER ACTIONS
        ================================================= */}
        <div className="reimbursement-details-footer">

          <button
            type="button"
            className="details-footer-btn close"
            onClick={onClose}
          >
            Close
          </button>

          <div className="details-footer-right">

            {reimbursement.status === "Pending" && (
              <>
                <button
                  type="button"
                  className="details-footer-btn reject"
                  onClick={() => onReject?.(reimbursement)}
                >
                  <BsXCircleFill />
                  Reject
                </button>

                <button
                  type="button"
                  className="details-footer-btn approve"
                  onClick={() => onApprove?.(reimbursement)}
                >
                  <BsCheckCircleFill />
                  Approve
                </button>
              </>
            )}

            {reimbursement.status === "Approved" && (
              <button
                type="button"
                className="details-footer-btn paid"
                onClick={() => onMarkPaid?.(reimbursement)}
              >
                <BsCashStack />
                Mark as Paid
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

/*
  Small local icon wrapper.

  Keeping this here avoids adding another dependency.
*/
const BsEyeIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8s-3-5-8-5-8 5-8 5 3 5 8 5 8-5 8-5Zm-8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
};

export default ReimbursementDetails;