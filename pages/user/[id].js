import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Heading, Center, SimpleGrid } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import UserHeader from "./components/UserHeader";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/layout/AppLayout";
import Spacer from "../../components/CustomizedUI/Spacer";
import ProfilePostCard from "../../components/userProfile/ProfilePostCard";
import { loadUserPosts } from "../../reducers/post";
import { loadMyInfo, loadUser } from "../../reducers/user";

export default function UserPage() {
  const { me, userInfo } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [ref, inView] = useInView();
  const { id } = router.query;

  useEffect(() => {
    if (typeof me === "undefined") {
      alert("로그인이 필요합니다!!");
      Router.push("/login");
    }
  }, [me]);

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadUserPosts({ userId: id, lastId: lastId }));
    }
  }, [inView, mainPosts, hasMorePosts, loadPostsLoading, id]);

  useEffect(() => {
    if (me?.id !== id) dispatch(loadUser(id));
  }, [id]);

  return (
    <AppLayout>
      <UserHeader user={me?.id === parseInt(id, 10) ? me : userInfo} />
      <Spacer size={20} />
      {mainPosts.length === 0 ? (
        <Center h="50vh">
          <Heading size="lg">메모리가 없습니다.😭</Heading>
        </Center>
      ) : (
        <SimpleGrid columns={3} spacing={1}>
          {mainPosts?.map((post) => (
            <div key={post.id}>
              <ProfilePostCard post={post} />
            </div>
          ))}
        </SimpleGrid>
      )}
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
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      req && cookie && (axios.defaults.headers.Cookie = cookie);

      await store.dispatch(loadMyInfo());
      await store.dispatch(loadUserPosts({ userId: params.id }));

      return {
        props: {},
      };
    }
);

export function reportWebVitals(metric) {
  console.log(metric);
}
