import "./Dashboard.css";

import WelcomeCard from "./components/WelcomeCard";
import StatCard from "./components/StatCard";
import AttendanceChart from "./components/AttendanceChart";

import DepartmentChart from "./components/DepartmentChart";

import {
    BsPeopleFill,
    BsCalendarCheck,
    BsCalendar2CheckFill,
    BsCashStack,
} from "react-icons/bs";

function Dashboard() {

    const stats = [

        {
            title: "Total Employees",
            value: "1,248",
            change: "+18%",
            color: "#2563EB",
            icon: BsPeopleFill,
        },

        {
            title: "Present Today",
            value: "1,172",
            change: "94%",
            color: "#16A34A",
            icon: BsCalendarCheck,
        },

        {
            title: "On Leave",
            value: "38",
            change: "Pending 6",
            color: "#F59E0B",
            icon: BsCalendar2CheckFill,
        },

        {
            title: "Monthly Payroll",
            value: "₹84.5L",
            change: "Completed",
            color: "#7C3AED",
            icon: BsCashStack,
        },

    ];

    return (

        <div className="dashboard">

            <WelcomeCard />

            <div className="stats-grid">

                {stats.map((item, index) => (

                    <StatCard
                        key={index}
                        {...item}
                    />

                ))}

            </div>
<div className="dashboard-row">

    <AttendanceChart/>

    <DepartmentChart/>

</div>
        </div>

    );

}

export default Dashboard;