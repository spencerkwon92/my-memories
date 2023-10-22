import React, {useCallback, useState} from "react";
import { css } from "@emotion/react";
import {Spacer as ChakraSpacer, Center, Card, CardHeader, Avatar, CardBody, Button, Flex, CardFooter, Divider, IconButton} from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux'
import {BiLike, BiChat, BiShare, BiSolidLike  } from 'react-icons/bi'
import PropTypes from 'prop-types'
import Link from 'next/link'

import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import PostImages from './PostImages'
import {
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import useContainer from '../hooks/useContainer'
import Spacer from "./CustomizedUI/Spacer"
import PostMenuButton from "./CustomizedUI/PostMenuButton";

const commentListCss=css`
  margin: 0px 10px;
`
const ankerCss = css`
  font-weight: bold;
  font-size: 15px;
`

function PostCard({post}) {
  const [shewCommentForm, setShowCommentForm] = useState(false)
  const dispatch = useDispatch()
  const {me} = useSelector((state)=>state.user)
  const id = me?.id
  const isMobile = useContainer({default: false, md:true})
  const liked = post.Likers.find((liker)=>liker.id === id)

  const likedHandle = useCallback(()=>{
    if(!me){
      alert('좋아요를 누르시려면 로그인이 필요합니다.')
    }else{
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }

  },[])

  const unlikedHandle = useCallback(()=>{
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  },[])

  const onToggleComment = useCallback(()=>{
    setShowCommentForm((prev)=>!prev)
  },[])

  const onShareClick = useCallback(()=>{
    alert('열심히 만들고 있습니다!🖥️')
    // const urlForCopy = `https://mymemories/post/${post.id}`;
    // if (navigator.share) {
    //   navigator
    //     .share({
    //       title: "기록하며 성장하기",
    //       text: "Hello World",
    //       url: urlForCopy,
    //     })
    //     .then(() => console.log("공유 성공"))
    //     .catch((error) => console.log("공유 실패", error));
    // }
  },[])

  return (
    <>
      <Card>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" alignItems="center" flexWrap="wrap">
              <Flex alignItems="center" gap="4">
                <Avatar
                  name={post?.User?.nickname}
                  src={
                    post.User.ProfileImage ? post.User.ProfileImage?.src : null
                  }
                />
                <Center>
                  <Link href={`/user/${post.User?.id}`}>
                    <a css={ankerCss}>
                      {post?.User?.nickname}
                    </a>
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
          <PostCardContent postContent={post.content} />
        </CardBody>
        {post.Images[0] && <PostImages images={post.Images} />}

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
          <div css={commentListCss}>
            <Divider />
            <Spacer />
            <CommentList comments={post?.Comments} postUserId={post?.UserId} />
            <CommentForm post={post} />
          </div>
        )}
      </Card>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostCard;