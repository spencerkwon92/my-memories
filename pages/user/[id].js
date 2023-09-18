import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import Router, {useRouter} from "next/router";
import { useDispatch } from "react-redux";

import UserHeader from "./components/UserHeader";
import {LOAD_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, LOAD_FOLLOWERS_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import NewPostCard from '../../components/NewPostCard'

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
      Router.push("/");
    }
  }, [me]);

  useEffect(()=>{
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    })

    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
  },[id]) 


  const myPosts = mainPosts.filter((post)=> post.User.id === parseInt(id))

  return (
    <AppLayout>
      <UserHeader user={me?.id === userInfo?.id ? me : userInfo} />
      {myPosts?.map((post) => (
        <NewPostCard key={post.id} post={post} />
      ))}
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

      // store.dispatch({
      //   type: LOAD_MY_INFO_REQUEST,
      // });

      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      })

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
