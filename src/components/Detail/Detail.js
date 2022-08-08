import React from 'react';
import styled from 'styled-components';
import {AiFillHome} from 'react-icons/ai';

const Detail = () => {
  return (
    <Container>
      <Icon>
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
