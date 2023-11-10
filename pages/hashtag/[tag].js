import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Heading, Center } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import PostCard from "../../components/post/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/layout/AppLayout";
import Spacer from "../../components/CustomizedUI/Spacer";
import { loadMyInfo } from "../../reducers/user";
import { loadHashtagPosts } from "../../reducers/post";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadHashtagPosts({ data: tag, lastId: lastId }));
    }
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
      <div
        ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
        style={{ height: 2 }}
      />
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

      await store.dispatch(loadMyInfo());
      await store.dispatch(loadHashtagPosts({ data: tag }));

      return { props: {} };
    }
);
