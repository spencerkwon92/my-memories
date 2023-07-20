import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {FormControl, Input, Button, Stack, Spacer} from '@chakra-ui/react'

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log('clicked comment button')
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, userId: id, postId: post.id },
    });
  }, [commentText, id]);

  return (
    <FormControl>
      <Input type='comment' onChange={onChangeCommentText} value={commentText} required />
      <Spacer/>
      <Stack direction='row' spacing={2} align='center'>
        <Button onClick={onSubmitComment} isLoading={addCommentLoading}>댓글달기</Button>
      </Stack>
    </FormControl>
  )
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
