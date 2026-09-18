import React, { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import {
  BsBarChartFill,
  BsCashStack,
  BsGraphUpArrow,
  BsPeopleFill,
  BsWallet2,
} from "react-icons/bs";

import "./PayrollReports.css";

const reportData = [
  {
    month: "April 2026",
    employees: 10,
    gross: 402500,
    deductions: 39320,
    net: 363180,
  },
  {
    month: "May 2026",
    employees: 10,
    gross: 405000,
    deductions: 39750,
    net: 365250,
  },
  {
    month: "June 2026",
    employees: 10,
    gross: 408500,
    deductions: 40180,
    net: 368320,
  },
  {
    month: "July 2026",
    employees: 10,
    gross: 411000,
    deductions: 40520,
    net: 370480,
  },
  {
    month: "August 2026",
    employees: 10,
    gross: 414500,
    deductions: 40950,
    net: 373550,
  },
  {
    month: "September 2026",
    employees: 10,
    gross: 419000,
    deductions: 41710,
    net: 377290,
  },
];

const departmentData = [
  {
    department: "Development",
    employees: 2,
    gross: 98500,
    net: 89240,
  },
  {
    department: "HR",
    employees: 2,
    gross: 84000,
    net: 76300,
  },
  {
    department: "Finance",
    employees: 2,
    gross: 79000,
    net: 70360,
  },
  {
    department: "Marketing",
    employees: 1,
    gross: 37000,
    net: 33710,
  },
  {
    department: "Operations",
    employees: 2,
    gross: 75000,
    net: 65250,
  },
  {
    department: "Sales",
    employees: 1,
    gross: 37000,
    net: 33930,
  },
];

const deductionData = [
  {
    name: "Provident Fund",
    amount: 28000,
  },
  {
    name: "TDS",
    amount: 7200,
  },
  {
    name: "Professional Tax",
    amount: 2000,
  },
  {
    name: "ESI",
    amount: 1810,
  },
  {
    name: "Loan Deduction",
    amount: 1700,
  },
  {
    name: "Other Deductions",
    amount: 1000,
  },
];

const PayrollReports = () => {
  const [period, setPeriod] = useState("6");

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const selectedData = useMemo(() => {
    const count = Number(period);

    return reportData.slice(-count);
  }, [period]);

  const totalGross = selectedData.reduce(
    (sum, item) => sum + item.gross,
    0
  );

  const totalDeductions = selectedData.reduce(
    (sum, item) => sum + item.deductions,
    0
  );

  const totalNet = selectedData.reduce(
    (sum, item) => sum + item.net,
    0
  );

  const averageNet =
    selectedData.length > 0
      ? totalNet / selectedData.length
      : 0;

  const payrollTrendOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: selectedData.map((item) =>
        item.month.split(" ")[0]
      ),
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `₹${Math.round(value / 1000)}K`;
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value),
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
    },
    grid: {
      borderColor: "#eef2f7",
    },
  };

  const payrollTrendSeries = [
    {
      name: "Gross Payroll",
      data: selectedData.map((item) => item.gross),
    },
    {
      name: "Net Payroll",
      data: selectedData.map((item) => item.net),
    },
    {
      name: "Deductions",
      data: selectedData.map((item) => item.deductions),
    },
  ];

  const departmentChartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: "55%",
      },
    },
    xaxis: {
      categories: departmentData.map(
        (item) => item.department
      ),
      labels: {
        formatter: (value) => {
          return `₹${Math.round(value / 1000)}K`;
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value),
      },
    },
    grid: {
      borderColor: "#eef2f7",
    },
  };

  const departmentChartSeries = [
    {
      name: "Net Payroll",
      data: departmentData.map((item) => item.net),
    },
  ];

  const deductionChartOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: deductionData.map((item) => item.name),
    legend: {
      position: "bottom",
      fontSize: "11px",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () =>
                formatCurrency(totalDeductions),
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatCurrency(value),
      },
    },
  };

  const deductionChartSeries = deductionData.map(
    (item) => item.amount
  );

  return (
    <section className="payroll-reports-section">
      {/* HEADER */}

      <div className="payroll-reports-header">
        <div>
          <span className="payroll-reports-eyebrow">
            PAYROLL ANALYTICS
          </span>

          <h2>Reports & Analytics</h2>

          <p>
            Analyze salary trends, department payroll and
            deduction distribution.
          </p>
        </div>

        <div className="payroll-reports-period">
          <label>Report Period</label>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
          </select>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="payroll-reports-summary">
        <div className="payroll-report-summary-card">
          <div className="payroll-report-summary-icon gross">
            <BsCashStack />
          </div>

          <div>
            <span>Total Gross Payroll</span>
            <strong>{formatCurrency(totalGross)}</strong>
            <small>Selected period</small>
          </div>
        </div>

        <div className="payroll-report-summary-card">
          <div className="payroll-report-summary-icon deductions">
            <BsWallet2 />
          </div>

          <div>
            <span>Total Deductions</span>
            <strong>
              {formatCurrency(totalDeductions)}
            </strong>
            <small>Selected period</small>
          </div>
        </div>

        <div className="payroll-report-summary-card">
          <div className="payroll-report-summary-icon net">
            <BsGraphUpArrow />
          </div>

          <div>
            <span>Total Net Payroll</span>
            <strong>{formatCurrency(totalNet)}</strong>
            <small>Selected period</small>
          </div>
        </div>

        <div className="payroll-report-summary-card">
          <div className="payroll-report-summary-icon average">
            <BsPeopleFill />
          </div>

          <div>
            <span>Average Monthly Net</span>
            <strong>{formatCurrency(averageNet)}</strong>
            <small>Per payroll month</small>
          </div>
        </div>
      </div>

      {/* PAYROLL TREND */}

      <div className="payroll-report-chart-card payroll-report-trend-card">
        <div className="payroll-report-card-header">
          <div className="payroll-report-card-title">
            <div className="payroll-report-card-icon">
              <BsGraphUpArrow />
            </div>

            <div>
              <h3>Payroll Trend</h3>
              <p>
                Gross, deductions and net payroll over time.
              </p>
            </div>
          </div>

          <span className="payroll-report-period-label">
            FY 2026-27
          </span>
        </div>

        <div className="payroll-report-chart">
          <Chart
            options={payrollTrendOptions}
            series={payrollTrendSeries}
            type="line"
            height={340}
          />
        </div>
      </div>

      {/* TWO CHARTS */}

      <div className="payroll-report-two-column">
        {/* DEPARTMENT */}

        <div className="payroll-report-chart-card">
          <div className="payroll-report-card-header">
            <div className="payroll-report-card-title">
              <div className="payroll-report-card-icon">
                <BsBarChartFill />
              </div>

              <div>
                <h3>Department Payroll</h3>
                <p>
                  Net payroll distribution by department.
                </p>
              </div>
            </div>
          </div>

          <div className="payroll-report-chart">
            <Chart
              options={departmentChartOptions}
              series={departmentChartSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>

        {/* DEDUCTIONS */}

        <div className="payroll-report-chart-card">
          <div className="payroll-report-card-header">
            <div className="payroll-report-card-title">
              <div className="payroll-report-card-icon">
                <BsWallet2 />
              </div>

              <div>
                <h3>Deduction Distribution</h3>
                <p>
                  Breakdown of payroll deductions.
                </p>
              </div>
            </div>
          </div>

          <div className="payroll-report-chart">
            <Chart
              options={deductionChartOptions}
              series={deductionChartSeries}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </div>

      {/* DEPARTMENT TABLE */}

      <div className="payroll-report-table-card">
        <div className="payroll-report-card-header">
          <div className="payroll-report-card-title">
            <div className="payroll-report-card-icon">
              <BsPeopleFill />
            </div>

            <div>
              <h3>Department Payroll Summary</h3>
              <p>
                Payroll contribution by department.
              </p>
            </div>
          </div>
        </div>

        <div className="payroll-report-table-wrapper">
          <table className="payroll-report-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employees</th>
                <th>Gross Payroll</th>
                <th>Net Payroll</th>
                <th>Net %</th>
              </tr>
            </thead>

            <tbody>
              {departmentData.map((item) => {
                const percentage =
                  totalNet > 0
                    ? ((item.net / totalNet) * 100).toFixed(1)
                    : 0;

                return (
                  <tr key={item.department}>
                    <td>
                      <strong>{item.department}</strong>
                    </td>

                    <td>
                      {item.employees}
                    </td>

                    <td>
                      {formatCurrency(item.gross)}
                    </td>

                    <td>
                      <strong className="payroll-report-net">
                        {formatCurrency(item.net)}
                      </strong>
                    </td>

                    <td>
                      <div className="payroll-report-percentage">
                        <div>
                          <span>{percentage}%</span>
                        </div>

                        <div className="payroll-report-progress">
                          <span
                            style={{
                              width: `${Math.min(
                                Number(percentage),
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PayrollReports;