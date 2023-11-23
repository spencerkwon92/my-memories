import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";

import { userState } from "../recoil";
import {
  loadMyInfoAPI,
  loadUserAPI,
  loadFollowersAPI,
  loadFollowingsAPI,
} from "../apis/user";
import produce from "../util/produce";

export function useLoadMyInfo() {
  const [userStateBlock, setUserState] = useRecoilState(userState);
  const {
    data,
    error,
    isLoading: loadMyInfoLoading,
  } = useQuery("user", loadMyInfoAPI);

  useEffect(() => {
    if (data) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.me = data;
        })
      );
    }
  }, [data]);

  return [userStateBlock, loadMyInfoLoading, error];
}

export function useLoadUser(userId, isSameUser) {
  const [userStateBlock, setUserState] = useRecoilState(userState);
  const {
    data,
    error,
    isLoading: loadUserInfoLoading,
  } = useQuery(["userInfo", userId], () => loadUserAPI(userId), {
    enabled: !isSameUser,
  });

  useEffect(() => {
    if (data) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.userInfo = data;
        })
      );
    }
  }, [data]);

  return [userStateBlock, loadUserInfoLoading, error];
}
//TODO: 이거 다시 만들기..
export function useLoadFullMyInfo() {
  const [userStateBlock, setUserState] = useRecoilState(userState);

  const { data: myInfo, isLoading: loadMyInfoLoading } = useQuery(
    "user",
    loadMyInfoAPI
  );

  const {
    data: followersData,
    refetch: refetchFollowers,
    isLoading: loadFollowersLoading,
  } = useQuery("loadFollowers", loadFollowersAPI, {
    enabled: Boolean(myInfo),
  });
  const {
    data: followingsData,
    refetch: refetchFollowings,
    isLoading: loadFollowingsLoading,
  } = useQuery("loadFollowings", loadFollowingsAPI, {
    enabled: Boolean(myInfo),
  });

  useEffect(() => {
    if (myInfo) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.me = myInfo;
        })
      );
    }
  }, [myInfo]);

  useEffect(() => {
    if (followersData && followingsData) {
      setUserState((prev) =>
        produce(prev, (draft) => {
          draft.me.Followers = followersData;
          draft.me.Followings = followingsData;
        })
      );
    }
  }, [followersData, followingsData]);

  const allLoading =
    loadMyInfoLoading || loadFollowersLoading || loadFollowingsLoading;

  return [userStateBlock, refetchFollowings, refetchFollowers, allLoading];
}
