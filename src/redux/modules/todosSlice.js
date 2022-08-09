import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
  comments: [],
};

export const __getTodos = createAsyncThunk('getTodos', async (payload, thunkAPI) => {
  try {
    const data = await axios.get('http://localhost:3001/todos');
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postTodos = createAsyncThunk('postTodos', async (payload, thunkAPI) => {
  try {
    const data = await axios.post('http://localhost:3001/todos', payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteTodo = createAsyncThunk('deleteTodos', async (payload, thunkAPI) => {
  try {
    console.log('payload', payload);
    const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getComments = createAsyncThunk('getComments', async (payload, thunkAPI) => {
  try {
    const data = await axios.get('http://localhost:3001/comments');
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postComments = createAsyncThunk('postComments', async (payload, thunkAPI) => {
  try {
    const data = await axios.post(`http://localhost:3001/comments/`, payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    // getTodos thunk : todo db 받아오기
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __postTodos thunk : todo db 넣어주기
    [__postTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __deleteTodo thunk : todo db 삭제하기
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __getComments thunk : 댓글 db 받아오기
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __postComments thunk : 댓글 db 넣어주기
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
