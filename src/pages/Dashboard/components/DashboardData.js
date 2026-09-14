// ==========================================
// Dashboard Mock Data
// ==========================================
// This file currently contains frontend mock data.
// Later this can be replaced by API responses.

export const dashboardStats = [
  {
    id: 1,
    title: "Total Employees",
    value: "1,248",
    change: "+18%",
    changeType: "positive",
    color: "#2563EB",
    icon: "employees",
  },
  {
    id: 2,
    title: "Present Today",
    value: "1,172",
    change: "94%",
    changeType: "positive",
    color: "#16A34A",
    icon: "attendance",
  },
  {
    id: 3,
    title: "On Leave",
    value: "38",
    change: "Pending 6",
    changeType: "warning",
    color: "#F59E0B",
    icon: "leave",
  },
  {
    id: 4,
    title: "Monthly Payroll",
    value: "₹84.5L",
    change: "Completed",
    changeType: "positive",
    color: "#7C3AED",
    icon: "payroll",
  },
];


// ==========================================
// Attendance Data
// ==========================================

export const attendanceData = {
  week: {
    categories: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    values: [
      92,
      95,
      90,
      98,
      97,
      88,
      94,
    ],
  },

  month: {
    categories: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
    ],

    values: [
      93,
      95,
      91,
      96,
    ],
  },
};


// ==========================================
// Department Distribution
// ==========================================

export const departmentData = {
  labels: [
    "Development",
    "HR",
    "Finance",
    "Sales",
    "Marketing",
  ],

  values: [
    40,
    18,
    12,
    20,
    10,
  ],
};


// ==========================================
// Recent Employees
// ==========================================

export const recentEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    employeeId: "EMP-1024",
    department: "Development",
    designation: "Software Engineer",
    joiningDate: "12 Sep 2026",
    status: "Active",
  },

  {
    id: 2,
    name: "Priya Singh",
    employeeId: "EMP-1023",
    department: "Human Resources",
    designation: "HR Executive",
    joiningDate: "10 Sep 2026",
    status: "Active",
  },

  {
    id: 3,
    name: "Aman Verma",
    employeeId: "EMP-1022",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "08 Sep 2026",
    status: "Active",
  },

  {
    id: 4,
    name: "Neha Gupta",
    employeeId: "EMP-1021",
    department: "Marketing",
    designation: "Marketing Executive",
    joiningDate: "06 Sep 2026",
    status: "Active",
  },

  {
    id: 5,
    name: "Arjun Kumar",
    employeeId: "EMP-1020",
    department: "Operations",
    designation: "Operations Manager",
    joiningDate: "04 Sep 2026",
    status: "Active",
  },
];


// ==========================================
// Pending Approvals
// ==========================================

export const pendingApprovals = [
  {
    id: 1,
    title: "Leave Requests",
    description: "Employees waiting for leave approval",
    count: 6,
    type: "leave",
  },

  {
    id: 2,
    title: "Attendance Regularization",
    description: "Attendance corrections awaiting review",
    count: 4,
    type: "attendance",
  },

  {
    id: 3,
    title: "Loan Requests",
    description: "Employee loan requests pending approval",
    count: 2,
    type: "loan",
  },

  {
    id: 4,
    title: "Expense Claims",
    description: "Reimbursement claims awaiting approval",
    count: 8,
    type: "expense",
  },
];


// ==========================================
// Birthdays
// ==========================================

export const birthdayData = [
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


// ==========================================
// Upcoming Holidays
// ==========================================

export const holidayData = [
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


// ==========================================
// Announcements
// ==========================================

export const announcementData = [
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

// ==========================================
// Dashboard Period Data
// ==========================================

export const dashboardPeriodData = {
  Today: {
    attendance: {
      categories: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
      values: [72, 84, 89, 94, 91, 94],
    },
  },

  "This Week": {
    attendance: {
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      values: [92, 95, 90, 98, 97, 88, 94],
    },
  },

  "This Month": {
    attendance: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],
      values: [93, 95, 91, 96],
    },
  },

  "This Quarter": {
    attendance: {
      categories: [
        "Month 1",
        "Month 2",
        "Month 3",
      ],
      values: [91, 94, 96],
    },
  },

  "This Year": {
    attendance: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      values: [89, 91, 93, 92, 95, 94, 96, 95, 94],
    },
  },
};