import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Heading, Center, SimpleGrid } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import UserHeader from "../../components/userProfile/UserHeader";
import AppLayout from "../../components/layout/AppLayout";
import Spacer from "../../components/CustomizedUI/Spacer";
import ProfilePostCard from "../../components/userProfile/ProfilePostCard";
import {
  UserPostsLoadingIndicator,
  UserHeaderIndicator,
} from "../../components/layout/PageLoadingIndicator";

import { useLoadUserPosts } from "../../hooks/postAction";
import { useLoadMyInfo, useLoadUser } from "../../hooks/userAction";

export default function UserPage() {
  const [{ me }, loadMyInfoLoading] = useLoadMyInfo();
  const router = useRouter();
  const { id } = router.query;
  const isSameUser = me?.id === id;
  const [{ userInfo }, loadUserInfoLoading] = useLoadUser(id, isSameUser);

  const [
    postStateBlock,
    loadNextPosts,
    hasMorePosts,
    loadUserPostsLoading,
    loadUserPostsError,
  ] = useLoadUserPosts(id);
  const { mainPosts } = postStateBlock;
  const [ref, inView] = useInView();

  useEffect(() => {
    if (typeof me === "undefined") {
      alert("로그인이 필요합니다!!");
      Router.push("/login");
    }
  }, [me]);

  useEffect(() => {
    if (inView && hasMorePosts && !loadUserPostsLoading) {
      loadNextPosts();
    }
  }, [inView, mainPosts, hasMorePosts, loadUserPostsLoading, id]);

  return (
    <AppLayout>
      {loadMyInfoLoading || loadUserInfoLoading ? (
        <UserHeaderIndicator />
      ) : (
        <UserHeader user={me?.id === parseInt(id, 10) ? me : userInfo} />
      )}
      <Spacer size={20} />
      {loadUserPostsLoading ? (
        <UserPostsLoadingIndicator />
      ) : mainPosts.length === 0 ? (
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
        ref={hasMorePosts && !loadUserPostsLoading ? ref : undefined}
        style={{ height: 2 }}
      />
    </AppLayout>
  );
}
export function reportWebVitals(metric) {
  console.log(metric);
}
