import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  BsArrowLeft,
  BsPersonCircle,
  BsCalendar3,
  BsClock,
  BsCheckCircleFill,
  BsXCircleFill,
  BsInfoCircleFill,
  BsBriefcaseFill,
  BsEnvelopeFill,
  BsTelephoneFill,
  BsShieldCheck,
  BsCheckLg,
  BsXLg,
} from "react-icons/bs";

import leaveData from "./LeaveData";

import "./LeaveDetails.css";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leaveStatus, setLeaveStatus] = useState(null);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const leaveRequest = leaveData.find(
    (item) => String(item.id) === String(id)
  );

  if (!leaveRequest) {
    return (
      <div className="leave-details-page">

        <div className="leave-details-not-found">

          <BsInfoCircleFill />

          <h2>Leave Request Not Found</h2>

          <p>
            The leave request you are looking for
            does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/leave")}
          >
            <BsArrowLeft />
            Back to Leave
          </button>

        </div>

      </div>
    );
  }

  const currentStatus =
    leaveStatus || leaveRequest.status;

  const handleApprove = () => {
    setLeaveStatus("Approved");
    setShowRejectBox(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    setLeaveStatus("Rejected");
    setShowRejectBox(false);
  };

  const getStatusClass = () => {
    switch (currentStatus) {
      case "Approved":
        return "approved";

      case "Rejected":
        return "rejected";

      case "Pending":
        return "pending";

      default:
        return "";
    }
  };

  return (
    <div className="leave-details-page">

      {/* ================= HEADER ================= */}

      <div className="leave-details-header">

        <div className="leave-details-header-left">

          <button
            type="button"
            className="leave-details-back"
            onClick={() => navigate("/leave")}
          >
            <BsArrowLeft />
          </button>

          <div>
            <h1>Leave Request Details</h1>

            <p>
              Review employee leave application
            </p>
          </div>

        </div>

        <span
          className={`leave-details-header-status ${getStatusClass()}`}
        >
          <span />
          {currentStatus}
        </span>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="leave-details-layout">

        {/* ================= LEFT ================= */}

        <div className="leave-details-main">

          {/* Employee */}

          <section className="leave-details-card">

            <div className="leave-details-card-header">

              <div>
                <h3>Employee Information</h3>
                <p>Employee details</p>
              </div>

            </div>

            <div className="leave-employee-profile">

              <div className="leave-details-avatar">
                {leaveRequest.initials}
              </div>

              <div className="leave-details-employee-info">

                <h2>
                  {leaveRequest.employeeName}
                </h2>

                <span>
                  {leaveRequest.employeeId}
                </span>

                <div className="leave-employee-tags">

                  <span>
                    <BsBriefcaseFill />
                    {leaveRequest.department}
                  </span>

                  <span>
                    <BsShieldCheck />
                    Active Employee
                  </span>

                </div>

              </div>

            </div>

            <div className="leave-contact-grid">

              <div className="leave-contact-item">

                <div className="leave-contact-icon">
                  <BsEnvelopeFill />
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {leaveRequest.employeeId
                      .toLowerCase()
                      .replace("-", ".")}@company.com
                  </strong>
                </div>

              </div>

              <div className="leave-contact-item">

                <div className="leave-contact-icon">
                  <BsTelephoneFill />
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    +91 98XX XXX 245
                  </strong>
                </div>

              </div>

            </div>

          </section>

          {/* Leave Information */}

          <section className="leave-details-card">

            <div className="leave-details-card-header">

              <div>
                <h3>Leave Information</h3>
                <p>
                  Details of the requested leave
                </p>
              </div>

            </div>

            <div className="leave-info-grid">

              <div className="leave-info-item">

                <span>Leave Type</span>

                <strong>
                  {leaveRequest.leaveType}
                </strong>

              </div>

              <div className="leave-info-item">

                <span>Duration</span>

                <strong>
                  {leaveRequest.days}{" "}
                  {leaveRequest.days === 1
                    ? "Day"
                    : "Days"}
                </strong>

              </div>

              <div className="leave-info-item">

                <span>From Date</span>

                <strong>
                  {leaveRequest.fromDate}
                </strong>

              </div>

              <div className="leave-info-item">

                <span>To Date</span>

                <strong>
                  {leaveRequest.toDate}
                </strong>

              </div>

              <div className="leave-info-item">

                <span>Applied On</span>

                <strong>
                  {leaveRequest.appliedOn}
                </strong>

              </div>

              <div className="leave-info-item">

                <span>Current Status</span>

                <strong
                  className={`leave-info-status ${getStatusClass()}`}
                >
                  {currentStatus}
                </strong>

              </div>

            </div>

            <div className="leave-reason-section">

              <span>Reason for Leave</span>

              <div className="leave-reason-box">
                <BsInfoCircleFill />

                <p>
                  {leaveRequest.reason}
                </p>

              </div>

            </div>

          </section>

          {/* Leave Balance */}

          <section className="leave-details-card">

            <div className="leave-details-card-header">

              <div>
                <h3>Leave Balance</h3>
                <p>
                  Employee leave balance for current year
                </p>
              </div>

            </div>

            <div className="leave-balance-grid">

              <div className="leave-balance-item">

                <span>Casual Leave</span>

                <strong>7 / 12</strong>

                <div className="leave-balance-bar">
                  <div
                    style={{
                      width: "58%",
                    }}
                  />
                </div>

                <small>
                  7 days remaining
                </small>

              </div>

              <div className="leave-balance-item">

                <span>Sick Leave</span>

                <strong>8 / 10</strong>

                <div className="leave-balance-bar">
                  <div
                    style={{
                      width: "80%",
                    }}
                  />
                </div>

                <small>
                  8 days remaining
                </small>

              </div>

              <div className="leave-balance-item">

                <span>Earned Leave</span>

                <strong>14 / 18</strong>

                <div className="leave-balance-bar">
                  <div
                    style={{
                      width: "78%",
                    }}
                  />
                </div>

                <small>
                  14 days remaining
                </small>

              </div>

            </div>

          </section>

        </div>

        {/* ================= RIGHT ================= */}

        <aside className="leave-details-sidebar">

          {/* Action Card */}

          <section className="leave-action-card">

            <div className="leave-action-header">

              <div className="leave-action-icon">
                <BsCalendar3 />
              </div>

              <div>
                <h3>Request Action</h3>
                <p>
                  Review this application
                </p>
              </div>

            </div>

            {currentStatus === "Pending" ? (

              <>

                <button
                  type="button"
                  className="leave-approve-button"
                  onClick={handleApprove}
                >
                  <BsCheckLg />
                  Approve Leave
                </button>

                <button
                  type="button"
                  className="leave-reject-button"
                  onClick={() =>
                    setShowRejectBox(
                      (value) => !value
                    )
                  }
                >
                  <BsXLg />
                  Reject Leave
                </button>

                {showRejectBox && (
                  <div className="leave-rejection-box">

                    <label>
                      Rejection Reason
                    </label>

                    <textarea
                      value={rejectionReason}
                      onChange={(event) =>
                        setRejectionReason(
                          event.target.value
                        )
                      }
                      placeholder="Enter reason for rejecting this request..."
                      rows={4}
                    />

                    <button
                      type="button"
                      className="confirm-reject-button"
                      onClick={handleReject}
                    >
                      Confirm Rejection
                    </button>

                  </div>
                )}

              </>

            ) : (

              <div
                className={`leave-action-completed ${getStatusClass()}`}
              >

                {currentStatus === "Approved" ? (
                  <BsCheckCircleFill />
                ) : (
                  <BsXCircleFill />
                )}

                <strong>
                  Request {currentStatus}
                </strong>

                <span>
                  This request has already been processed.
                </span>

              </div>

            )}

          </section>

          {/* Timeline */}

          <section className="leave-timeline-card">

            <div className="leave-details-card-header">

              <div>
                <h3>Application Timeline</h3>
                <p>Request activity</p>
              </div>

            </div>

            <div className="leave-timeline">

              <div className="timeline-item completed">

                <div className="timeline-icon">
                  <BsCalendar3 />
                </div>

                <div>
                  <strong>
                    Leave Applied
                  </strong>

                  <span>
                    {leaveRequest.appliedOn}
                  </span>
                </div>

              </div>

              <div className="timeline-line" />

              <div
                className={`timeline-item ${
                  currentStatus !== "Pending"
                    ? "completed"
                    : "current"
                }`}
              >

                <div className="timeline-icon">
                  <BsClock />
                </div>

                <div>
                  <strong>
                    Review
                  </strong>

                  <span>
                    {currentStatus === "Pending"
                      ? "Awaiting approval"
                      : "Request reviewed"}
                  </span>
                </div>

              </div>

              <div className="timeline-line" />

              <div
                className={`timeline-item ${
                  currentStatus === "Approved" ||
                  currentStatus === "Rejected"
                    ? "completed"
                    : ""
                }`}
              >

                <div className="timeline-icon">
                  {currentStatus === "Rejected" ? (
                    <BsXCircleFill />
                  ) : (
                    <BsCheckCircleFill />
                  )}
                </div>

                <div>
                  <strong>
                    {currentStatus === "Rejected"
                      ? "Rejected"
                      : "Decision"}
                  </strong>

                  <span>
                    {currentStatus === "Approved"
                      ? "Leave approved"
                      : currentStatus === "Rejected"
                        ? "Leave rejected"
                        : "Waiting for decision"}
                  </span>
                </div>

              </div>

            </div>

          </section>

        </aside>

      </div>

    </div>
  );
};

export default LeaveDetails;