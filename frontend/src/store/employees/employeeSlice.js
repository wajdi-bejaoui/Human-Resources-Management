import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployees,deleteEmployees } from "../../api/employeeApi";


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


// employee reducer
const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle deleteEmployee action
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        console.log("action",action,state)
        state.data = state.data.filter((emp) => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload || "Error deleting employee";
      });
  },
});

export default employeeSlice.reducer;
