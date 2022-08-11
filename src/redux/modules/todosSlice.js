import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const initialState = {
  todos: [],
  isLoading: false,
  error: null,
  comments: [],
};

export const __getTodos = createAsyncThunk('getTodos', async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`${url}todos`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postTodos = createAsyncThunk('postTodos', async (payload, thunkAPI) => {
  try {
    const data = await axios.post(`${url}/todos`, payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __setTodos = createAsyncThunk('setTodos', async (payload, thunkAPI) => {
  try {
    //성공하면 여기 조건이 실행됨
    const data = await axios.patch(`${url}/todos/${payload.id}`, {
      content: payload.content,
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    //실패하면 여기 조건이 실행됨
    console.log(error, 'error');
  }
});

export const __getComments = createAsyncThunk('getComments', async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`${url}/comments`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postComments = createAsyncThunk('postComments', async (payload, thunkAPI) => {
  try {
    const data = await axios.post(`${url}/comments/`, payload);
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
    // __setTodos thunk: 게시글 content 수정
    [__setTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__setTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? {...todo, content: action.payload.content} : todo
      );
    },
    [__setTodos.rejected]: (state, action) => {
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
