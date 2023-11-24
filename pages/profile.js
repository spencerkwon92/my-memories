import React, { useEffect } from "react";
import Head from "next/head";
import {
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import ProfileEditForm from "../components/userProfile/ProfileEditForm";
import AppLayout from "../components/layout/AppLayout";
import FollowList from "../components/userProfile/FollowList";
import Spacer from "../components/CustomizedUI/Spacer";
import { useLoadFullMyInfo } from "../hooks/userAction";
import { PageLoadingIndicator } from "../components/layout/PageLoadingIndicator";

function Profile() {
  const router = useRouter();
  const [{ me }, , , loading] = useLoadFullMyInfo();

  useEffect(() => {
    if (!me && !loading) {
      router.push("/");
      alert("로그인이 필요합니다.");
    }
  }, [me, loading]);

  if (loading) return <PageLoadingIndicator />;

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

export default Profile;
