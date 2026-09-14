import React from "react";

import {
  BsCalendarCheckFill,
  BsClockFill,
  BsCheckCircleFill,
  BsXCircleFill,
  BsCalendar2XFill,
} from "react-icons/bs";

import "./LeaveSummary.css";

const LeaveSummary = ({
  totalRequests,
  pending,
  approved,
  rejected,
  totalDays,
}) => {
  const cards = [
    {
      title: "Total Requests",
      value: totalRequests,
      subtitle: "This month",
      icon: BsCalendarCheckFill,
      type: "total",
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Awaiting approval",
      icon: BsClockFill,
      type: "pending",
    },
    {
      title: "Approved",
      value: approved,
      subtitle: "Approved requests",
      icon: BsCheckCircleFill,
      type: "approved",
    },
    {
      title: "Rejected",
      value: rejected,
      subtitle: "Rejected requests",
      icon: BsXCircleFill,
      type: "rejected",
    },
    {
      title: "Leave Days",
      value: totalDays,
      subtitle: "Total requested days",
      icon: BsCalendar2XFill,
      type: "days",
    },
  ];

  return (
    <div className="leave-summary-grid">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            className="leave-summary-card"
            key={card.title}
          >

            <div
              className={`leave-summary-icon ${card.type}`}
            >
              <Icon />
            </div>

            <div className="leave-summary-content">

              <span>{card.title}</span>

              <strong>{card.value}</strong>

              <small>{card.subtitle}</small>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default LeaveSummary;