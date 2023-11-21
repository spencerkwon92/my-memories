import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FormControl, Input, Button, Center } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useSetRecoilState, useRecoilValue } from "recoil";

import useInput from "../../hooks/useInput";
import Spacer from "../CustomizedUI/Spacer";
import { addCommentAPI } from "../../apis/post";
import { postState, userState } from "../../recoil";
import produce from "../../util/produce";

function CommentForm({ post }) {
  const { me } = useRecoilValue(userState);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const setPostState = useSetRecoilState(postState);

  const addCommentMutation = useMutation("addComment", addCommentAPI, {
    onSuccess(data) {
      setPostState((prev) =>
        produce(prev, (draft) => {
          const post = draft.mainPosts.find((post) => post.id === data.PostId);
          post.Comments.unshift(data);
        })
      );
      setCommentText("");
    },
  });

  const onSubmitComment = useCallback(() => {
    if (!me) {
      alert("댓글을 달려면 로그인이 필요합니다.");
    } else {
      addCommentMutation.mutate({ content: commentText, postId: post.id });
    }
  }, [me, addCommentMutation]);

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
        <Button onClick={onSubmitComment}>댓글달기</Button>
      </Center>
      <Spacer />
    </FormControl>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
