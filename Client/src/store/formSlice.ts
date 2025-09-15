import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { uploadJobApplication } from '../api';

export interface FormState {
  jobLink: string;
  resume: File | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: FormState = {
  jobLink: '',
  resume: null,
  isLoading: false,
  error: null,
  success: false,
};

export const generateCV = createAsyncThunk(
  'form/generateCV',
  async (formData: FormData) => {
    return await uploadJobApplication(formData);
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setJobLink: (state, action: PayloadAction<string>) => {
      state.jobLink = action.payload;
    },
    setResume: (state, action: PayloadAction<File | null>) => {
      state.resume = action.payload;
    },
    resetForm: (state) => {
      state.jobLink = '';
      state.resume = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(generateCV.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(generateCV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setJobLink, setResume, resetForm } = formSlice.actions;
export default formSlice.reducer;