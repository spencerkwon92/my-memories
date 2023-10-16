import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Grid, GridItem, Card, Center, Link } from "@chakra-ui/react";

import PostForm from "../components/PostForm";
import PostCard from '../components/PostCard'
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import UserProfile from "../components/UserProfile";
import useContainer from '../hooks/useContainer'
import Spacer from "../components/CustomizedUI/Spacer";

function Home(){
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
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
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);
  const isMobile = useContainer({ default: false, md: true });

  return (
    <AppLayout>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        <GridItem colSpan={isMobile ? 6 : 4}>
          <PostForm />
          {mainPosts.map((post) => (
            <>
              <PostCard key={post.id} post={post} />
              <Spacer size='20'/>
            </>
          ))}
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={2}>
            {me?<UserProfile />
            :
            <Card>
              <Center h='10vh'>
                <Link href='/login'>로그인 하려면 클릭하세요!</Link>
              </Center>
            </Card>
              }
          </GridItem>
        )}
      </Grid>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });

      store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
      });
      
      store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
