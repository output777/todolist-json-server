import React, {useEffect} from 'react';
import styled from 'styled-components';
import {AiFillHome} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {__getTodos, __postTodos, __deleteTodo} from '../../redux/modules/todosSlice';

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, error, todos} = useSelector((state) => state.todos);

  const onDeleteTodoHandler = (id) => {
    dispatch(__deleteTodo(id));
    dispatch(__getTodos());
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    <div>로딩중...</div>;
  }

  if (error) {
    <div>{error}</div>;
  }

  return (
    <Container>
      <Icon onClick={() => navigate('/')}>
        <AiFillHome style={{width: '100%', height: '100%'}} />
      </Icon>
      <TodoBox>
        {todos.map((todo) => (
          <TodoCard key={todo.id}>
            <div
              onClick={() => navigate(`/detail/${todo.id}`)}
              style={{
                width: '90%',
              }}
            >
              <h2 style={{margin: '0.5rem 0'}}>{todo.title}</h2>
              <p style={{margin: '0.5rem 0'}}>writer: {todo.user}</p>
            </div>
            <Stbutton onClick={() => onDeleteTodoHandler(todo.id)}>-</Stbutton>
          </TodoCard>
        ))}
      </TodoBox>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoBox = styled.div`
  background-color: white;

  width: 480px;
  height: 480px;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 50px 20px 50px 20px;
`;

const TodoCard = styled.div`
  color: #595c6c;
  width: 400px;
  height: auto;
  border: 1.5px solid #f9af71;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem auto;
  padding: 0px 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #6aaecd;
    color: #f0efe9;
  }
`;

const Stbutton = styled.button`
  width: 20px;
  height: 20px;
  color: white;
  background-color: #f9af71;
  border: none;
  border-radius: 50%;
`;

const Icon = styled.div`
  color: #6aaecd;
  width: 32px;
  height: 32px;
  margin: 1rem 0 2rem 0;
  cursor: pointer;
`;
