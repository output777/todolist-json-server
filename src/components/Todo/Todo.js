import React from 'react';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';





const Todo = () => {
  const navigate = useNavigate();
  return (
    <Container>
        <Icon onClick={() => navigate('/')}>
          <AiFillHome style={{ width: '100%', height: '100%' }} />
        </Icon>
      <TodoBox>
          <TodoCard>
              <div>
                <h2>title</h2>
                <p>writer</p>
              </div>
            <Stbutton>-</Stbutton>
          </TodoCard>
      </TodoBox>
    </Container>

  )
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

    padding: 50px 20px 50px 20px;
`

const TodoCard = styled.div`
    color: #595C6C;

    width: 400px;
    height: 70px;

    border: 1.5px solid #F9AF71;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;

`

const Stbutton = styled.button`
    width: 20px;
    height: 20px;
    color: white;
    background-color: #F9AF71;
    border: none;
    border-radius: 50%
`


const Icon = styled.div`
  color: #6aaecd;
  width: 32px;
  height: 32px;
  margin: 1rem 0 2rem 0;
`;

