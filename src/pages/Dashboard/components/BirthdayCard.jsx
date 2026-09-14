import React from "react";
import {
  BsCake2Fill,
  BsArrowRight,
} from "react-icons/bs";

import "./BirthdayCard.css";

function BirthdayCard() {
  const birthdays = [
    {
      id: 1,
      name: "Priya Singh",
      designation: "HR Executive",
      date: "Today",
      initials: "PS",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      designation: "Software Engineer",
      date: "Tomorrow",
      initials: "RS",
    },
    {
      id: 3,
      name: "Neha Gupta",
      designation: "Marketing Executive",
      date: "18 Sep",
      initials: "NG",
    },
  ];

  return (
    <div className="birthday-card">

      <div className="birthday-header">

        <div className="birthday-title">

          <div className="birthday-icon">
            <BsCake2Fill />
          </div>

          <div>
            <h3>Birthdays</h3>
            <p>Upcoming employee birthdays</p>
          </div>

        </div>

        <button className="birthday-view-btn">
          View All
          <BsArrowRight />
        </button>

      </div>

      <div className="birthday-list">

        {birthdays.map((employee) => (

          <div
            className="birthday-item"
            key={employee.id}
          >

            <div className="birthday-avatar">
              {employee.initials}
            </div>

            <div className="birthday-info">

              <h4>{employee.name}</h4>

              <p>{employee.designation}</p>

            </div>

            <div
              className={`birthday-date ${
                employee.date === "Today"
                  ? "today"
                  : ""
              }`}
            >
              {employee.date}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default BirthdayCard;