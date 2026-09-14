import React from "react";
import { NavLink } from "react-router-dom";

import {
  BsLightningChargeFill,
  BsPersonPlusFill,
  BsCalendarPlus,
  BsCashStack,
  BsFileBarGraphFill,
} from "react-icons/bs";

import "./QuickActions.css";

function QuickActions() {
  const actions = [
    {
      title: "Add Employee",
      description: "Create a new employee",
      icon: BsPersonPlusFill,
      path: "/employees/add",
      type: "employee",
    },
    {
      title: "Apply Leave",
      description: "Create leave request",
      icon: BsCalendarPlus,
      path: "/leave",
      type: "leave",
    },
    {
      title: "Run Payroll",
      description: "Process monthly payroll",
      icon: BsCashStack,
      path: "/payroll",
      type: "payroll",
    },
    {
      title: "Generate Report",
      description: "View HR reports",
      icon: BsFileBarGraphFill,
      path: "/reports",
      type: "report",
    },
  ];

  return (
    <div className="quick-actions-card">

      <div className="quick-actions-header">

        <div className="quick-actions-title">

          <div className="quick-actions-icon">
            <BsLightningChargeFill />
          </div>

          <div>
            <h3>Quick Actions</h3>
            <p>Frequently used HRMS actions</p>
          </div>

        </div>

      </div>

      <div className="quick-actions-grid">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <NavLink
              key={action.title}
              to={action.path}
              className="quick-action-item"
            >

              <div
                className={`quick-action-icon ${action.type}`}
              >
                <Icon />
              </div>

              <div className="quick-action-info">

                <h4>{action.title}</h4>

                <p>{action.description}</p>

              </div>

            </NavLink>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;