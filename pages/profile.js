import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import axios from "axios";
import { SimpleGrid, Divider } from "@chakra-ui/react";

// import { loadMyInfo, loadFollowers, loadFollowings } from "../reducers/user";
import ProfileEditForm from "../components/userProfile/ProfileEditForm";
import AppLayout from "../components/layout/AppLayout";
import FollowList from "../components/userProfile/FollowList";
import wrapper from "../store/configureStore";
import useContainer from "../hooks/useContainer";
import Spacer from "../components/CustomizedUI/Spacer";

import { useLoadMyInfo } from "../hooks/userAction";
import { loadFollowersAPI, loadFollowingsAPI } from "../apis/user";
import { loadFollowings } from "../reducers/user";

function Profile() {
  const [user] = useLoadMyInfo();
  const { me } = user;

  const isMobile = useContainer({ default: false, md: true });
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    loadFollowersAPI().then((data) => setFollowers(data));
    loadFollowingsAPI().then((data) => setFollowings(data));
  }, []);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | My-Memories</title>
      </Head>
      {/* <ProfileEditForm /> */}
      <Divider />
      <Spacer size={20} />
      <SimpleGrid columns={isMobile ? 1 : 2} spacing={10}>
        <FollowList as="following" header="팔로잉 목록" data={followings} />
        <FollowList as="follower" header="팔로워 목록" data={followers} />
      </SimpleGrid>
    </AppLayout>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const cookie = req ? req.headers.cookie : "";
//       axios.defaults.headers.Cookie = "";
//       req && cookie && (axios.defaults.headers.Cookie = cookie);

//       await store.dispatch(loadMyInfo());

//       return {
//         props: {},
//       };
//     }
// );

export default Profile;
