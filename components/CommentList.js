import React from 'react'
import PropTypes from 'prop-types'
import {List, ListItem, Avatar } from '@chakra-ui/react'
import styled from '@emotion/styled'

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

const CommentList = ({comments}) =>{
  
  return (
    <StyledList>
      {comments.map((comment) => (
          <Comment key={comment.id}comment={comment} />
      ))}
    </StyledList>
  );
}

const Comment = ({comment})=>{
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
    </StyledListItem>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
}
export default CommentList