import React, { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import axios from "axios";

import {
  UserInfoLoadingIndicator,
  PageLoadingIndicator,
  PostLoadingIndicator,
  UserPostsLoadingIndicator,
  UserHeaderIndicator,
} from "../components/layout/PageLoadingIndicator";

import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

import { useQuery } from "react-query";
import { userState } from "../recoil";
import { useRecoilState } from "recoil";
import produce from "../util/produce";
import FollowList from "../components/userProfile/FollowList";

import {
  loadFollowersAPI,
  loadFollowingsAPI,
  loadMyInfoAPI,
} from "../apis/user";

export default function Testing({ myInfoData, followersData, followingsData }) {
  const [{ me }, setUserState] = useRecoilState(userState);

  useEffect(() => {
    setUserState((prev) =>
      produce(prev, (draft) => {
        draft.me = {
          ...myInfoData,
          Followers: followersData,
          Followings: followingsData,
        };
      })
    );
  }, [myInfoData]);

  console.log(me);

  return (
    <AppLayout>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Following</Tab>
          <Tab>Follower</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FollowList type="following" header="팔로잉 목록" />
          </TabPanel>
          <TabPanel>
            <FollowList type="follower" header="팔로워 목록" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}

export const getServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const myInfoData = await loadMyInfoAPI();
  const followersData = await loadFollowersAPI();
  const followingsData = await loadFollowingsAPI();

  if (!myInfoData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { myInfoData, followersData, followingsData },
  };
};
