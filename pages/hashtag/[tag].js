import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import { Heading, Center } from "@chakra-ui/react";

import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import PostCard from "../../components/post/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/layout/AppLayout";
import Spacer from "../../components/CustomizedUI/Spacer";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading, tag]);

  if (mainPosts.length === 0) {
    return (
      <AppLayout>
        <Center h="80vh">
          <Heading size="lg">{`${tag}와/과 관련된 메모리가 없네요😭`}</Heading>
        </Center>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {mainPosts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
          <Spacer />
        </div>
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const { tag } = params;
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      req && cookie && (axios.defaults.headers.Cookie = cookie);

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
