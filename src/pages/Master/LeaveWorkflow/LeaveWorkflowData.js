export const leaveWorkflowData = [
  {
    id: 1,
    name: "Standard Employee Leave",
    description: "Default approval workflow for regular employees.",
    applicableTo: "All Employees",
    leaveTypes: ["Casual Leave", "Sick Leave", "Earned Leave"],
    approvalLevels: 2,
    level1: "Reporting Manager",
    level2: "HR Manager",
    autoApproval: false,
    status: "Active",
  },
  {
    id: 2,
    name: "Senior Employee Leave",
    description: "Approval workflow for senior-level employees.",
    applicableTo: "All Employees",
    leaveTypes: ["Casual Leave", "Earned Leave"],
    approvalLevels: 1,
    level1: "HR Manager",
    level2: "",
    autoApproval: false,
    status: "Active",
  },
  {
    id: 3,
    name: "Short Leave",
    description: "Quick approval workflow for short-duration leave.",
    applicableTo: "All Employees",
    leaveTypes: ["Casual Leave", "Sick Leave"],
    approvalLevels: 1,
    level1: "Reporting Manager",
    level2: "",
    autoApproval: false,
    status: "Active",
  },
  {
    id: 4,
    name: "Unpaid Leave Workflow",
    description: "Special approval process for unpaid leave requests.",
    applicableTo: "All Employees",
    leaveTypes: ["Unpaid Leave"],
    approvalLevels: 2,
    level1: "Reporting Manager",
    level2: "HR Manager",
    autoApproval: false,
    status: "Active",
  },
  {
    id: 5,
    name: "Management Leave",
    description: "Leave workflow configured for management employees.",
    applicableTo: "Eligible Employees",
    leaveTypes: ["Casual Leave", "Earned Leave"],
    approvalLevels: 1,
    level1: "HR Manager",
    level2: "",
    autoApproval: false,
    status: "Inactive",
  },
];

export const workflowStatusOptions = [
  "All Status",
  "Active",
  "Inactive",
];

export const workflowApplicabilityOptions = [
  "All Employees",
  "Eligible Employees",
];

export const approverOptions = [
  "Reporting Manager",
  "Department Manager",
  "HR Manager",
  "HR Head",
  "Branch Manager",
  "Admin",
];

export const approvalLevelOptions = [1, 2, 3];