import React from "react";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import {
  SimpleGrid,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Button,
} from "@chakra-ui/react";

import ProfileEditForm from "../components/userProfile/ProfileEditForm";
import AppLayout from "../components/layout/AppLayout";
import FollowList from "../components/userProfile/FollowList";
import Spacer from "../components/CustomizedUI/Spacer";

import { useLoadFullMyInfo } from "../hooks/userAction";

function Profile() {
  const [{ me }, refetchFollowings] = useLoadFullMyInfo();

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | My-Memories</title>
      </Head>
      <ProfileEditForm />
      <Divider />
      <Spacer size={20} />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Following</Tab>
          <Tab>Follower</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FollowList
              type="following"
              header="팔로잉 목록"
              refetchMyInfo={refetchFollowings}
            />
          </TabPanel>
          <TabPanel>
            <FollowList
              type="follower"
              header="팔로워 목록"
              refetchMyInfo={refetchFollowings}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}

export default Profile;
