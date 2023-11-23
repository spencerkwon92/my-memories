import React, { useEffect } from "react";
import { Grid, GridItem, Card, Center, Link } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";
import AppLayout from "../components/layout/AppLayout";
import UserProfile from "../components/homeProfileSection/UserProfile";
import useContainer from "../hooks/useContainer";
import Spacer from "../components/CustomizedUI/Spacer";
import { useLoadPosts } from "../hooks/postAction";
import { useLoadMyInfo, useLoadFullMyInfo } from "../hooks/userAction";
import {
  UserInfoLoadingIndicator,
  PostLoadingIndicator,
} from "../components/layout/PageLoadingIndicator";

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
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
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
            {loadMyFullInfoLoading ? (
              <UserInfoLoadingIndicator />
            ) : me ? (
              <UserProfile />
            ) : (
              <Card>
                <Center h="10vh">
                  <Link href="/login">로그인 하려면 클릭하세요!</Link>
                </Center>
              </Card>
            )}
          </GridItem>
        )}
      </Grid>
    </AppLayout>
  );
}

export default Home;
