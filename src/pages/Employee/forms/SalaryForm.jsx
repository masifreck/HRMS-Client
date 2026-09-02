import React from "react";

import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import { useEmployee } from "../../../context/EmployeeContext";

import "../../../styles/forms.css";

const salaryTypeOptions = [
  { value: "Monthly", label: "Monthly" },
  { value: "Daily", label: "Daily" },
  { value: "Hourly", label: "Hourly" },
];

const paymentModeOptions = [
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash", label: "Cash" },
  { value: "Cheque", label: "Cheque" },
];

const employeeTypeOptions = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Probation", label: "Probation" },
  { value: "Intern", label: "Intern" },
];

const payrollStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Hold", label: "Hold" },
];

const SalaryForm = () => {

  const { employeeData, updateField } = useEmployee();

  return (

    <div className="salary-form">

      {/* ====================================================== */}

      <FormCard title="Salary & Payroll">

        <div className="salary-header">

          <div>

            <h3>Salary Information</h3>

            <p>

              Configure payroll settings, salary structure,
              allowances and statutory deductions.

            </p>

          </div>

          <div className="salary-badge">

            Payroll Module

          </div>

        </div>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Employment Information">

        <SectionTitle title="Payroll Configuration" />

        <FormGrid>

          <CustomDropdown
            label="Employee Type"
            name="employeeType"
            required
            options={employeeTypeOptions}
            value={employeeData.employeeType || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Salary Type"
            name="salaryType"
            required
            options={salaryTypeOptions}
            value={employeeData.salaryType || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Payment Mode"
            name="paymentMode"
            options={paymentModeOptions}
            value={employeeData.paymentMode || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Payroll Status"
            name="payrollStatus"
            options={payrollStatusOptions}
            value={employeeData.payrollStatus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Joining Date"
            type="date"
            name="salaryJoiningDate"
            value={employeeData.salaryJoiningDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Confirmation Date"
            type="date"
            name="confirmationDate"
            value={employeeData.confirmationDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Payroll Effective Date"
            type="date"
            name="payrollEffectiveDate"
            value={employeeData.payrollEffectiveDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Probation Period"
            name="probationPeriod"
            placeholder="6 Months"
            value={employeeData.probationPeriod || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Salary Details">

        <SectionTitle title="Basic Salary Information" />

        <FormGrid>

          <CustomTextInput
            label="Annual CTC"
            name="annualCTC"
            placeholder="600000"
            value={employeeData.annualCTC || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Monthly Gross Salary"
            name="monthlyGrossSalary"
            placeholder="50000"
            value={employeeData.monthlyGrossSalary || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Basic Salary"
            name="basicSalary"
            placeholder="25000"
            value={employeeData.basicSalary || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Net Salary"
            name="netSalary"
            placeholder="45000"
            value={employeeData.netSalary || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Payroll Notes">

        <SectionTitle title="General Notes" />

        <div className="salary-textarea-group">

          <label>Payroll Notes</label>

          <textarea
            name="salaryNotes"
            placeholder="Enter payroll related notes..."
            value={employeeData.salaryNotes || ""}
            onChange={updateField}
          />

        </div>

      </FormCard>
            {/* ====================================================== */}

      <FormCard title="Salary Structure">

        <SectionTitle title="Monthly Earnings" />

        <FormGrid>

          <CustomTextInput
            label="Basic Salary"
            name="earningBasicSalary"
            placeholder="25000"
            value={employeeData.earningBasicSalary || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="House Rent Allowance (HRA)"
            name="hra"
            placeholder="10000"
            value={employeeData.hra || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Dearness Allowance (DA)"
            name="da"
            placeholder="3000"
            value={employeeData.da || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Conveyance Allowance"
            name="conveyanceAllowance"
            placeholder="1600"
            value={employeeData.conveyanceAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Medical Allowance"
            name="medicalAllowance"
            placeholder="1250"
            value={employeeData.medicalAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Special Allowance"
            name="specialAllowance"
            placeholder="5000"
            value={employeeData.specialAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Internet Allowance"
            name="internetAllowance"
            placeholder="1000"
            value={employeeData.internetAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Food Allowance"
            name="foodAllowance"
            placeholder="2200"
            value={employeeData.foodAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Travel Allowance"
            name="travelAllowance"
            placeholder="3000"
            value={employeeData.travelAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Education Allowance"
            name="educationAllowance"
            placeholder="1000"
            value={employeeData.educationAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Uniform Allowance"
            name="uniformAllowance"
            placeholder="500"
            value={employeeData.uniformAllowance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Shift Allowance"
            name="shiftAllowance"
            placeholder="2500"
            value={employeeData.shiftAllowance || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Variable Pay">

        <SectionTitle title="Bonuses & Incentives" />

        <FormGrid>

          <CustomTextInput
            label="Performance Bonus"
            name="performanceBonus"
            placeholder="10000"
            value={employeeData.performanceBonus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Monthly Incentive"
            name="monthlyIncentive"
            placeholder="5000"
            value={employeeData.monthlyIncentive || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Sales Incentive"
            name="salesIncentive"
            placeholder="0"
            value={employeeData.salesIncentive || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Joining Bonus"
            name="joiningBonus"
            placeholder="0"
            value={employeeData.joiningBonus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Retention Bonus"
            name="retentionBonus"
            placeholder="0"
            value={employeeData.retentionBonus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Annual Bonus"
            name="annualBonus"
            placeholder="50000"
            value={employeeData.annualBonus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Variable Pay"
            name="variablePay"
            placeholder="100000"
            value={employeeData.variablePay || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Other Allowance"
            name="otherAllowance"
            placeholder="0"
            value={employeeData.otherAllowance || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Employer Contributions">

        <SectionTitle title="Company Contributions" />

        <FormGrid>

          <CustomTextInput
            label="Employer PF"
            name="employerPF"
            placeholder="1800"
            value={employeeData.employerPF || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Employer ESI"
            name="employerESI"
            placeholder="750"
            value={employeeData.employerESI || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Employer NPS"
            name="employerNPS"
            placeholder="0"
            value={employeeData.employerNPS || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Gratuity"
            name="gratuity"
            placeholder="1200"
            value={employeeData.gratuity || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Insurance Contribution"
            name="insuranceContribution"
            placeholder="800"
            value={employeeData.insuranceContribution || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Other Employer Benefits"
            name="otherEmployerBenefits"
            placeholder="Other Benefits"
            value={employeeData.otherEmployerBenefits || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>
            {/* ====================================================== */}

      <FormCard title="Employee Deductions">

        <SectionTitle title="Monthly Deductions" />

        <FormGrid>

          <CustomTextInput
            label="Employee PF"
            name="employeePF"
            placeholder="1800"
            value={employeeData.employeePF || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Employee ESI"
            name="employeeESI"
            placeholder="750"
            value={employeeData.employeeESI || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Professional Tax"
            name="professionalTax"
            placeholder="200"
            value={employeeData.professionalTax || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Income Tax (TDS)"
            name="tds"
            placeholder="1500"
            value={employeeData.tds || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Labour Welfare Fund"
            name="lwf"
            placeholder="20"
            value={employeeData.lwf || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Other Statutory Deduction"
            name="otherStatutoryDeduction"
            placeholder="0"
            value={employeeData.otherStatutoryDeduction || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Loan & Salary Advance">

        <SectionTitle title="Recoveries" />

        <FormGrid>

          <CustomTextInput
            label="Loan Recovery"
            name="loanRecovery"
            placeholder="5000"
            value={employeeData.loanRecovery || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Salary Advance"
            name="salaryAdvance"
            placeholder="0"
            value={employeeData.salaryAdvance || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Recovery EMI"
            name="recoveryEMI"
            placeholder="1000"
            value={employeeData.recoveryEMI || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Notice Recovery"
            name="noticeRecovery"
            placeholder="0"
            value={employeeData.noticeRecovery || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Food Recovery"
            name="foodRecovery"
            placeholder="0"
            value={employeeData.foodRecovery || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Other Recovery"
            name="otherRecovery"
            placeholder="0"
            value={employeeData.otherRecovery || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Bank Details">

        <SectionTitle title="Salary Account" />

        <FormGrid>

          <CustomTextInput
            label="Bank Name"
            name="salaryBankName"
            placeholder="HDFC Bank"
            value={employeeData.salaryBankName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Account Number"
            name="salaryAccountNumber"
            placeholder="XXXXXXXXXXXX"
            value={employeeData.salaryAccountNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="IFSC Code"
            name="salaryIFSC"
            placeholder="HDFC0001234"
            value={employeeData.salaryIFSC || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Branch Name"
            name="salaryBranch"
            placeholder="Delhi"
            value={employeeData.salaryBranch || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Account Holder Name"
            name="salaryAccountHolder"
            placeholder="Employee Name"
            value={employeeData.salaryAccountHolder || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Salary Account Status"
            name="salaryAccountStatus"
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
            value={employeeData.salaryAccountStatus || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Payroll Summary">

        <SectionTitle title="Monthly Payroll Summary" />

        <FormGrid>

          <CustomTextInput
            label="Gross Earnings"
            name="grossEarnings"
            placeholder="0"
            value={employeeData.grossEarnings || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Total Deductions"
            name="totalDeductions"
            placeholder="0"
            value={employeeData.totalDeductions || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Employer Contribution"
            name="totalEmployerContribution"
            placeholder="0"
            value={employeeData.totalEmployerContribution || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Net Payable Salary"
            name="netPayableSalary"
            placeholder="0"
            value={employeeData.netPayableSalary || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>
            {/* ====================================================== */}

      <FormCard title="Payroll Configuration">

        <SectionTitle title="Statutory Configuration" />

        <FormGrid>

          <CustomTextInput
            label="UAN Number"
            name="salaryUAN"
            placeholder="Enter UAN Number"
            value={employeeData.salaryUAN || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="PF Number"
            name="salaryPFNumber"
            placeholder="PF Number"
            value={employeeData.salaryPFNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="ESIC Number"
            name="salaryESICNumber"
            placeholder="ESIC Number"
            value={employeeData.salaryESICNumber || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="PF Applicable"
            name="pfApplicable"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            value={employeeData.pfApplicable || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="ESI Applicable"
            name="esiApplicable"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            value={employeeData.esiApplicable || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="TDS Applicable"
            name="tdsApplicable"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            value={employeeData.tdsApplicable || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Salary Revision">

        <SectionTitle title="Revision Details" />

        <FormGrid>

          <CustomTextInput
            label="Current Salary Effective Date"
            type="date"
            name="salaryEffectiveDate"
            value={employeeData.salaryEffectiveDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Next Salary Revision"
            type="date"
            name="nextSalaryRevision"
            value={employeeData.nextSalaryRevision || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Previous CTC"
            name="previousCTC"
            placeholder="500000"
            value={employeeData.previousCTC || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Expected Revised CTC"
            name="expectedRevisedCTC"
            placeholder="650000"
            value={employeeData.expectedRevisedCTC || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="HR Remarks">

        <SectionTitle title="Payroll Notes" />

        <div className="salary-textarea-group">

          <label>HR Remarks</label>

          <textarea
            name="salaryRemarks"
            placeholder="Enter payroll remarks..."
            value={employeeData.salaryRemarks || ""}
            onChange={updateField}
          />

        </div>

        <div className="salary-textarea-group">

          <label>Approval Remarks</label>

          <textarea
            name="approvalRemarks"
            placeholder="Manager / HR Approval Remarks..."
            value={employeeData.approvalRemarks || ""}
            onChange={updateField}
          />

        </div>

      </FormCard>

      {/* ====================================================== */}

      <FormCard title="Payroll Summary">

        <div className="info-box">

          <h3>Payroll Information</h3>

          <p>

            The salary structure configured above will be used for
            monthly payroll generation, statutory deductions,
            salary slips, reimbursement calculations, tax reports,
            Form-16 generation, PF/ESI returns, and annual CTC
            calculations.

          </p>

          <p>

            During API integration these values will be calculated
            automatically based on company payroll policies.

          </p>

        </div>

      </FormCard>

    </div>

  );

};

export default SalaryForm;