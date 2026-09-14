import React from "react";
import Chart from "react-apexcharts";

import {
  BsGraphUpArrow,
} from "react-icons/bs";

import {
  dashboardPeriodData,
} from "./DashboardData";

import "./AttendanceChart.css";

function AttendanceChart({
  selectedPeriod = "This Week",
}) {
  const periodData =
    dashboardPeriodData[selectedPeriod]?.attendance ||
    dashboardPeriodData["This Week"].attendance;

  const options = {
    chart: {
      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      fontFamily: "inherit",
    },

    stroke: {
      curve: "smooth",
      width: 4,
    },

    colors: ["#2563EB"],

    xaxis: {
      categories: periodData.categories,

      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "11px",
        },
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      min: 70,
      max: 100,

      labels: {
        formatter: (value) => `${value}%`,

        style: {
          colors: "#9CA3AF",
          fontSize: "11px",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#ECECEC",

      strokeDashArray: 4,
    },

    tooltip: {
      theme: "light",

      y: {
        formatter: (value) => `${value}%`,
      },
    },

    markers: {
      size: 4,

      strokeWidth: 2,

      hover: {
        size: 6,
      },
    },

    responsive: [
      {
        breakpoint: 600,

        options: {
          chart: {
            height: 260,
          },

          xaxis: {
            labels: {
              rotate: -35,
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Attendance",
      data: periodData.values,
    },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div className="chart-title">

          <div className="chart-title-icon">
            <BsGraphUpArrow />
          </div>

          <div>
            <h3>Attendance Trend</h3>

            <p>
              Employee attendance performance
            </p>
          </div>

        </div>

        <span className="chart-period">
          {selectedPeriod}
        </span>

      </div>

      <div className="attendance-chart-wrapper">

        <Chart
          options={options}
          series={series}
          type="line"
          height={320}
          width="100%"
        />

      </div>

    </div>
  );
}

export default AttendanceChart;