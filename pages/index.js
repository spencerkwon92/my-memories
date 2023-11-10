import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Grid, GridItem, Card, Center, Link } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";
import AppLayout from "../components/layout/AppLayout";
import wrapper from "../store/configureStore";
import UserProfile from "../components/homeProfileSection/UserProfile";
import useContainer from "../hooks/useContainer";
import Spacer from "../components/CustomizedUI/Spacer";
import { loadMyInfo, loadFollowers, loadFollowings } from "../reducers/user";
import { loadPosts } from "../reducers/post";

function Home() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPosts(lastId));
    }
  }, [inView, mainPosts, hasMorePosts, loadPostsLoading]);

  const isMobile = useContainer({ default: false, md: true });

  return (
    <AppLayout>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        <GridItem colSpan={isMobile ? 6 : 4}>
          {me && <PostForm />}
          {mainPosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
              <Spacer size={20} />
            </div>
          ))}
          <div
            ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
            style={{ height: 2 }}
          />
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={2}>
            {me ? (
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      await store.dispatch(loadMyInfo());
      await store.dispatch(loadPosts());
      await store.dispatch(loadFollowers());
      await store.dispatch(loadFollowings());
      console.log(store.getState());
    }
);

export function reportWebVitals(metric) {
  console.log(metric);
}

export default Home;
