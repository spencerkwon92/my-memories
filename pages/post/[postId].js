import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Flex, Heading, Center } from "@chakra-ui/react";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { pageUrl } from "../../config/config";
import AppLayout from "../../components/layout/AppLayout";
import wrapper from "../../store/configureStore";
import PostCard from "../../components/post/PostCard";
import Spacer from "../../components/CustomizedUI/Spacer";
import { postState } from "../../recoil";
import { loadPostAPI } from "../../apis/post";
import produce from "../../util/produce";

function UserPost() {
  const [{ singlePost }, setPostState] = useRecoilState(postState);
  const router = useRouter();
  const { postId } = router.query;
  const { data: singlePostData } = useQuery(
    ["singlePost", postId],
    () => loadPostAPI(postId),
    {
      enabled: Boolean(postId),
    }
  );

  useEffect(() => {
    if (singlePostData) {
      setPostState((prev) =>
        produce(prev, (draft) => {
          draft.singlePost = singlePostData;
        })
      );
    }
  }, [singlePostData]);

  const onClickToHome = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost?.User.nickname}
          님의 메모리
        </title>
        <meta name="description" content={singlePost?.content} />
        <meta
          property="og:title"
          content={`${singlePost?.User.nickname}님의 메모리`}
        />
        <meta property="og:description" content={singlePost?.content} />
        <meta
          property="og:image"
          content={
            singlePost?.Images[0]
              ? singlePost.Images[0].src
              : `${pageUrl}/favicon.ico`
          }
        />
        <meta
          property="og:url"
          content={`https://mymemories.kr/post/${postId}`}
        />
      </Head>
      {singlePost && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          align-items="center"
          minHeight="80vh"
        >
          <Center>
            <Heading>{`${singlePost.User.nickname}님의 메모리 입니다.`}</Heading>
          </Center>
          <PostCard post={singlePost} />
          <Spacer size={20} />
          <Center>
            <Button width="50vw" onClick={onClickToHome}>
              더 많은 메모리 보러가기
            </Button>
          </Center>
        </Flex>
      )}
    </AppLayout>
  );
}
export default UserPost;
