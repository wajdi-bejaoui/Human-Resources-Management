import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployees } from "../../api/employeeApi";

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
      });
  },
});

export default employeeSlice.reducer;
