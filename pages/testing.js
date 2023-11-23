import React, { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";

import {
  UserInfoLoadingIndicator,
  PageLoadingIndicator,
  PostLoadingIndicator,
  UserPostsLoadingIndicator,
  UserHeaderIndicator,
} from "../components/layout/PageLoadingIndicator";

import { useQuery } from "react-query";
import { loadFollowersAPI, loadFollowingsAPI } from "../apis/user";

export default function Testing() {
  const { data: FollowersData, isLoading: loadFollowersLoading } = useQuery(
    "followers",
    loadFollowersAPI
  );
  const { data: FollowingsData, isLoading: loadFollowingsLoading } = useQuery(
    "followings",
    loadFollowingsAPI
  );

  useEffect(() => {
    console.log(FollowersData);
    console.log(FollowingsData);
  }, [FollowersData, FollowingsData]);
  return (
    <AppLayout>
      <div>테스트중</div>
    </AppLayout>
  );
}
