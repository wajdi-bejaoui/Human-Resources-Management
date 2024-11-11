import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployees,deleteEmployees, updateEmployees } from "../../api/employeeApi";


//fetch employee action
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { getState }) => {
    const { employees } = getState();
    console.log(getState())
    if (employees.data.length > 0) return employees.data; // Return cached data if available
    const response = await getEmployees();
    return response.users;
  }
);


// deleteEmployee action
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { getState }) => {
  try {

  console.log("deleteEmployee called",id)
  const response = deleteEmployees(id);
  console.log(response)
  return id; // Return the deleted employee's ID
} catch (error) {
  console.error('Error in deleteEmployee:', error); // Debug log

  return rejectWithValue(error.response?.data || "Failed to delete employee");
}
});

// update employee action
export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append form data
      formData.append('fullname', employeeData.fullname);
      formData.append('email', employeeData.email);
      if (employeeData.password) formData.append('password', employeeData.password);
      if (employeeData.image) formData.append('image', employeeData.image);

      const response = await updateEmployees(id,formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update employee');
    }
  }
);


// employee reducer
const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    successMessage : null,
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.successMessage = null; // reset message if you use 'message' in place of 'success'
    },
  },
  extraReducers: (builder) => {
    builder
    //handle fetch employee action
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle delete Employee action
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        // console.log("action",action,state)
        state.data = state.data.filter((emp) => emp.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload || "Error deleting employee";
      })
        // Handle updateEmployee action
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("paylaod update",action.payload)
        state.successMessage = action.payload.message;
        const updatedEmployee = action.payload.user;
        state.data = state.data.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        state.error = null;

      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = employeeSlice.actions;

export default employeeSlice.reducer;
