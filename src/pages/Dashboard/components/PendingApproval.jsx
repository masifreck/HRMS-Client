import React from "react";
import {
  BsClockHistory,
  BsArrowRight,
  BsCalendar2Check,
  BsPersonCheck,
  BsCashCoin,
  BsReceipt,
} from "react-icons/bs";

import "./PendingApproval.css";

function PendingApproval() {
  const approvals = [
    {
      id: 1,
      title: "Leave Requests",
      description: "Employees waiting for leave approval",
      count: 6,
      icon: BsCalendar2Check,
      type: "leave",
    },
    {
      id: 2,
      title: "Attendance Regularization",
      description: "Attendance corrections awaiting review",
      count: 4,
      icon: BsPersonCheck,
      type: "attendance",
    },
    {
      id: 3,
      title: "Loan Requests",
      description: "Employee loan requests pending approval",
      count: 2,
      icon: BsCashCoin,
      type: "loan",
    },
    {
      id: 4,
      title: "Expense Claims",
      description: "Reimbursement claims awaiting approval",
      count: 8,
      icon: BsReceipt,
      type: "expense",
    },
  ];

  return (
    <div className="pending-card">

      <div className="pending-header">

        <div className="pending-title">

          <div className="pending-title-icon">
            <BsClockHistory />
          </div>

          <div>
            <h3>Pending Approvals</h3>

            <p>
              Items requiring your attention
            </p>
          </div>

        </div>

        <span className="pending-total">
          20 Pending
        </span>

      </div>

      <div className="approval-list">

        {approvals.map((item) => {

          const Icon = item.icon;

          return (
            <div
              className="approval-item"
              key={item.id}
            >

              <div className={`approval-icon ${item.type}`}>
                <Icon />
              </div>

              <div className="approval-info">

                <h4>{item.title}</h4>

                <p>{item.description}</p>

              </div>

              <div className="approval-action">

                <span>
                  {item.count}
                </span>

                <BsArrowRight />

              </div>s

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default PendingApproval;