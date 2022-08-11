import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {
  __getTodos,
  __postComments,
  __getComments,
  __setTodos,
} from '../../redux/modules/todosSlice';
import {useSelector, useDispatch} from 'react-redux';

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState({
    detailTodo: param.id,
    commentUser: '',
    commentContent: '',
  });
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    dispatch(__getTodos());
    // dispatch(__getComments());
  }, [dispatch]);

  const {isLoading, error, todos, comments} = useSelector((state) => state.todos);

  const onSubmitCommentHandler = async () => {
    await dispatch(__postComments(comment));
    await dispatch(__getComments());
    setComment({
      detailTodo: param.id,
      commentUser: '',
      commentContent: '',
    });
  };

  const detailTodo = todos.find((todo) => todo.id === parseInt(param.id));
  const commentslist = comments.filter((comment) => comment.detailTodo === param.id);

  const onChangeHandler = (e) => {
    setNewContent(e.target.value);
  };

  const sendEditTodo = () => {
    // id랑, 새로 바뀐 content를 reducer로 보내준다(reducer 가기전에 미들웨어에 도착할 예정);
    let data = {id: parseInt(param.id), content: newContent};
    dispatch(__setTodos(data));
    setEdit((prev) => !prev);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Icon onClick={() => navigate('/')}>
        <AiFillHome style={{width: '100%', height: '100%'}} />
      </Icon>
      <ContentsBox>
        <Form>
          <Title>{detailTodo ? detailTodo.title : '제목'}</Title>
          {edit === false ? (
            <Text>{detailTodo ? detailTodo.content : '내용'}</Text>
          ) : (
            <Textarea
              type="text"
              value={newContent === '' ? detailTodo?.content : newContent}
              onChange={onChangeHandler}
            ></Textarea>
          )}
          <div>
            <Btn onClick={sendEditTodo}>{edit ? '저장' : '수정'}</Btn>
          </div>
        </Form>
        <form
          style={{width: '100%', backgroundColor: '#eee'}}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitCommentHandler();
          }}
        >
          <span>작성자</span>
          <input
            type="text"
            value={comment.commentUser}
            onChange={(e) => {
              const {value} = e.target;
              setComment({
                ...comment,
                commentUser: value,
              });
            }}
          />
          <span>댓글</span>
          <input
            type="text"
            value={comment.commentContent}
            onChange={(e) => {
              const {value} = e.target;
              setComment({
                ...comment,
                commentContent: value,
              });
            }}
          />
          <button>추가하기</button>
        </form>
        <div style={{width: '100%', height: '400px', overflowY: 'scroll', backgroundColor: '#eee'}}>
          {commentslist &&
            commentslist.map((comment) => (
              <div style={{display: 'flex', justifyContent: 'space-between'}} key={comment.id}>
                <div>
                  작성자: {comment.commentUser} 댓글: {comment.commentContent}
                </div>
                <div>
                  <button>수정하기</button>
                  <button>삭제하기</button>
                </div>
              </div>
            ))}
        </div>
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
const Form = styled.div`
  padding: 5rem 2rem;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.h3`
  color: #595c6c;
  margin-top: 3rem;
`;
const Text = styled.div`
  font-size: 1.2rem;
  width: 700px;
  height: 300px;
  border: 2px solid #f9af71;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
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

const Textarea = styled.textarea`
  font-size: 1.2rem;
  width: 700px;
  height: 300px;
  border: 2px solid #f9af71;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
  resize: none;
`;
