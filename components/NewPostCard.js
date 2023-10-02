import React, {useCallback, useState} from "react";
import { css } from "@emotion/react";
import {Card, CardHeader, Avatar, Box, Heading, CardBody, Button, Flex, CardFooter, Image, Divider, IconButton} from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux'
import {BiLike, BiChat, BiShare, BiSolidLike } from 'react-icons/bi'

import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import PostImages from './PostImages'
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST} from "../reducers/post";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import useContainer from '../hooks/useContainer'
import Spacer from "./CustomizedUI/Spacer"

const commentListCss=css`
  margin: 0px 10px;
`

export default function NewPostCard({post}) {
  const [shewCommentForm, setShowCommentForm] = useState(false)
  const dispatch = useDispatch()
  const {me} = useSelector((state)=>state.user)
  const id = me?.id
  const isMobile = useContainer({default: false, md:true})
  const liked = post.Likers.find((liker)=>liker.id === id)

  const likedHandle = useCallback(()=>{
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
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

  return (
    <>
      <Card variant="outline">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={post?.User?.nickname} />
              <Box>
                <Heading size="sm">{post?.User?.nickname}</Heading>
              </Box>

              {me && <FollowButton post={post} />}
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <PostCardContent postData={post.content} />
        </CardBody>
        {post.Images[0] && <PostImages images={post.Images} />}
        {/* <Image
        objectFit='cover'
        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Chakra UI'
      /> */}

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
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
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
              <IconButton variant="ghost" icon={<BiShare />} />
            </>
          )}
        </CardFooter>
        {shewCommentForm && (
          <div css={commentListCss}>
            <Divider />
            <Spacer />
            <CommentList comments={post?.Comments} />
            <CommentForm post={post} />
          </div>
        )}
      </Card>

      <Spacer size="lg" />
    </>
  );
}
