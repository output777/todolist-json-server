import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {__getTodos} from '../../redux/modules/todosSlice';
import {useSelector, useDispatch} from 'react-redux';

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, error, todos} = useSelector((state) => state.todos);
  const param = useParams();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(todos);
  return (
    <Container>
      <Icon onClick={() => navigate('/')}>
        <AiFillHome style={{width: '100%', height: '100%'}} />
      </Icon>
      <ContentsBox>
        <Form>
          <Title>제목</Title>
          <Text placeholder="내용" />
          <div>
            <Btn>수정</Btn>
          </div>
        </Form>
      </ContentsBox>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.div`
  color: #6aaecd;
  width: 32px;
  height: 32px;
  margin: 1rem 0 2rem 0;
  cursor: pointer;
`;

const ContentsBox = styled.div`
  width: 768px;
  height: 800px;
  background-color: #fff;
`;
const Form = styled.form`
  padding: 5rem 2rem;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.h3`
  color: #595c6c;
  margin-top: 3rem;
`;
const Text = styled.textarea`
  font-size: 1.2rem;
  width: 700px;
  height: 300px;
  border: 2px solid #f9af71;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
  resize: none;
`;
const Btn = styled.button`
  position: absolute;
  bottom: 4rem;
  width: 700px;
  height: 50px;
  background-color: #f9af71;
  color: #f0efe9;
  border: none;
`;
