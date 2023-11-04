import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {FormControl, Input, Button, Center} from '@chakra-ui/react'

import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
import Spacer from '../CustomizedUI/Spacer';

function CommentForm({ post }){
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const {me} = useSelector((state) => state.user);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    if(!me){
      alert('댓글을 달려면 로그인이 필요합니다.')
    }else{
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, userId: me?.id, postId: post.id },
    });
    }

  }, [commentText, me?.id]);

  return (
    <FormControl>
      <Input
        type="comment"
        onChange={onChangeCommentText}
        value={commentText}
        required
      />
      <Spacer />
      <Center>
        <Button onClick={onSubmitComment} isLoading={addCommentLoading}>
          댓글달기
        </Button>
      </Center>
      <Spacer/>
    </FormControl>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
