import React, { useCallback } from "react";
import { Avatar, Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const {me, logoutLoading} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {user.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {user.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {user.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
