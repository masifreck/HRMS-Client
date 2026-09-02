import React from "react";

import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import { useEmployee } from "../../../context/EmployeeContext";

import "../../../styles/forms.css";

const documentStatusOptions = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const DocumentsForm = () => {

  const { employeeData, updateField } = useEmployee();

  return (

    <div className="documents-form">

      {/* ================================================= */}

      <FormCard title="Employee Documents">

        <div className="documents-header">

          <div>

            <h3>Employee Verification Documents</h3>

            <p>

              Store government documents, employee identity,
              educational certificates and uploaded files.

            </p>

          </div>

          <div className="documents-badge">

            Document Center

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Identity Documents">

        <SectionTitle title="Government Identity" />

        <FormGrid>

          <CustomTextInput
            label="Aadhaar Number"
            name="aadhaarNumber"
            placeholder="XXXX XXXX XXXX"
            value={employeeData.aadhaarNumber || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Aadhaar Status"
            name="aadhaarStatus"
            options={documentStatusOptions}
            value={employeeData.aadhaarStatus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="PAN Number"
            name="panNumber"
            placeholder="ABCDE1234F"
            value={employeeData.panNumber || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="PAN Status"
            name="panStatus"
            options={documentStatusOptions}
            value={employeeData.panStatus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passport Number"
            name="passportNumber"
            placeholder="Passport Number"
            value={employeeData.passportNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passport Expiry"
            type="date"
            name="passportExpiry"
            value={employeeData.passportExpiry || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Driving Licence"
            name="drivingLicence"
            placeholder="Licence Number"
            value={employeeData.drivingLicence || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Driving Licence Expiry"
            type="date"
            name="drivingLicenceExpiry"
            value={employeeData.drivingLicenceExpiry || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Voter ID"
            name="voterId"
            placeholder="Voter Card Number"
            value={employeeData.voterId || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Voter ID Status"
            name="voterStatus"
            options={documentStatusOptions}
            value={employeeData.voterStatus || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Employee Photo">

        <SectionTitle title="Profile Photo" />

        <div className="document-grid">

          <div className="document-card">

            <h4>Employee Photograph</h4>

            <p>

              JPG, PNG

              <br />

              Maximum Size : 2 MB

            </p>

            <input
              type="file"
              name="employeePhoto"
              accept="image/*"
            />

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Resume">

        <SectionTitle title="Resume Upload" />

        <div className="document-grid">

          <div className="document-card">

            <h4>Latest Resume</h4>

            <p>

              PDF / DOC / DOCX

              <br />

              Maximum Size : 5 MB

            </p>

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
            />

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Educational Documents">

        <SectionTitle title="Certificates" />

        <div className="document-grid">

          <div className="document-card">

            <h4>10th Marksheet</h4>

            <input
              type="file"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>12th Marksheet</h4>

            <input
              type="file"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Graduation Certificate</h4>

            <input
              type="file"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Post Graduation</h4>

            <input
              type="file"
              accept=".pdf,.jpg,.png"
            />

          </div>

        </div>

      </FormCard>
            {/* ================================================= */}

      <FormCard title="Employment Documents">

        <SectionTitle title="Employment Records" />

        <div className="document-grid">

          <div className="document-card">

            <h4>Offer Letter</h4>

            <p>PDF / DOC / DOCX</p>

            <input
              type="file"
              name="offerLetter"
              accept=".pdf,.doc,.docx"
            />

          </div>

          <div className="document-card">

            <h4>Appointment Letter</h4>

            <p>PDF / DOC / DOCX</p>

            <input
              type="file"
              name="appointmentLetter"
              accept=".pdf,.doc,.docx"
            />

          </div>

          <div className="document-card">

            <h4>Experience Letter</h4>

            <p>PDF / DOC / DOCX</p>

            <input
              type="file"
              name="experienceLetter"
              accept=".pdf,.doc,.docx"
            />

          </div>

          <div className="document-card">

            <h4>Relieving Letter</h4>

            <p>PDF / DOC / DOCX</p>

            <input
              type="file"
              name="relievingLetter"
              accept=".pdf,.doc,.docx"
            />

          </div>

          <div className="document-card">

            <h4>Last Salary Slip</h4>

            <p>PDF</p>

            <input
              type="file"
              name="salarySlip"
              accept=".pdf"
            />

          </div>

          <div className="document-card">

            <h4>Increment Letter</h4>

            <p>PDF</p>

            <input
              type="file"
              name="incrementLetter"
              accept=".pdf"
            />

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Statutory Documents">

        <SectionTitle title="PF / ESIC / UAN" />

        <FormGrid>

          <CustomTextInput
            label="UAN Number"
            name="uanNumber"
            placeholder="Enter UAN Number"
            value={employeeData.uanNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="PF Number"
            name="pfNumber"
            placeholder="Enter PF Number"
            value={employeeData.pfNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="ESIC Number"
            name="esicNumber"
            placeholder="Enter ESIC Number"
            value={employeeData.esicNumber || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="UAN Status"
            name="uanStatus"
            options={documentStatusOptions}
            value={employeeData.uanStatus || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="PF Status"
            name="pfStatus"
            options={documentStatusOptions}
            value={employeeData.pfStatus || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="ESIC Status"
            name="esicStatus"
            options={documentStatusOptions}
            value={employeeData.esicStatus || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Bank Documents">

        <SectionTitle title="Bank Verification" />

        <FormGrid>

          <CustomTextInput
            label="Bank Name"
            name="documentBankName"
            value={employeeData.documentBankName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Account Number"
            name="documentAccountNumber"
            value={employeeData.documentAccountNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="IFSC Code"
            name="documentIFSC"
            value={employeeData.documentIFSC || ""}
            onChange={updateField}
          />

        </FormGrid>

        <div className="document-grid">

          <div className="document-card">

            <h4>Cancelled Cheque</h4>

            <input
              type="file"
              name="cancelledCheque"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Bank Passbook</h4>

            <input
              type="file"
              name="bankPassbook"
              accept=".pdf,.jpg,.png"
            />

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="Other Documents">

        <SectionTitle title="Additional Uploads" />

        <div className="document-grid">

          <div className="document-card">

            <h4>Medical Certificate</h4>

            <input
              type="file"
              name="medicalCertificate"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Police Verification</h4>

            <input
              type="file"
              name="policeVerification"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Address Proof</h4>

            <input
              type="file"
              name="addressProof"
              accept=".pdf,.jpg,.png"
            />

          </div>

          <div className="document-card">

            <h4>Other Documents</h4>

            <input
              type="file"
              name="otherDocuments"
              multiple
            />

          </div>

        </div>

      </FormCard>

      {/* ================================================= */}

      <FormCard title="HR Remarks">

        <SectionTitle title="Verification Notes" />

        <div className="documents-textarea-group">

          <label>HR Verification Remarks</label>

          <textarea
            name="documentRemarks"
            placeholder="Enter document verification remarks..."
            value={employeeData.documentRemarks || ""}
            onChange={updateField}
          />

        </div>

      </FormCard>

    </div>

  );

};

export default DocumentsForm;