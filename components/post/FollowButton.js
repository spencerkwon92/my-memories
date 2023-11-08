import React, { useCallback } from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../reducers/user";

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow(post.User.id));
    } else {
      dispatch(follow(post.User.id));
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
