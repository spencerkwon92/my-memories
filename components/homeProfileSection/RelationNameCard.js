import React, { useCallback } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import Link from "next/link";
import { userState } from "../../recoil";
import { useRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  followAPI,
  unfollowAPI,
  loadFollowersAPI,
  loadFollowingsAPI,
} from "../../apis/user";
import produce from "../../util/produce";

const mainCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: bold;
  }
`;

function RelationNameCard({ user }) {
  const [{ me }, setUserState] = useRecoilState(userState);
  const id = user?.id;
  const isFollowing = me?.Followings?.find((following) => following.id === id);
  const queryClient = useQueryClient();

  const followMutation = useMutation("users", followAPI, {
    onMutate() {
      console.log("Following Start!");
    },
    onSuccess(data) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.me.Followings.push({ id: data.UserId });
        })
      );
      queryClient.invalidateQueries("followings");
      console.log("Following Success!");
    },
    onSettled() {
      console.log("Following End!");
    },
  });

  const unFollowMutation = useMutation("users", unfollowAPI, {
    onMutate() {
      console.log("unFollowing Start!");
    },
    onSuccess(data) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.me.Followings = draft.me.Followings.filter(
            (following) => following.id !== data.UserId
          );
        })
      );
      queryClient.invalidateQueries("followings");
      console.log("unFollowing Success!");
    },
    onSettled() {
      console.log("unFollowing End!");
    },
  });

  const onFollowingHandle = useCallback(() => {
    if (isFollowing) {
      unFollowMutation.mutate(id);
    } else {
      followMutation.mutate(id);
    }
  }, [isFollowing, unFollowMutation, followMutation]);

  return (
    <div css={mainCss}>
      <div>
        <Avatar
          name={user?.nickname}
          bgColor="gray"
          size="md"
          src={user.ProfileImage ? user.ProfileImage?.src : null}
        />
        <Link href={`/user/${id}`}>
          <a>{user?.nickname}</a>
        </Link>
      </div>
      <Button color="blue" onClick={onFollowingHandle} variant="link">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}

RelationNameCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RelationNameCard;
