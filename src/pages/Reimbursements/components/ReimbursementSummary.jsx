import React from "react";
import {
  BsReceipt,
  BsHourglassSplit,
  BsCheckCircle,
  BsXCircle,
  BsWallet2,
} from "react-icons/bs";

import "./ReimbursementSummary.css";

const ReimbursementSummary = ({
  summary = {},
}) => {
  const {
    totalClaims = 0,
    pendingClaims = 0,
    rejectedClaims = 0,
    approvedAmount = 0,
    paidAmount = 0,
  } = summary;

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const summaryCards = [
    {
      id: "total",
      title: "Total Claims",
      value: totalClaims,
      description: "All reimbursement claims",
      icon: BsReceipt,
      className: "total",
    },
    {
      id: "pending",
      title: "Pending Claims",
      value: pendingClaims,
      description: "Awaiting approval",
      icon: BsHourglassSplit,
      className: "pending",
    },
    {
      id: "approved",
      title: "Approved Amount",
      value: formatCurrency(approvedAmount),
      description: "Total approved value",
      icon: BsCheckCircle,
      className: "approved",
    },
    {
      id: "rejected",
      title: "Rejected Claims",
      value: rejectedClaims,
      description: "Claims not approved",
      icon: BsXCircle,
      className: "rejected",
    },
    {
      id: "paid",
      title: "Paid Amount",
      value: formatCurrency(paidAmount),
      description: "Total amount paid",
      icon: BsWallet2,
      className: "paid",
    },
  ];

  return (
    <div className="reimbursement-summary">

      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className={`reimbursement-summary-card ${card.className}`}
            key={card.id}
          >
            <div className="reimbursement-summary-card-top">

              <div className="reimbursement-summary-icon">
                <Icon />
              </div>

              <span className="reimbursement-summary-label">
                {card.title}
              </span>

            </div>

            <div className="reimbursement-summary-value">
              {card.value}
            </div>

            <div className="reimbursement-summary-description">
              {card.description}
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default ReimbursementSummary;