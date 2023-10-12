import React,{useEffect} from 'react'
import {useRouter} from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { END } from "redux-saga";
import {Text, Center} from '@chakra-ui/react'

import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user'
import NewPostCard from '../../components/NewPostCard'
import wrapper from '../../store/configureStore'
import AppLayout from '../../components/AppLayout';
import Spacer from '../../components/CustomizedUI/Spacer';

export default function TagPage(){
  const router = useRouter()
  const {tag} = router.query
  const dispatch = useDispatch()
  const {mainPosts, hasMorePosts, loadPostsLoading,} = useSelector((state) => state.post);

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


  return (
    <AppLayout>

      {mainPosts.map((post) => (
        <>
          <NewPostCard key={post.id} post={post} />
          <Spacer/>
        </>
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      const {tag} = params
      const { user } = store.getState();
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
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