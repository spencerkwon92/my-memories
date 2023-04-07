import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Avatar, Popover, List, Comment } from "antd";
import PropTypes from "prop-types";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";

import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";
import FollowButton from "./FollowButton";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

export default function PostCard({ post }){
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me && state.user.id);
  const [isLiked, setIsLiked] = useState(false);

  const onToggleLink = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const actionArray = [
    <RetweetOutlined key="retweet" />,
    isLiked ? (
      <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
    ) : (
      <HeartOutlined key="message" onClick={onToggleComment} />
    ),
    <Popover
      key="ellipsis"
      content={
        <Button.Group>
          {id && post.User.id === id ? (
            <>
              <Button>수정</Button>
              <Button type="danger">삭제</Button>
            </>
          ) : (
            <Button>신고</Button>
          )}
        </Button.Group>
      }
    >
      <EllipsisOutlined />
    </Popover>,
  ];

  return (
    <CardWrapper kye={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Image} />}
        action={actionArray}
        extra={<FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
        {commentFormOpened && (
          <>
            <CommentForm post={post} />
            <List
              header={`${post.Comments.length} 댓글`}
              itemLayout="horizontal"
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={
                      <Link
                        href={{
                          pathname: "/user",
                          query: { id: item.User.id },
                        }}
                        as={`/user/${item.User.id}`}
                      >
                        <a>
                          <Avatar>{item.User.nickname[0]}</Avatar>
                        </a>
                      </Link>
                    }
                    content={item.content}
                  />
                </li>
              )}
            />
          </>
        )}
      </Card>
    </CardWrapper>
  );
};
