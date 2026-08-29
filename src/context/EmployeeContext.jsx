import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

    const [employeeData, setEmployeeData] = useState({

        // General

        employeeCode: "",
        employeeName: "",
        salutation: "",
        dob: "",
        gender: "",
        joiningDate: "",
        fatherName: "",
        motherName: "",
        branch: "",
        department: "",
        designation: "",
        company: "",
        grade: "",
        project: "",
        reportingHead: "",
        attendanceCode: "",
        geoId: "",
        currentStatus: "Current",

        // Attendance

        onDuty: true,
        salaryStop: false,
        isLogin: false,
        isSalaryShow: false,
        attendanceApp: false,
        attendanceAnywhere: true,

        // Vehicle

        vehicleNo: "",
        driveStartDate: "",

        // Address

        permanentAddress: "",
        currentAddress: "",
        city: "",
        state: "",
        country: "",
        pincode: "",

        // Education

        qualification: "",
        university: "",
        percentage: "",
        passingYear: "",

        // Experience

        companyName: "",
        experience: "",
        previousSalary: "",

        // Family

        spouseName: "",
        emergencyContact: "",

        // Documents

        aadhar: "",
        pan: "",

        // Salary

        basicSalary: "",
        hra: "",
        allowance: "",
        bankName: ""

    });

    const updateField = (e) => {

        const { name, value, type, checked } = e.target;

        setEmployeeData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    return (

        <EmployeeContext.Provider
            value={{
                employeeData,
                setEmployeeData,
                updateField
            }}
        >

            {children}

        </EmployeeContext.Provider>

    );

};

export const useEmployee = () => useContext(EmployeeContext);