import React from "react";
import {
  BsCalendarEventFill,
  BsArrowRight,
} from "react-icons/bs";

import "./HolidayCard.css";

function HolidayCard() {
  const holidays = [
    {
      id: 1,
      day: "17",
      month: "SEP",
      name: "Vishwakarma Puja",
      dayName: "Thursday",
      type: "Holiday",
    },
    {
      id: 2,
      day: "02",
      month: "OCT",
      name: "Gandhi Jayanti",
      dayName: "Friday",
      type: "National Holiday",
    },
    {
      id: 3,
      day: "20",
      month: "OCT",
      name: "Dussehra",
      dayName: "Tuesday",
      type: "Holiday",
    },
  ];

  return (
    <div className="holiday-card">

      <div className="holiday-header">

        <div className="holiday-title">

          <div className="holiday-icon">
            <BsCalendarEventFill />
          </div>

          <div>
            <h3>Upcoming Holidays</h3>
            <p>Next company holidays</p>
          </div>

        </div>

        <button className="holiday-view-btn">
          View All
          <BsArrowRight />
        </button>

      </div>

      <div className="holiday-list">

        {holidays.map((holiday) => (

          <div
            className="holiday-item"
            key={holiday.id}
          >

            <div className="holiday-date-box">

              <strong>{holiday.day}</strong>

              <span>{holiday.month}</span>

            </div>

            <div className="holiday-info">

              <h4>{holiday.name}</h4>

              <p>
                {holiday.dayName} • {holiday.type}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default HolidayCard;