import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Heading, Center } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import PostCard from "../../components/post/PostCard";
import AppLayout from "../../components/layout/AppLayout";
import Spacer from "../../components/CustomizedUI/Spacer";
import { useHashtagPosts } from "../../hooks/postAction";
import { useLoadMyInfo } from "../../hooks/userAction";

export default function TagPage() {
  const [{ me }] = useLoadMyInfo();
  const router = useRouter();
  const { tag } = router.query;

  const [{ mainPosts }, loadNextPosts, hasMorePosts, loadHashtagPostsLoading] =
    useHashtagPosts(tag);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadHashtagPostsLoading) {
      loadNextPosts();
    }
  }, [mainPosts, hasMorePosts, loadHashtagPostsLoading, inView]);

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
        ref={hasMorePosts && !loadHashtagPostsLoading ? ref : undefined}
        style={{ height: 2 }}
      />
    </AppLayout>
  );
}
