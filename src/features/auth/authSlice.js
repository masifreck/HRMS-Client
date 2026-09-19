import { createSlice } from "@reduxjs/toolkit";

const getStoredObject = (key) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(
      `Failed to read ${key} from localStorage`,
      error
    );

    return null;
  }
};

const savedToken = localStorage.getItem("hrms_token");
const savedUser = getStoredObject("hrms_user");
const savedRole = getStoredObject("hrms_role");
const savedCompany = getStoredObject("hrms_company");

const initialState = {
  token: savedToken || null,
  user: savedUser,
  role: savedRole,
  company: savedCompany,
  isAuthenticated: Boolean(savedToken),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const {
        token,
        user,
        role,
        company,
      } = action.payload;

      state.token = token;
      state.user = user;
      state.role = role || null;
      state.company = company || null;
      state.isAuthenticated = true;

      localStorage.setItem(
        "hrms_token",
        token
      );

      localStorage.setItem(
        "hrms_user",
        JSON.stringify(user)
      );

      if (role) {
        localStorage.setItem(
          "hrms_role",
          JSON.stringify(role)
        );
      } else {
        localStorage.removeItem("hrms_role");
      }

      if (company) {
        localStorage.setItem(
          "hrms_company",
          JSON.stringify(company)
        );
      } else {
        localStorage.removeItem("hrms_company");
      }
    },

    setProfile: (state, action) => {
      const {
        user,
        role,
        company,
      } = action.payload;

      if (user) {
        state.user = user;

        localStorage.setItem(
          "hrms_user",
          JSON.stringify(user)
        );
      }

      if (role) {
        state.role = role;

        localStorage.setItem(
          "hrms_role",
          JSON.stringify(role)
        );
      }

      if (company) {
        state.company = company;

        localStorage.setItem(
          "hrms_company",
          JSON.stringify(company)
        );
      }
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.company = null;
      state.isAuthenticated = false;

      localStorage.removeItem("hrms_token");
      localStorage.removeItem("hrms_user");
      localStorage.removeItem("hrms_role");
      localStorage.removeItem("hrms_company");
    },
  },
});

export const {
  setCredentials,
  setProfile,
  logout,
} = authSlice.actions;

export default authSlice.reducer;