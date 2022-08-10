import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  comments: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk('getTodos', async (payload, thunkAPI) => {
  try {
    const data = await axios.get('http://localhost:3001/todos');
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postTodos = createAsyncThunk('postTodo', async (todo, thunkAPI) => {
  try {
    const data = await axios.post('http://localhost:3001/todos', todo);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteTodo = createAsyncThunk('deleteTodo', async (todoId, thunkAPI) => {
  console.log('todoId', todoId);
  try {
    await axios.delete(`http://localhost:3001/todos/${todoId}`);
    await axios.delete(`http://localhost:3001/comments/${todoId}`);
    return thunkAPI.fulfillWithValue(todoId);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteComment = createAsyncThunk('deleteComment', async (commentId, thunkAPI) => {
  console.log('commentId', commentId);
  try {
    await axios.delete(`http://localhost:3001/comments/${commentId}`);
    return thunkAPI.fulfillWithValue(commentId);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// [__deleteTodo.fulfilled]: (state, action) => {
//   state.isLoading = false;
//   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
// },

// [__deleteComment.fulfilled]: (state, action) => {
//   state.isLoading = false;
//   console.log(action.payload);
//   state.comments = state.comments.filter((comment) => comment.id !== action.payload);
// },

export const __editTodo = createAsyncThunk('editTodo', async (payload, thunkAPI) => {
  console.log('payload', payload);
  try {
    await axios.patch(`http://localhost:3001/todos/${payload.todoId}`, payload.content);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
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

export const __postComments = createAsyncThunk('postComment', async (payload, thunkAPI) => {
  console.log('payload', payload);
  try {
    const data = await axios.post(`http://localhost:3001/comments/`, payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __editComment = createAsyncThunk('editComment', async (payload, thunkAPI) => {
  try {
    await axios.patch(`http://localhost:3001/comments/${payload.commentId}`, payload.comment);
    return thunkAPI.fulfillWithValue(payload);
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
      state.todos.push(action.payload);
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
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __editTodo thunk : todo db 수정하기
    [__editTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((data) => {
        if (data.id === action.payload.todoId) {
          data = action.payload.content;
        }
        return data;
      });
    },
    [__editTodo.rejected]: (state, action) => {
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
      // state가 업데이트 되야 client에서 새로고침이 됨
      // 그래서 get으로 안불러줘도 됨
      state.comments.push(action.payload);
    },
    [__postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __deleteComment thunk : todo db 삭제하기
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log('action.payload', action.payload);
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      console.log(state.comments);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __editComment thunk : todo db 수정하기
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map((data) => {
        if (data.id === action.payload.commentId) {
          data = action.payload.comment;
        }
        return data;
      });
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
