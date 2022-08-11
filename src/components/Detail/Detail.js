import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {
  __getTodos,
  __postComments,
  __getComments,
  __editTodo,
  __deleteComment,
  __editComment,
} from '../../redux/modules/todosSlice';
import {useSelector, useDispatch} from 'react-redux';
import useInput from '../../hooks/useInput';
import Comment from '../Comment/Comment';

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let {id} = useParams();

  const [edit, setEdit] = useState(false);

  const [editComment, setEditComment] = useState(false);
  const [editContent, onChangeEditContent, setEditContent] = useInput('');
  const [commentUser, onChangeCommentUser, setCommentUser] = useInput('');
  const [commentContent, onChangeCommentContent, setCommentContent] = useInput('');
  const [editCommentContent, onChangeEditCommentContent, setEditCommentContent] = useInput('');

  const {isLoading, error, todos, comments} = useSelector((state) => state.todos);

  const detailTodo = todos.find((todo) => todo.id === Number(id));
  const comment = comments.filter((item) => item.commentId === Number(id));

  console.log('detailTodo', detailTodo, 'comment', comments);
  // async await이 여기서 영향을 주지 않는다고 하는데 적어주지 않으면 수정이 적용 안됨
  const onEditContentSubmitHandler = (id) => {
    dispatch(
      __editTodo({
        todoId: id,
        content: {
          ...detailTodo,
          content: editContent,
        },
      })
    );
  };

  const onSubmitCommentHandler = async () => {
    dispatch(
      __postComments({
        commentId: Number(id),
        commentUser: commentUser,
        commentContent: commentContent,
      })
    );
    setCommentUser('');
    setCommentContent('');
  };

  const onDeleteCommentHandler = (id) => {
    console.log('id', id);
    dispatch(__deleteComment(id));
  };

  const onEditCommentHandler = (id) => {
    const data = comment.find((item) => item.id === id);
    dispatch(
      __editComment({
        commentId: id,
        comment: {
          ...data,
          commentContent: editCommentContent,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(__getTodos());
    dispatch(__getComments());
  }, [dispatch]);

  if (isLoading) {
    <div>로딩중...</div>;
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p>{detailTodo ? `id: ${detailTodo.id}` : 'id:'}</p>
          <Title>{detailTodo ? detailTodo.title : '제목'}</Title>
          {!edit ? (
            <Text>{detailTodo ? detailTodo.content : '내용'}</Text>
          ) : (
            <Textarea type="text" value={editContent} onChange={onChangeEditContent}></Textarea>
          )}
          <div>
            <Btn
              onClick={() => {
                setEdit((prev) => !prev);
                setEditContent(detailTodo.content);
                edit && onEditContentSubmitHandler(detailTodo.id);
              }}
            >
              {!edit ? '수정' : '저장'}
            </Btn>
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
          <input type="text" value={commentUser} onChange={onChangeCommentUser} />
          <span>댓글</span>
          <input type="text" value={commentContent} onChange={onChangeCommentContent} />
          <button>추가하기</button>
        </form>
        <div style={{width: '100%', height: '400px', overflowY: 'scroll', backgroundColor: '#eee'}}>
          {comment &&
            comment.map((comment) => (
              <div>
                <Comment
                  key={comment.id}
                  id={comment.id}
                  commentUser={comment.commentUser}
                  commentContent={comment.commentContent}
                  editComment={editComment}
                  setEditComment={setEditComment}
                  editCommentContent={editCommentContent}
                  setEditCommentContent={setEditCommentContent}
                  onChangeEditCommentContent={onChangeEditCommentContent}
                  onDeleteCommentHandler={onDeleteCommentHandler}
                  onEditCommentHandler={onEditCommentHandler}
                />
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
const Text = styled.div`
  font-size: 1.2rem;
  width: 700px;
  height: 300px;
  border: 2px solid #f9af71;
  padding: 1rem;
  box-sizing: border-box;
  outline: none;
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

const Btn = styled.button`
  position: absolute;
  bottom: 4rem;
  width: 700px;
  height: 50px;
  background-color: #f9af71;
  color: #f0efe9;
  border: none;
`;
