import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services/categoryService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await categoryService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (body, { rejectWithValue }) => {
    try {
      return await categoryService.create(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/edit",
  async ({ id, ...body }, { rejectWithValue }) => {
    try {
      return await categoryService.update(id, body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/remove",
  async (id, { rejectWithValue }) => {
    try {
      await categoryService.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;