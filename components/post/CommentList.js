import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Avatar,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";

import { userState, postState } from "../../recoil";
import { removePostCommentAPI } from "../../apis/post";
import produce from "../../util/produce";

const StyledList = styled(List)`
  max-height: 300px;
  overflow-y: hidden;

  :hover {
    overflow-y: scroll;
  }

  & > * {
    padding: 5px 0px 5px 0px;
  }
`;
const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;

  & > :nth-child(2) {
    margin: 0px 10px 0px 10px;
  }
  > a {
    font-weight: bold;
  }
`;

function CommentList({ comments, postUserId }) {
  return (
    <StyledList>
      {comments.length === 0 && (
        <Text textAlign="center" fontWeight="bold">
          댓글이 없습니다. 😳
        </Text>
      )}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postUserId={postUserId} />
      ))}
    </StyledList>
  );
}

function Comment({ comment, postUserId }) {
  const { me } = useRecoilValue(userState);
  const setPostState = useSetRecoilState(postState);

  const removePostCommentMutation = useMutation(
    "removePostComment",
    removePostCommentAPI,
    {
      onSuccess(data) {
        setPostState((prev) =>
          produce(prev, (draft) => {
            const post = draft.mainPosts.find(
              (post) => post.id === data.PostId
            );
            post.Comments = post.Comments.filter(
              (comment) => comment.id !== data.CommentId
            );
          })
        );
      },
    }
  );

  const onDeleteButtonClick = useCallback(() => {
    removePostCommentMutation.mutate({
      commentId: comment.id,
      postId: comment.PostId,
    });
    alert("댓글이 삭제되었습니다.");
  }, [comment?.id, comment?.PostId, removePostCommentMutation]);

  const isRemoveable = me?.id === postUserId || me?.id === comment?.UserId;

  return (
    <StyledListItem>
      <Avatar
        size="sm"
        name={comment.User.nickname}
        src={comment.User.ProfileImage ? comment.User.ProfileImage?.src : null}
      />
      <Link href={`/user/${comment.UserId}`}>
        <a>{comment.User.nickname}</a>
      </Link>

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
};
export default CommentList;
