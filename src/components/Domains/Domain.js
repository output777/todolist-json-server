import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Domains = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderTitle onClick={() => navigate('/')}>모두의 투두 리스트</HeaderTitle>
      <ContentsBox>
        <Content onClick={() => navigate('/record')}>
          <Text>할 일 기록하기</Text>
        </Content>
        <Content onClick={() => navigate('/todo')}>
          <Text>TODO LIST</Text>
        </Content>
      </ContentsBox>
    </Container>
  );
};

export default Domains;

const Container = styled.div``;
const HeaderTitle = styled.h1`
  color: #6aaecd;
  text-align: center;
  font-size: 1.8rem;
  cursor: pointer;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const Content = styled.div`
  width: 500px;
  height: 80px;
  margin: 1rem 0 1.5rem 0;
  background-color: #6aaecd;
  padding: 0.5rem 0 0 0;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;
  -webkit-box-shadow: 0px 7px 9px -1px rgba(0, 0, 0, 0.65);
  box-shadow: 0px 7px 9px -1px rgba(0, 0, 0, 0.65);
`;
const Text = styled.p`
  color: #f0efe9;
`;
