import React, { useEffect, useRef, useState } from "react";

import {
  BsJustify,
  BsSearch,
  BsBellFill,
  BsEnvelopeFill,
  BsPersonCircle,
  BsGearFill,
  BsBoxArrowRight,
  BsPerson,
  BsCheckCircleFill,
  BsCalendar2CheckFill,
  BsCashCoin,
  BsX,
  BsChevronDown,
} from "react-icons/bs";

import "./Header.css";

function Header({ toggleSidebar }) {

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        messageRef.current &&
        !messageRef.current.contains(event.target)
      ) {
        setMessageOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const handleNotificationClick = () => {

    setNotificationOpen((prev) => !prev);

    setMessageOpen(false);
    setProfileOpen(false);
  };

  const handleMessageClick = () => {

    setMessageOpen((prev) => !prev);

    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const handleProfileClick = () => {

    setProfileOpen((prev) => !prev);

    setNotificationOpen(false);
    setMessageOpen(false);
  };

  const notifications = [
    {
      id: 1,
      icon: BsCalendar2CheckFill,
      title: "Leave request pending",
      description: "Rahul Sharma requested leave.",
      time: "5 min ago",
      type: "leave",
    },
    {
      id: 2,
      icon: BsCheckCircleFill,
      title: "Attendance approved",
      description: "Attendance regularization approved.",
      time: "20 min ago",
      type: "success",
    },
    {
      id: 3,
      icon: BsCashCoin,
      title: "Payroll completed",
      description: "September payroll has been processed.",
      time: "1 hour ago",
      type: "payroll",
    },
  ];

  const messages = [
    {
      id: 1,
      initials: "RS",
      name: "Rahul Sharma",
      message: "Please check my leave request.",
      time: "10 min ago",
    },
    {
      id: 2,
      initials: "PS",
      name: "Priya Singh",
      message: "Document has been uploaded.",
      time: "35 min ago",
    },
    {
      id: 3,
      initials: "AK",
      name: "Arjun Kumar",
      message: "Need help with attendance.",
      time: "1 hour ago",
    },
  ];

  return (
    <header className="header">

      {/* LEFT SECTION */}
      <div className="header-left-section">

        <button
          type="button"
          className="header-menu-button"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <BsJustify />
        </button>

        {/* DESKTOP SEARCH */}
        <div className="header-search">

          <BsSearch className="header-search-icon" />

          <input
            type="text"
            placeholder="Search employees, reports..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>

        {/* MOBILE SEARCH BUTTON */}
        <button
          type="button"
          className="mobile-search-button"
          onClick={() => setSearchOpen(true)}
          title="Search"
        >
          <BsSearch />
        </button>

      </div>


      {/* RIGHT SECTION */}
      <div className="header-right-section">

        {/* NOTIFICATIONS */}
        <div
          className="header-dropdown-wrapper"
          ref={notificationRef}
        >

          <button
            type="button"
            className={`header-icon-button ${
              notificationOpen ? "active" : ""
            }`}
            onClick={handleNotificationClick}
            title="Notifications"
          >

            <BsBellFill />

            <span className="notification-badge">
              3
            </span>

          </button>


          {notificationOpen && (

            <div className="header-dropdown notification-dropdown">

              <div className="dropdown-header">

                <div>
                  <h3>Notifications</h3>
                  <p>You have 3 unread notifications</p>
                </div>

                <button>
                  Mark all read
                </button>

              </div>


              <div className="notification-list">

                {notifications.map((notification) => {

                  const Icon = notification.icon;

                  return (

                    <div
                      className="notification-item"
                      key={notification.id}
                    >

                      <div
                        className={`notification-icon ${notification.type}`}
                      >
                        <Icon />
                      </div>

                      <div className="notification-content">

                        <h4>
                          {notification.title}
                        </h4>

                        <p>
                          {notification.description}
                        </p>

                        <span>
                          {notification.time}
                        </span>

                      </div>

                    </div>

                  );

                })}

              </div>


              <div className="dropdown-footer">
                <button>
                  View all notifications
                </button>
              </div>

            </div>

          )}

        </div>


        {/* MESSAGES */}
        <div
          className="header-dropdown-wrapper"
          ref={messageRef}
        >

          <button
            type="button"
            className={`header-icon-button ${
              messageOpen ? "active" : ""
            }`}
            onClick={handleMessageClick}
            title="Messages"
          >

            <BsEnvelopeFill />

            <span className="message-badge">
              3
            </span>

          </button>


          {messageOpen && (

            <div className="header-dropdown message-dropdown">

              <div className="dropdown-header">

                <div>
                  <h3>Messages</h3>
                  <p>Recent employee messages</p>
                </div>

                <button>
                  View all
                </button>

              </div>


              <div className="message-list">

                {messages.map((message) => (

                  <div
                    className="message-item"
                    key={message.id}
                  >

                    <div className="message-avatar">
                      {message.initials}
                    </div>

                    <div className="message-content">

                      <div className="message-top">

                        <h4>
                          {message.name}
                        </h4>

                        <span>
                          {message.time}
                        </span>

                      </div>

                      <p>
                        {message.message}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              <div className="dropdown-footer">

                <button>
                  Open messages
                </button>

              </div>

            </div>

          )}

        </div>


        {/* PROFILE */}
        <div
          className="header-profile-wrapper"
          ref={profileRef}
        >

          <button
            type="button"
            className={`header-profile-button ${
              profileOpen ? "active" : ""
            }`}
            onClick={handleProfileClick}
          >

            <img
              src="https://ui-avatars.com/api/?name=Mohd+Asif&background=2563eb&color=fff"
              alt="Mohd Asif"
            />

            <div className="header-profile-info">

              <strong>
                Mohd Asif
              </strong>

              <span>
                Administrator
              </span>

            </div>

            <BsChevronDown className="profile-chevron" />

          </button>


          {profileOpen && (

            <div className="profile-dropdown">

              <div className="profile-dropdown-header">

                <img
                  src="https://ui-avatars.com/api/?name=Mohd+Asif&background=2563eb&color=fff"
                  alt="Mohd Asif"
                />

                <div>
                  <h4>
                    Mohd Asif
                  </h4>

                  <p>
                    Administrator
                  </p>
                </div>

              </div>


              <div className="profile-menu">

                <button type="button">
                  <BsPerson />
                  <span>My Profile</span>
                </button>

                <button type="button">
                  <BsGearFill />
                  <span>Settings</span>
                </button>

              </div>


              <div className="profile-logout">

                <button type="button">
                  <BsBoxArrowRight />
                  <span>
                    Logout
                  </span>
                </button>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* MOBILE SEARCH OVERLAY */}

      {searchOpen && (

        <div className="mobile-search-overlay">

          <div className="mobile-search-container">

            <BsSearch />

            <input
              autoFocus
              type="text"
              placeholder="Search employees, reports..."
            />

            <button
              type="button"
              onClick={() => setSearchOpen(false)}
            >
              <BsX />
            </button>

          </div>

        </div>

      )}

    </header>
  );
}

export default Header;