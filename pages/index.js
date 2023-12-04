import React, { useEffect } from "react";
import { Grid, GridItem, Card, Center, Link } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { QueryClient, dehydrate } from "react-query";
import axios from "axios";

import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";
import AppLayout from "../components/layout/AppLayout";
import UserProfile from "../components/homeProfileSection/UserProfile";
import useContainer from "../hooks/useContainer";
import { useLoadPosts } from "../hooks/postAction";
import { useLoadFullMyInfo } from "../hooks/userAction";
import {
  UserInfoLoadingIndicator,
  PostLoadingIndicator,
} from "../components/layout/PageLoadingIndicator";
import { loadPostsAPI } from "../apis/post";
import {
  loadMyInfoAPI,
  loadFollowersAPI,
  loadFollowingsAPI,
} from "../apis/user";

function Home() {
  const isMobile = useContainer({ default: false, md: true });
  const [{ me }, , , loadMyFullInfoLoading] = useLoadFullMyInfo();
  const [{ mainPosts }, loadNextPosts, hasMorePosts, loadPostsLoading] =
    useLoadPosts();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      loadNextPosts();
    }
  }, [inView, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      <Grid templateColumns="repeat(6, 1fr)" gap={7}>
        <GridItem colSpan={isMobile ? 6 : 4}>
          {me && <PostForm />}
          {loadPostsLoading ? (
            <PostLoadingIndicator />
          ) : (
            mainPosts?.map((post) => (
              <div key={post?.id}>
                <PostCard post={post} />
              </div>
            ))
          )}
          <div
            ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
            style={{ height: 2 }}
          />
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={2}>
            {loadMyFullInfoLoading && me === null ? (
              <UserInfoLoadingIndicator />
            ) : !me && !loadMyFullInfoLoading ? (
              <Card>
                <Center h="10vh">
                  <Link href="/login">로그인 하려면 클릭하세요!</Link>
                </Center>
              </Card>
            ) : (
              <UserProfile />
            )}
          </GridItem>
        )}
      </Grid>
    </AppLayout>
  );
}

export const getServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const queryClient = new QueryClient();

  Promise.all([
    queryClient.prefetchQuery("user", () => loadMyInfoAPI()),
    queryClient.prefetchQuery("followers", () => loadFollowersAPI()),
    queryClient.prefetchQuery("followings", () => loadFollowingsAPI()),
    queryClient.prefetchInfiniteQuery("posts", () => loadPostsAPI()),
  ]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
