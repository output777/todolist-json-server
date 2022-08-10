import React from 'react';
import styled from 'styled-components';
import {AiFillHome} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {__postTodos} from '../../redux/modules/todosSlice';
import useInput from '../../hooks/useInput';

const Record = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, onChangeUserHandler] = useInput('');
  const [title, onChangeTitleHandler] = useInput('');
  const [content, onChangeContentHandler] = useInput('');

  const onSubmitHandler = () => {
    dispatch(
      __postTodos({
        user,
        title,
        content,
      })
    );

    navigate('/todo');
  };

  return (
    <Container>
      <Icon onClick={() => navigate('/')}>
        <AiFillHome style={{width: '100%', height: '100%'}} />
      </Icon>
      <ContentsBox>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler();
          }}
        >
          <Title>작성자</Title>
          <Text
            placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
            value={user}
            onChange={onChangeUserHandler}
          />
          <Title>제목</Title>
          <Text
            placeholder="제목을 입력해주세요. (50자 이내)"
            value={title}
            onChange={onChangeTitleHandler}
          />
          <Title>내용</Title>
          <ContentText
            placeholder="내용을 입력해주세요. (200자 이내)"
            value={content}
            onChange={onChangeContentHandler}
          />
          <div>
            <Btn>+</Btn>
          </div>
        </Form>
      </ContentsBox>
    </Container>
  );
};

export default Record;

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
  padding: 2rem 2rem;
  height: 100%;
  box-sizing: border-box;
  /* background: green; */
  position: relative;
`;

const Title = styled.h3`
  color: #595c6c;
  margin-top: 1rem;
`;

const Text = styled.textarea`
  font-size: 1.2rem;
  width: 700px;
  height: 60px;
  border: 2px solid #6aaecd;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
  resize: none;
`;

const ContentText = styled.textarea`
  font-size: 1.2rem;
  width: 700px;
  height: 300px;
  border: 2px solid #6aaecd;
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
  background-color: #6aaecd;
  color: #fff;
  border: none;
`;
