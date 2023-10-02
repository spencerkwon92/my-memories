import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Grid, GridItem, Card, Text, Center, Link } from "@chakra-ui/react";

import NewLoginForm from "../components/NewLoginForm";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import NewPostCard from '../components/NewPostCard'
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import UserProfile from "../components/UserProfile";
import useContainer from '../hooks/useContainer'
import Spacer from "../components/CustomizedUI/Spacer";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            // data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePost, loadPostsLoading, mainPosts]);

  const isMobile = useContainer({default: false, md:true})

  return (
    <AppLayout>
      <Grid templateColumns="repeat(6, 1fr)" gap={3}>
        <GridItem colSpan={isMobile ? 6 : 4}>
          <PostForm />
          {mainPosts.map((post) => (
            <>
              <NewPostCard key={post.id} post={post} />
              <Spacer size='20'/>
              
            </>
          ))}
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={2}>
            {me?<UserProfile />
            :
            <Card>
              <Center>
                <Link href='/login'>Click Here for Log in!</Link>
              </Center>
            </Card>
              }
          </GridItem>
        )}
      </Grid>
    </AppLayout>
  );
};

//It will render those part before rendering the HOME component. || new version has different form.
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      const {user} = store.getState();
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
