import React, { useCallback, useState } from "react";
import { css } from "@emotion/react";
import {
  Spacer as ChakraSpacer,
  Center,
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Button,
  Flex,
  CardFooter,
  Divider,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare, BiSolidLike } from "react-icons/bi";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { useMutation } from "react-query";

import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import useContainer from "../../hooks/useContainer";
import Spacer from "../CustomizedUI/Spacer";
import PostMenuButton from "../post/PostMenuButton";
import { likePostAPI, unLikePostAPI } from "../../apis/post";

import { userState, postState } from "../../recoil";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import produce from "../../util/produce";

const ankerCss = css`
  font-weight: bold;
  font-size: 15px;
`;

const imageCss = css`
  :hover {
    cursor: pointer;
  }
`;

function PostCard({ post }) {
  const [shewCommentForm, setShowCommentForm] = useState(false);
  const { me } = useRecoilValue(userState);
  const id = me?.id;
  const isMobile = useContainer({ default: false, md: true });
  const liked = post?.Likers?.find((liker) => liker.id === id);
  const [copyAlert, setCopyAlert] = useState(false);
  const postStateSetter = useSetRecoilState(postState);

  const likePostMutation = useMutation("posts", likePostAPI, {
    onMutate() {
      console.log("likePost Start!");
    },
    onSuccess(data) {
      postStateSetter((prev) =>
        produce(prev, (draft) => {
          const post = draft.mainPosts.find((post) => post.id == data.PostId);
          post.Likers.push({ id: data?.UserId });
        })
      );
    },
    onSettled() {
      console.log("likePost End!");
    },
  });

  const unLikePostMutation = useMutation("posts", unLikePostAPI, {
    onMutate() {
      console.log("unLikePost Start!");
    },
    onSuccess(data) {
      postStateSetter((prev) =>
        produce(prev, (draft) => {
          const post = draft.mainPosts.find((post) => post.id === data.PostId);
          post.Likers = post.Likers.filter((liker) => liker.id !== data.UserId);
        })
      );
    },
    onSettled() {
      console.log("unLikePost End!");
    },
  });

  const likedHandle = useCallback(() => {
    if (!me) {
      alert("좋아요를 누르시려면 로그인이 필요합니다.");
    } else {
      likePostMutation.mutate(post.id);
    }
  }, [likePostMutation]);

  const unlikedHandle = useCallback(() => {
    unLikePostMutation.mutate(post.id);
  }, [unLikePostMutation]);

  const onToggleComment = useCallback(() => {
    setShowCommentForm((prev) => !prev);
  }, []);

  const fadeInOut = useSpring({
    opacity: copyAlert ? 1 : 0,
    config: { duration: 500 },
  });
  const fadeInUpForComment = useSpring({
    margin: "0px 10px",
    opacity: shewCommentForm ? 1 : 0,
    transform: shewCommentForm ? "translateY(0%)" : "translateY(-30%)",
    config: { duration: 150 },
  });

  const onShareClick = useCallback(() => {
    const url = window.location.href + `post/${post.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyAlert(true);
        setTimeout(() => {
          setCopyAlert(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Could not copy Text:", err);
      });
  }, []);

  return (
    <>
      {copyAlert && (
        <animated.div style={fadeInOut}>
          <Alert status="success">
            <AlertIcon />
            포스트가 링크가 복사되었어요!!
          </Alert>
        </animated.div>
      )}
      <Card>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" alignItems="center" flexWrap="wrap">
              <Flex alignItems="center" gap="4">
                <Avatar
                  name={post?.User?.nickname}
                  src={
                    post?.User?.ProfileImage
                      ? post?.User?.ProfileImage?.src
                      : null
                  }
                />
                <Center>
                  <Link href={`/user/${post?.User?.id}`}>
                    <a css={ankerCss}>{post?.User?.nickname}</a>
                  </Link>
                </Center>
              </Flex>
              <ChakraSpacer />
              {post.User.id === me?.id && <PostMenuButton post={post} />}
              {me && <FollowButton post={post} />}
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <PostCardContent postContent={post?.content} />
        </CardBody>
        {post.Images[0] && <PostImages images={post?.Images} css={imageCss} />}

        <CardFooter justify="space-between" flexWrap="wrap">
          {!isMobile ? (
            <>
              <Button
                flex="1"
                variant="ghost"
                onClick={liked ? unlikedHandle : likedHandle}
                leftIcon={liked ? <BiSolidLike /> : <BiLike />}
              >
                {liked ? "Unlike" : "Like"}
              </Button>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
                onClick={onToggleComment}
              >
                Comment
              </Button>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<BiShare />}
                onClick={onShareClick}
              >
                Share
              </Button>
            </>
          ) : (
            <>
              <IconButton
                icon={liked ? <BiSolidLike /> : <BiLike />}
                variant="ghost"
                onClick={liked ? unlikedHandle : likedHandle}
              />
              <IconButton
                icon={<BiChat />}
                variant="ghost"
                onClick={onToggleComment}
              />
              <IconButton
                variant="ghost"
                icon={<BiShare />}
                onClick={onShareClick}
              />
            </>
          )}
        </CardFooter>
        {shewCommentForm && (
          <animated.div style={fadeInUpForComment}>
            <Divider />
            <Spacer />
            <CommentList comments={post?.Comments} postUserId={post?.UserId} />
            <CommentForm post={post} />
          </animated.div>
        )}
      </Card>
    </>
  );
}
PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
