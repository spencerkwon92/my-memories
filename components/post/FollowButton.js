import React, { useCallback } from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil";

import { followAPI, unfollowAPI } from "../../apis/user";
import produce from "immer";

function FollowButton({ post }) {
  const [userStateBlock, setUserStateBlock] = useRecoilState(userState);
  const { me } = userStateBlock;

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      unfollowAPI(post.User.id).then((data) =>
        setUserStateBlock((prev) =>
          produce(prev, (draft) => {
            draft.me.Followings = draft.me.Followings.filter(
              (following) => following.id !== data.UserId
            );
          })
        )
      );
    } else {
      followAPI(post.User.id).then((data) =>
        setUserStateBlock((prev) =>
          produce(prev, (draft) => {
            draft.me.Followings.push({ id: data.UserId });
          })
        )
      );
    }
  }, [isFollowing]);

  if (post.User.id === me?.id) {
    return null;
  }

  return (
    <Button onClick={onClickButton} colorScheme="teal" variant="ghost">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
