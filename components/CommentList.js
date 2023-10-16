import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {List, ListItem, Avatar, IconButton,Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'
import {DeleteIcon} from '@chakra-ui/icons'
import { useDispatch,useSelector } from 'react-redux'

import {REMOVE_POST_COMMENT_REQUEST} from '../reducers/post'

const StyledList = styled(List)`
  max-height: 500px;
  overflow-y: hidden;

  :hover{
    overflow-y: auto;
  }

  & > * {
    padding: 5px 0px 5px 0px;
  }
`;
const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  
  & > :nth-child(2){
    margin: 0px 10px 0px 10px;
  }

`

function CommentList({comments, postUserId}){
  
  return (
    <StyledList>
      {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} postUserId={postUserId}/>
      ))}
    </StyledList>
  );
}


function Comment({comment, postUserId}){
  const dispatch = useDispatch()
  const { me } = useSelector(
    (state) => state.user
  );
  const onDeleteButtonClick = useCallback(() => {
    dispatch({
      type: REMOVE_POST_COMMENT_REQUEST,
      data: comment?.id,
      postId: comment?.PostId,
    });
    alert('댓글이 삭제되었습니다.')
  }, [comment?.id, comment?.PostId]);

  const isRemoveable = me?.id === postUserId || me?.id === comment?.UserId

  return (
    <StyledListItem>
      <Avatar
        size="sm"
        name={comment.User.nickname}
        src={
          comment.User.ProfileImage
            ? `http://localhost:3065/${comment.User.ProfileImage?.src}`
            : null
        }
      />
      <div>{comment.User.nickname}</div>
      <div>{comment.content}</div>
      {isRemoveable && (
        <>
          <Spacer />
          <IconButton
            icon={<DeleteIcon />}
            onClick={onDeleteButtonClick}
            size="sm"
            variant="ghost"
          />
        </>
      )}
    </StyledListItem>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
}
export default CommentList