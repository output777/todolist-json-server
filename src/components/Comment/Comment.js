import React, {useRef} from 'react';
import styled from 'styled-components';

const Comment = ({
  id,
  commentUser,
  commentContent,
  editComment,
  editCommentContent,
  setEditComment,
  setEditCommentContent,
  onChangeEditCommentContent,
  onDeleteCommentHandler,
  onEditCommentHandler,
}) => {
  console.log('id', id);
  const commentEditInput = useRef();
  const commentEditContent = useRef();

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex'}}>
        <div>작성자: {commentUser}</div>
        <InputBox ref={commentEditInput}>
          id: {id} 댓글:
          <input type="text" value={editCommentContent} onChange={onChangeEditCommentContent} />
        </InputBox>
        <ContentBox ref={commentEditContent}>
          id: {id} 댓글: {commentContent}
        </ContentBox>
      </div>
      <div>
        {editComment ? (
          <button
            onClick={() => {
              setEditComment((prev) => !prev);
              commentEditInput.current.style.display = 'none';
              commentEditContent.current.style.display = 'block';
              editComment && onEditCommentHandler(id);
            }}
          >
            저장하기
          </button>
        ) : (
          <button
            onClick={() => {
              setEditComment((prev) => !prev);
              setEditCommentContent('');
              commentEditInput.current.style.display = 'block';
              commentEditContent.current.style.display = 'none';
            }}
          >
            수정하기
          </button>
        )}
        <button onClick={() => onDeleteCommentHandler(id)}>삭제하기</button>
      </div>
    </div>
  );
};

export default Comment;

const InputBox = styled.div`
  display: none;
`;

const ContentBox = styled.div``;
