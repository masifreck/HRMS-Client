import React from "react";
import {
  BsMegaphoneFill,
  BsArrowRight,
  BsInfoCircleFill,
} from "react-icons/bs";

import "./AnnouncementCard.css";

function AnnouncementCard() {
  const announcements = [
    {
      id: 1,
      title: "Monthly payroll processing",
      description:
        "Payroll processing will start from 25 September.",
      date: "Today",
      priority: "Important",
    },
    {
      id: 2,
      title: "Attendance policy updated",
      description:
        "Please review the latest attendance policy.",
      date: "Yesterday",
      priority: "Update",
    },
    {
      id: 3,
      title: "New HRMS features",
      description:
        "New employee management features are now available.",
      date: "10 Sep",
      priority: "New",
    },
  ];

  return (
    <div className="announcement-card">

      <div className="announcement-header">

        <div className="announcement-title">

          <div className="announcement-icon">
            <BsMegaphoneFill />
          </div>

          <div>
            <h3>Announcements</h3>
            <p>Latest company updates</p>
          </div>

        </div>

        <button className="announcement-view-btn">
          View All
          <BsArrowRight />
        </button>

      </div>

      <div className="announcement-list">

        {announcements.map((item) => (

          <div
            className="announcement-item"
            key={item.id}
          >

            <div className="announcement-small-icon">
              <BsInfoCircleFill />
            </div>

            <div className="announcement-info">

              <div className="announcement-name-row">

                <h4>{item.title}</h4>

                <span
                  className={`announcement-badge ${item.priority.toLowerCase()}`}
                >
                  {item.priority}
                </span>

              </div>

              <p>{item.description}</p>

              <span className="announcement-date">
                {item.date}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AnnouncementCard;