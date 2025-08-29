import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for GitHub API search
export const fetchUsers = createAsyncThunk(
  'search/fetchUsers',
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      if (!res.ok) throw new Error('API error: ' + res.status);
      const data = await res.json();
      return data.items; // return only the list
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
