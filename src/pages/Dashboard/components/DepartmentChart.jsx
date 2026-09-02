import React from "react";
import Chart from "react-apexcharts";
import "./DepartmentChart.css";

function DepartmentChart() {

    const options = {

        labels: [

            "Development",

            "HR",

            "Finance",

            "Sales",

            "Marketing",

        ],

        legend: {

            position: "bottom",

        },

        dataLabels: {

            enabled: false,

        },

        colors: [

            "#2563EB",

            "#22C55E",

            "#F59E0B",

            "#EC4899",

            "#8B5CF6",

        ],

    };

    const series = [

        40,

        18,

        12,

        20,

        10,

    ];

    return (

        <div className="chart-card">

            <div className="chart-header">

                <h3>

                    Department Distribution

                </h3>

            </div>

            <Chart

                type="donut"

                options={options}

                series={series}

                height={320}

            />

        </div>

    );

}

export default DepartmentChart;