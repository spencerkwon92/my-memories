import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import Router from "next/router";

import UserHeader from "./components/UserHeader";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

export default function UserPage() {
  const { me } = useSelector((state) => state.user);
  const { userPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (typeof me === "undefined" || typeof userPosts === "undefined") {
      alert("로그인이 필요합니다.");
      Router.push("/");
    }
  }, [me, userPosts]);

  return (
    <AppLayout>
      <UserHeader me={me} />
      {userPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
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

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
