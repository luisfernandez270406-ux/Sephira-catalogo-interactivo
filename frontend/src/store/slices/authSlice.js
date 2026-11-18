import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { TOKEN_KEY, USER_KEY } from "../../constants/auth";

const readSession = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return token && user ? { token, user } : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

const saveSession = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const data = await authService.login(body);
      saveSession(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const data = await authService.register(body);
      saveSession(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = await authService.me();
      saveSession({ token: getState().auth.token, user });
      return user;
    } catch (error) {
      clearSession();
      return rejectWithValue(error.message);
    }
  },
  { condition: (_, { getState }) => Boolean(getState().auth.token) }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { ...readSession(), loading: false, error: null },
  reducers: {
    sessionCleared: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    [loginUser, registerUser].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? action.error.message;
        });
    });

    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

const { sessionCleared } = authSlice.actions;

export const logout = () => (dispatch) => {
  clearSession();
  dispatch(sessionCleared());
};

export default authSlice.reducer;