import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsCalendarCheck,
  BsCalendar2CheckFill,
  BsCashStack,
  BsBarChartFill,
  BsWallet2,
  BsCalendarEvent,
  BsListTask,
  BsBuilding,
  BsPersonBadge,
  BsDiagram3,
  BsClock,
  BsPersonPlusFill,
  BsPersonLinesFill,
  BsFileEarmarkTextFill,
  BsBank,
  BsGearFill,
  BsDiagram3Fill,BsReceipt
} from "react-icons/bs";

const sidebarMenu = [
  // =========================
  // MAIN
  // =========================
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: BsGrid1X2Fill,
        path: "/",
      },
    ],
  },

  // =========================
  // EMPLOYEE
  // =========================
  {
    section: "EMPLOYEE",
    items: [
      {
        title: "Employee",
        icon: BsPeopleFill,
        children: [
          {
            title: "Employee List",
            icon: BsPersonLinesFill,
            path: "/employees",
          },
          {
            title: "Add Employee",
            icon: BsPersonPlusFill,
            path: "/employees/add",
          },
          {
            title: "Documents",
            icon: BsFileEarmarkTextFill,
            path: "/employees/documents",
          },
        ],
      },
    ],
  },

  // =========================
  // HR
  // =========================
  {
    section: "HR",
    items: [
      {
        title: "Attendance",
        icon: BsCalendarCheck,
        path: "/attendance",
      },
      {
        title: "Leave",
        icon: BsCalendar2CheckFill,
        path: "/leave",
      },
      {
        title: "Holiday",
        icon: BsCalendarEvent,
        path: "/holidays",
      },
    ],
  },

  // =========================
  // PAYROLL
  // =========================
  {
    section: "PAYROLL",
    items: [
      {
        title: "Payroll",
        icon: BsCashStack,
        path: "/payroll",
      },
      {
        title: "Reimbursements",
        icon: BsWallet2,
        path: "/reimbursements",
      },
    ],
  },

  // =========================
  // REPORTS
  // =========================
  {
    section: "REPORTS",
    items: [
      {
        title: "Reports",
        icon: BsBarChartFill,
        path: "/reports",
      },
    ],
  },
{
  section: "REIMBURSEMENTS",
  items: [
    {
      title: "Reimbursements",
      icon: BsReceipt,
      path: "/reimbursements",
    },
  ],
},
  // =========================
  // MASTERS
  // =========================
  {
    section: "MASTERS",

    items: [
      {
        title: "Masters",
        icon: BsListTask,

        children: [
          {
            title: "Branch",
            icon: BsBuilding,
            path: "/masters/branch",
          },

          {
            title: "Department",
            icon: BsDiagram3,
            path: "/masters/department",
          },

          {
            title: "Designation",
            icon: BsPersonBadge,
            path: "/masters/designation",
          },

          {
            title: "Shift",
            icon: BsClock,
            path: "/masters/shift",
          },

          {
            title: "Leave Type",
            icon: BsCalendar2CheckFill,
            path: "/masters/leave-type",
          },

          {
            title: "Leave Workflow",
            icon: BsDiagram3Fill,
            path: "/masters/leave-workflow",
          },

          {
            title: "Bank",
            icon: BsBank,
            path: "/masters/bank",
          },
        ],
      },
    ],
  },

  // =========================
  // SYSTEM
  // =========================
  {
    section: "SYSTEM",

    items: [
      {
        title: "Settings",
        icon: BsGearFill,
        path: "/settings",
      },
    ],
  },
];

export default sidebarMenu;