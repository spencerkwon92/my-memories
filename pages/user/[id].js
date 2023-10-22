import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import Router, {useRouter} from "next/router";
import { useDispatch } from "react-redux";
import {Heading, Center} from '@chakra-ui/react'

import UserHeader from "./components/UserHeader";
import {LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST} from "../../reducers/user";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import PostCard from '../../components/PostCard'
import Spacer from "../../components/CustomizedUI/Spacer";

export default function UserPage() {
  const { me, userInfo } = useSelector((state) => state.user);
  const {mainPosts, hasMorePosts, loadPostsLoading,} = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter()
  const {id} = router.query
 
  useEffect(() => {
    if (typeof me === "undefined") {
      alert("로그인이 필요합니다!!");
      Router.push("/login");
    }
  }, [me]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading, id]);

  useEffect(()=>{
    if(me?.id !== id)
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    })
  },[id]) 


  return (
    <AppLayout>
      <UserHeader user={me?.id === parseInt(id,10) ? me : userInfo} />
      <Spacer size={20} />
      {mainPosts.length === 0 ? (
        <Center h="50vh">
          <Heading size="lg">메모리가 없습니다.😭</Heading>
        </Center>
      ) : (
        mainPosts?.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
            <Spacer size={20} />
          </div>
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
        type: LOAD_USER_POSTS_REQUEST,
        data: id
      })
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
