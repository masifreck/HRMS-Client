import React, { useMemo } from "react";
import {
  BsPeopleFill,
  BsCashStack,
  BsGraphDownArrow,
  BsWallet2,
  BsHourglassSplit,
} from "react-icons/bs";

import "./PayrollSummary.css";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

const PayrollSummary = ({ data = [] }) => {
  const summary = useMemo(() => {
    const totalEmployees = data.length;

    const processedEmployees = data.filter(
      (item) => item.status === "Processed"
    ).length;

    const pendingEmployees = data.filter(
      (item) => item.status === "Pending"
    ).length;

    const grossPayroll = data.reduce(
      (total, item) => total + Number(item.grossSalary || 0),
      0
    );

    const totalDeductions = data.reduce(
      (total, item) => total + Number(item.totalDeductions || 0),
      0
    );

    const netPayroll = data.reduce(
      (total, item) => total + Number(item.netSalary || 0),
      0
    );

    return {
      totalEmployees,
      processedEmployees,
      pendingEmployees,
      grossPayroll,
      totalDeductions,
      netPayroll,
    };
  }, [data]);

  const cards = [
    {
      title: "Total Employees",
      value: summary.totalEmployees,
      subtitle: `${summary.processedEmployees} processed`,
      icon: BsPeopleFill,
      type: "employees",
    },
    {
      title: "Gross Payroll",
      value: formatCurrency(summary.grossPayroll),
      subtitle: "Total gross salary",
      icon: BsCashStack,
      type: "gross",
    },
    {
      title: "Total Deductions",
      value: formatCurrency(summary.totalDeductions),
      subtitle: "PF, tax, loan & others",
      icon: BsGraphDownArrow,
      type: "deductions",
    },
    {
      title: "Net Payroll",
      value: formatCurrency(summary.netPayroll),
      subtitle: "Total payable salary",
      icon: BsWallet2,
      type: "net",
    },
    {
      title: "Pending Payroll",
      value: summary.pendingEmployees,
      subtitle:
        summary.pendingEmployees === 1
          ? "Employee pending"
          : "Employees pending",
      icon: BsHourglassSplit,
      type: "pending",
    },
  ];

  return (
    <div className="payroll-summary">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className={`payroll-summary-card payroll-summary-${card.type}`}
            key={card.title}
          >
            <div className="payroll-summary-card-top">
              <div className="payroll-summary-icon">
                <Icon />
              </div>

              {card.type === "pending" && summary.pendingEmployees > 0 && (
                <span className="payroll-summary-alert">
                  Action Required
                </span>
              )}
            </div>

            <div className="payroll-summary-content">
              <p className="payroll-summary-label">{card.title}</p>

              <h3 className="payroll-summary-value">
                {card.value}
              </h3>

              <p className="payroll-summary-subtitle">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PayrollSummary;