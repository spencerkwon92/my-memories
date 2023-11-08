import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Input, Button, Center } from "@chakra-ui/react";

import useInput from "../../hooks/useInput";
import { createComment } from "../../reducers/post";
import Spacer from "../CustomizedUI/Spacer";

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const { createCommentDone, createCommentLoading } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (createCommentDone) {
      setCommentText("");
    }
  }, [createCommentDone]);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      alert("댓글을 달려면 로그인이 필요합니다.");
    } else {
      dispatch(
        createComment({ content: commentText, userId: me?.id, postId: post.id })
      );
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
        <Button onClick={onSubmitComment} isLoading={createCommentLoading}>
          댓글달기
        </Button>
      </Center>
      <Spacer />
    </FormControl>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
