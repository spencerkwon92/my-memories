import React, {useCallback} from "react";
import {useSelector } from "react-redux";
import {useRouter} from 'next/router'
import axios from "axios";
import { END } from "redux-saga";
import { Button, Flex, Heading, Center } from "@chakra-ui/react";
import Head from "next/head";
import {pageUrl} from '../../config/config'

import AppLayout from "../../components/AppLayout";
import wrapper from "../../store/configureStore";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import PostCard from "../../components/PostCard";
import Spacer from "../../components/CustomizedUI/Spacer";

function UserPost(){
  const {singlePost} = useSelector(state => state.post);
  const router = useRouter();
  const onClickToHome = useCallback(()=>{
    router.push('/')
  },[])
  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 메모리
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 메모리`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : `${pageUrl}/favicon.ico`
          }
        />
        <meta property="og:url" content={`https://mymemories.kr/post/${id}`} />
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        align-items="center"
        minHeight="80vh"
      >
        <Center>
          <Heading>{`${singlePost.User?.nickname}님의 메모리 입니다.`}</Heading>
        </Center>
        <PostCard post={singlePost} />
        <Spacer size={20} />
        <Center>
          <Button width="50vw" onClick={onClickToHome}>
            더 많은 메모리 보러가기
          </Button>
        </Center>
      </Flex>
    </AppLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      const {postId} = params;
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: postId,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default UserPost;