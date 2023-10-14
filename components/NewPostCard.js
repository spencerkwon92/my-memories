import React, {useCallback, useState} from "react";
import { css } from "@emotion/react";
import {Spacer as ChakraSpacer, Link, Center, Card, CardHeader, Avatar, Box, Heading, CardBody, Button, Flex, CardFooter, Image, Divider, IconButton, MenuList, MenuItem, Menu, MenuButton} from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux'
import {BiLike, BiChat, BiShare, BiSolidLike  } from 'react-icons/bi'
import PropTypes from 'prop-types'

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
            <Flex flex="1" alignItems="center" flexWrap="wrap">
              <Flex alignItem="center" gap="4">
                <Avatar name={post?.User?.nickname} src={post.User.ProfileImage?`http://localhost:3065/${post.User.ProfileImage?.src}`:null} />
                <Center>
                  <Link fontWeight='bold' fontSize='15px' href={`/user/${post.User?.id}`}>{post?.User?.nickname}</Link>
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

NewPostCard.propTypes = {
  post: PropTypes.object.isRequired,
}
