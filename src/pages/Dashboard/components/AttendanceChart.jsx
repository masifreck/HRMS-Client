import React from "react";
import Chart from "react-apexcharts";
import "./AttendanceChart.css";

function AttendanceChart() {

    const options = {

        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },

        stroke: {
            curve: "smooth",
            width: 4,
        },

        colors: ["#2563EB"],

        xaxis: {
            categories: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
            ],
        },

        dataLabels: {
            enabled: false,
        },

        grid: {
            borderColor: "#ECECEC",
        },

        tooltip: {
            theme: "light",
        },

    };

    const series = [

        {

            name: "Attendance",

            data: [92, 95, 90, 98, 97, 88, 94],

        },

    ];

    return (

        <div className="chart-card">

            <div className="chart-header">

                <h3>Attendance Trend</h3>

                <button>

                    This Week

                </button>

            </div>

            <Chart

                options={options}

                series={series}

                type="line"

                height={320}

            />

        </div>

    );

}

export default AttendanceChart;