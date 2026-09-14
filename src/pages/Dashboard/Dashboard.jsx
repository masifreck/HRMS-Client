import React, { useState } from "react";

import "./Dashboard.css";

import DashboardToolbar from "./components/DashboardToolbar";
import WelcomeCard from "./components/WelcomeCard";
import StatCard from "./components/StatCard";
import AttendanceChart from "./components/AttendanceChart";
import DepartmentChart from "./components/DepartmentChart";
import PendingApproval from "./components/PendingApproval";
import RecentEmployees from "./components/RecentEmployees";
import BirthdayCard from "./components/BirthdayCard";
import HolidayCard from "./components/HolidayCard";
import AnnouncementCard from "./components/AnnouncementCard";
import QuickActions from "./components/QuickActions";

import {
  BsPeopleFill,
  BsCalendarCheck,
  BsCalendar2CheckFill,
  BsCashStack,
} from "react-icons/bs";

import {
  dashboardStats,
} from "./components/DashboardData";

function Dashboard() {

  const [dateRange, setDateRange] =
    useState("This Month");

  const [refreshing, setRefreshing] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState("Just now");


  // ==========================================
  // Icon Mapping
  // ==========================================

  const iconMap = {
    employees: BsPeopleFill,
    attendance: BsCalendarCheck,
    leave: BsCalendar2CheckFill,
    payroll: BsCashStack,
  };


  // ==========================================
  // Refresh Dashboard
  // ==========================================

  const handleRefresh = () => {

    if (refreshing) {
      return;
    }

    setRefreshing(true);

    setTimeout(() => {

      setRefreshing(false);

      const currentTime =
        new Date().toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      setLastUpdated(currentTime);

    }, 1000);
  };


  // ==========================================
  // Date Range Change
  // ==========================================

  const handleDateRangeChange = (value) => {

    setDateRange(value);

    setLastUpdated("Just now");
  };


  return (
    <div className="dashboard">

      {/* ================================= */}
      {/* Toolbar */}
      {/* ================================= */}

      <DashboardToolbar
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        lastUpdated={lastUpdated}
      />


      {/* ================================= */}
      {/* Welcome */}
      {/* ================================= */}

      <WelcomeCard />


      {/* ================================= */}
      {/* Statistics */}
      {/* ================================= */}

      <div className="stats-grid">

        {dashboardStats.map((item) => {

          const Icon = iconMap[item.icon];

          return (
            <StatCard
              key={item.id}
              {...item}
              icon={Icon}
            />
          );

        })}

      </div>


      {/* ================================= */}
      {/* Charts */}
      {/* ================================= */}

      <div className="dashboard-row">

        <AttendanceChart
          selectedPeriod={dateRange}
        />

        <DepartmentChart />

      </div>


      {/* ================================= */}
      {/* Employees + Approvals */}
      {/* ================================= */}

      <div className="dashboard-row dashboard-row-secondary">

        <RecentEmployees />

        <PendingApproval />

      </div>


      {/* ================================= */}
      {/* Information */}
      {/* ================================= */}

      <div className="dashboard-info-grid">

        <BirthdayCard />

        <HolidayCard />

        <AnnouncementCard />

      </div>


      {/* ================================= */}
      {/* Quick Actions */}
      {/* ================================= */}

      <QuickActions />

    </div>
  );
}

export default Dashboard;