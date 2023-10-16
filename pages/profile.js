import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import axios from "axios";
import { END } from "redux-saga";
import { SimpleGrid, Divider } from '@chakra-ui/react';

import ProfileEditForm from '../components/ProfileEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from '../reducers/user';
import wrapper from '../store/configureStore';
import useContainer from '../hooks/useContainer';
import Spacer from '../components/CustomizedUI/Spacer';

function Profile(){
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useContainer({ default: false, md: true });

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(()=>{
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })

    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    })
  },[])

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | My-Memories</title>
      </Head>
      <ProfileEditForm />
      <Divider/>
      <Spacer size='20'/>
      <SimpleGrid columns={isMobile?1:2} spacing={10}>
        <FollowList as='following' header="팔로잉 목록" data={me.Followings} />
        <FollowList as='follower' header="팔로워 목록" data={me.Followers} />
      </SimpleGrid>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      req && cookie && (axios.defaults.headers.Cookie = cookie);

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Profile;
