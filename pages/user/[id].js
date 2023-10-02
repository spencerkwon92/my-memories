import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import Router, {useRouter} from "next/router";
import { useDispatch } from "react-redux";
import {Text, Center} from '@chakra-ui/react'

import UserHeader from "./components/UserHeader";
import {LOAD_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, LOAD_FOLLOWERS_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import NewPostCard from '../../components/NewPostCard'
import Spacer from "../../components/CustomizedUI/Spacer";

/**
 * TODO: Do I need to do fetching data to create this page?
 * What about just bring the data using userId from the mainPosts?
 */

export default function UserPage() {
  const { me, userInfo } = useSelector((state) => state.user);
  const {mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter()
  const {id} = router.query
 
  useEffect(() => {
    if (typeof me === "undefined") {
      alert("로그인이 필요합니다!!");
      Router.push("/login");
    }
  }, [me]);

  useEffect(()=>{
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    })

  },[id]) 

  const myPosts = mainPosts.filter((post)=> post.User.id === parseInt(id))
  console.log(me)

  return (
    <AppLayout>
      <UserHeader user={me?.id === userInfo?.id ? me : userInfo} />
      <Spacer size="20" />
      {myPosts.length === 0 ? (
        <Center>
          <Text fontSize='20px'>게시물이 없습니다. 메인페이지로 이동해서 첫번째 게시물을 작성해 보세요!!</Text>
        </Center>
      ) : (
        myPosts?.map((post) => (
          <>
            <NewPostCard key={post.id} post={post} />
            <Spacer size="20" />
          </>
        ))
      )}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const { id } = params;
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      req && cookie && (axios.defaults.headers.Cookie = cookie);

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      })

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
