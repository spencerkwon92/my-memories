import React from 'react'

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList';

function profile() {

  const followerList = [
    { nickname: "제로초" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];
  const followingList = [
    { nickname: "제로초" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="Following List" data={followingList} />
      <FollowList header="Follower List" data={followerList} />
    </AppLayout>
  );
}

export default profile;