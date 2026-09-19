// src/pages/Reimbursements/components/ReimbursementData.js

export const reimbursementData = [
  {
    id: 1,
    claimId: "RMB-2026-001",
    employeeId: "EMP-1024",
    employeeName: "Rahul Sharma",
    department: "Development",
    designation: "Senior Software Engineer",

    reimbursementType: "Travel",
    expenseDate: "2026-09-02",
    submittedDate: "2026-09-03",

    amount: 4850,
    approvedAmount: 4850,
    paidAmount: 4850,

    paymentMode: "Bank Transfer",

    description:
      "Client visit travel expenses including cab fare, local transportation and parking charges.",

    remarks: "Client meeting at Noida office.",

    approver: "Priya Singh",
    approverId: "EMP-1023",

    status: "Paid",

    receiptAttached: true,
    receiptName: "rahul-travel-sep02.pdf",

    createdOn: "2026-09-03T10:30:00",
    approvedOn: "2026-09-04T11:20:00",
    paidOn: "2026-09-07T15:10:00",

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-03 10:30 AM",
        user: "Rahul Sharma",
        remarks: "Reimbursement claim submitted.",
      },
      {
        status: "Approved",
        date: "2026-09-04 11:20 AM",
        user: "Priya Singh",
        remarks: "Claim approved.",
      },
      {
        status: "Paid",
        date: "2026-09-07 03:10 PM",
        user: "Finance Team",
        remarks: "Payment processed successfully.",
      },
    ],
  },

  {
    id: 2,
    claimId: "RMB-2026-002",
    employeeId: "EMP-1023",
    employeeName: "Priya Singh",
    department: "HR",
    designation: "HR Manager",

    reimbursementType: "Food",
    expenseDate: "2026-09-04",
    submittedDate: "2026-09-05",

    amount: 1850,
    approvedAmount: 1850,
    paidAmount: 0,

    paymentMode: "Bank Transfer",

    description:
      "Food expenses incurred during employee engagement and recruitment activity.",

    remarks: "Recruitment drive refreshments.",

    approver: "Aman Verma",
    approverId: "EMP-1022",

    status: "Approved",

    receiptAttached: true,
    receiptName: "hr-food-sep04.jpg",

    createdOn: "2026-09-05T09:45:00",
    approvedOn: "2026-09-06T12:15:00",
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-05 09:45 AM",
        user: "Priya Singh",
        remarks: "Reimbursement claim submitted.",
      },
      {
        status: "Approved",
        date: "2026-09-06 12:15 PM",
        user: "Aman Verma",
        remarks: "Claim approved for payment.",
      },
    ],
  },

  {
    id: 3,
    claimId: "RMB-2026-003",
    employeeId: "EMP-1022",
    employeeName: "Aman Verma",
    department: "Finance",
    designation: "Finance Executive",

    reimbursementType: "Communication",
    expenseDate: "2026-09-05",
    submittedDate: "2026-09-06",

    amount: 1250,
    approvedAmount: 0,
    paidAmount: 0,

    paymentMode: "Bank Transfer",

    description:
      "Official mobile and internet communication expenses for business operations.",

    remarks: "Monthly official communication expense.",

    approver: "Rohit Das",
    approverId: "EMP-1016",

    status: "Pending",

    receiptAttached: true,
    receiptName: "communication-sep05.pdf",

    createdOn: "2026-09-06T10:15:00",
    approvedOn: null,
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-06 10:15 AM",
        user: "Aman Verma",
        remarks: "Reimbursement claim submitted for approval.",
      },
    ],
  },

  {
    id: 4,
    claimId: "RMB-2026-004",
    employeeId: "EMP-1021",
    employeeName: "Neha Gupta",
    department: "Marketing",
    designation: "Marketing Executive",

    reimbursementType: "Fuel",
    expenseDate: "2026-09-07",
    submittedDate: "2026-09-08",

    amount: 3200,
    approvedAmount: 0,
    paidAmount: 0,

    paymentMode: "Bank Transfer",

    description:
      "Fuel expenses for official client visits and marketing activities.",

    remarks: "Client visits - September week 1.",

    approver: "Priya Singh",
    approverId: "EMP-1023",

    status: "Pending",

    receiptAttached: true,
    receiptName: "fuel-sep07.jpg",

    createdOn: "2026-09-08T09:30:00",
    approvedOn: null,
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-08 09:30 AM",
        user: "Neha Gupta",
        remarks: "Fuel reimbursement submitted.",
      },
    ],
  },

  {
    id: 5,
    claimId: "RMB-2026-005",
    employeeId: "EMP-1020",
    employeeName: "Arjun Kumar",
    department: "Operations",
    designation: "Operations Executive",

    reimbursementType: "Office Expense",
    expenseDate: "2026-08-28",
    submittedDate: "2026-08-29",

    amount: 2750,
    approvedAmount: 2750,
    paidAmount: 0,

    paymentMode: "Cash",

    description:
      "Purchase of office stationery and operational supplies.",

    remarks: "Office stationery purchase.",

    approver: "Rohit Das",
    approverId: "EMP-1016",

    status: "Approved",

    receiptAttached: true,
    receiptName: "office-expense-aug28.pdf",

    createdOn: "2026-08-29T14:20:00",
    approvedOn: "2026-08-30T10:45:00",
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-08-29 02:20 PM",
        user: "Arjun Kumar",
        remarks: "Office expense reimbursement submitted.",
      },
      {
        status: "Approved",
        date: "2026-08-30 10:45 AM",
        user: "Rohit Das",
        remarks: "Approved for payment.",
      },
    ],
  },

  {
    id: 6,
    claimId: "RMB-2026-006",
    employeeId: "EMP-1019",
    employeeName: "Sneha Patel",
    department: "Development",
    designation: "Software Engineer",

    reimbursementType: "Medical",
    expenseDate: "2026-08-25",
    submittedDate: "2026-08-27",

    amount: 4200,
    approvedAmount: 3500,
    paidAmount: 3500,

    paymentMode: "Bank Transfer",

    description:
      "Medical reimbursement claim submitted with supporting medical documents.",

    remarks: "Medical reimbursement as per company policy.",

    approver: "Priya Singh",
    approverId: "EMP-1023",

    status: "Paid",

    receiptAttached: true,
    receiptName: "medical-aug25.pdf",

    createdOn: "2026-08-27T11:00:00",
    approvedOn: "2026-08-28T13:10:00",
    paidOn: "2026-09-02T16:00:00",

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-08-27 11:00 AM",
        user: "Sneha Patel",
        remarks: "Medical reimbursement submitted.",
      },
      {
        status: "Approved",
        date: "2026-08-28 01:10 PM",
        user: "Priya Singh",
        remarks: "Approved amount ₹3,500 as per policy.",
      },
      {
        status: "Paid",
        date: "2026-09-02 04:00 PM",
        user: "Finance Team",
        remarks: "Payment completed.",
      },
    ],
  },

  {
    id: 7,
    claimId: "RMB-2026-007",
    employeeId: "EMP-1018",
    employeeName: "Vikash Yadav",
    department: "Sales",
    designation: "Sales Executive",

    reimbursementType: "Travel",
    expenseDate: "2026-09-08",
    submittedDate: "2026-09-09",

    amount: 6800,
    approvedAmount: 0,
    paidAmount: 0,

    paymentMode: "Bank Transfer",

    description:
      "Inter-city travel expenses for customer and distributor meetings.",

    remarks: "Customer visit in Kanpur.",

    approver: "Rahul Sharma",
    approverId: "EMP-1024",

    status: "Pending",

    receiptAttached: true,
    receiptName: "sales-travel-sep08.pdf",

    createdOn: "2026-09-09T10:20:00",
    approvedOn: null,
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-09 10:20 AM",
        user: "Vikash Yadav",
        remarks: "Travel reimbursement submitted.",
      },
    ],
  },

  {
    id: 8,
    claimId: "RMB-2026-008",
    employeeId: "EMP-1017",
    employeeName: "Anjali Mehta",
    department: "Finance",
    designation: "Accountant",

    reimbursementType: "Office Expense",
    expenseDate: "2026-08-20",
    submittedDate: "2026-08-21",

    amount: 1450,
    approvedAmount: 0,
    paidAmount: 0,

    paymentMode: "Cash",

    description:
      "Purchase of accounting stationery and office consumables.",

    remarks: "Stationery purchase.",

    approver: "Aman Verma",
    approverId: "EMP-1022",

    status: "Rejected",

    receiptAttached: true,
    receiptName: "stationery-aug20.jpg",

    createdOn: "2026-08-21T12:40:00",
    approvedOn: null,
    paidOn: null,

    rejectionReason:
      "Expense is outside the approved reimbursement policy.",

    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-08-21 12:40 PM",
        user: "Anjali Mehta",
        remarks: "Office expense submitted.",
      },
      {
        status: "Rejected",
        date: "2026-08-22 03:15 PM",
        user: "Aman Verma",
        remarks:
          "Expense is outside the approved reimbursement policy.",
      },
    ],
  },

  {
    id: 9,
    claimId: "RMB-2026-009",
    employeeId: "EMP-1016",
    employeeName: "Rohit Das",
    department: "Operations",
    designation: "Supervisor",

    reimbursementType: "Fuel",
    expenseDate: "2026-09-10",
    submittedDate: "2026-09-11",

    amount: 3900,
    approvedAmount: 0,
    paidAmount: 0,

    paymentMode: "Bank Transfer",

    description:
      "Fuel expenses for operational vehicle movement and site visits.",

    remarks: "Operational site visits.",

    approver: "Priya Singh",
    approverId: "EMP-1023",

    status: "Pending",

    receiptAttached: true,
    receiptName: "fuel-sep10.pdf",

    createdOn: "2026-09-11T09:15:00",
    approvedOn: null,
    paidOn: null,

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-11 09:15 AM",
        user: "Rohit Das",
        remarks: "Fuel reimbursement submitted.",
      },
    ],
  },

  {
    id: 10,
    claimId: "RMB-2026-010",
    employeeId: "EMP-1015",
    employeeName: "Pooja Sharma",
    department: "HR",
    designation: "HR Executive",

    reimbursementType: "Food",
    expenseDate: "2026-09-01",
    submittedDate: "2026-09-02",

    amount: 2200,
    approvedAmount: 2200,
    paidAmount: 2200,

    paymentMode: "UPI",

    description:
      "Employee engagement event food and refreshments expenses.",

    remarks: "Employee engagement activity.",

    approver: "Priya Singh",
    approverId: "EMP-1023",

    status: "Paid",

    receiptAttached: true,
    receiptName: "food-event-sep01.pdf",

    createdOn: "2026-09-02T13:30:00",
    approvedOn: "2026-09-03T10:00:00",
    paidOn: "2026-09-05T14:30:00",

    approvalTimeline: [
      {
        status: "Submitted",
        date: "2026-09-02 01:30 PM",
        user: "Pooja Sharma",
        remarks: "Food reimbursement submitted.",
      },
      {
        status: "Approved",
        date: "2026-09-03 10:00 AM",
        user: "Priya Singh",
        remarks: "Claim approved.",
      },
      {
        status: "Paid",
        date: "2026-09-05 02:30 PM",
        user: "Finance Team",
        remarks: "Payment processed.",
      },
    ],
  },
];

/* -------------------------------------------------------
   Employee Options
------------------------------------------------------- */

export const reimbursementEmployeeOptions = [
  {
    value: "EMP-1024",
    label: "Rahul Sharma - EMP-1024",
    employeeName: "Rahul Sharma",
    department: "Development",
  },
  {
    value: "EMP-1023",
    label: "Priya Singh - EMP-1023",
    employeeName: "Priya Singh",
    department: "HR",
  },
  {
    value: "EMP-1022",
    label: "Aman Verma - EMP-1022",
    employeeName: "Aman Verma",
    department: "Finance",
  },
  {
    value: "EMP-1021",
    label: "Neha Gupta - EMP-1021",
    employeeName: "Neha Gupta",
    department: "Marketing",
  },
  {
    value: "EMP-1020",
    label: "Arjun Kumar - EMP-1020",
    employeeName: "Arjun Kumar",
    department: "Operations",
  },
  {
    value: "EMP-1019",
    label: "Sneha Patel - EMP-1019",
    employeeName: "Sneha Patel",
    department: "Development",
  },
  {
    value: "EMP-1018",
    label: "Vikash Yadav - EMP-1018",
    employeeName: "Vikash Yadav",
    department: "Sales",
  },
  {
    value: "EMP-1017",
    label: "Anjali Mehta - EMP-1017",
    employeeName: "Anjali Mehta",
    department: "Finance",
  },
  {
    value: "EMP-1016",
    label: "Rohit Das - EMP-1016",
    employeeName: "Rohit Das",
    department: "Operations",
  },
  {
    value: "EMP-1015",
    label: "Pooja Sharma - EMP-1015",
    employeeName: "Pooja Sharma",
    department: "HR",
  },
];

/* -------------------------------------------------------
   Department Options
------------------------------------------------------- */

export const reimbursementDepartmentOptions = [
  {
    value: "",
    label: "All Departments",
  },
  {
    value: "Development",
    label: "Development",
  },
  {
    value: "HR",
    label: "HR",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Marketing",
    label: "Marketing",
  },
  {
    value: "Operations",
    label: "Operations",
  },
  {
    value: "Sales",
    label: "Sales",
  },
];

/* -------------------------------------------------------
   Reimbursement Type Options
------------------------------------------------------- */

export const reimbursementTypeOptions = [
  {
    value: "",
    label: "All Types",
  },
  {
    value: "Travel",
    label: "Travel",
  },
  {
    value: "Food",
    label: "Food",
  },
  {
    value: "Fuel",
    label: "Fuel",
  },
  {
    value: "Medical",
    label: "Medical",
  },
  {
    value: "Communication",
    label: "Communication",
  },
  {
    value: "Office Expense",
    label: "Office Expense",
  },
  {
    value: "Other",
    label: "Other",
  },
];

/* -------------------------------------------------------
   Status Options
------------------------------------------------------- */

export const reimbursementStatusOptions = [
  {
    value: "",
    label: "All Status",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Approved",
    label: "Approved",
  },
  {
    value: "Rejected",
    label: "Rejected",
  },
  {
    value: "Paid",
    label: "Paid",
  },
];

/* -------------------------------------------------------
   Payment Mode Options
------------------------------------------------------- */

export const reimbursementPaymentModeOptions = [
  {
    value: "",
    label: "Select Payment Mode",
  },
  {
    value: "Bank Transfer",
    label: "Bank Transfer",
  },
  {
    value: "UPI",
    label: "UPI",
  },
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
];

/* -------------------------------------------------------
   Summary Helper
------------------------------------------------------- */

export const getReimbursementSummary = (data = reimbursementData) => {
  const totalClaims = data.length;

  const pendingClaims = data.filter(
    (item) => item.status === "Pending"
  ).length;

  const rejectedClaims = data.filter(
    (item) => item.status === "Rejected"
  ).length;

  const approvedAmount = data.reduce(
    (total, item) => total + Number(item.approvedAmount || 0),
    0
  );

  const paidAmount = data.reduce(
    (total, item) => total + Number(item.paidAmount || 0),
    0
  );

  const totalClaimAmount = data.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  return {
    totalClaims,
    pendingClaims,
    rejectedClaims,
    approvedAmount,
    paidAmount,
    totalClaimAmount,
  };
};