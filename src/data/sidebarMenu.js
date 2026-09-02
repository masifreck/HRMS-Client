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
} from "react-icons/bs";

const sidebarMenu = [
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
            title: "Bank",
            icon: BsBank,
            path: "/masters/bank",
          },
        ],
      },
    ],
  },

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