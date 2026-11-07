import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "../../services/orderService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/add",
  async (body, { rejectWithValue }) => {
    try {
      return await orderService.create(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOrder = createAsyncThunk(
  "orders/edit",
  async ({ id, ...body }, { rejectWithValue }) => {
    try {
      return await orderService.update(id, body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "orders/remove",
  async (id, { rejectWithValue }) => {
    try {
      await orderService.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;