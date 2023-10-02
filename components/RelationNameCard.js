import React, {useCallback} from "react";
import {
  Flex,
  Avatar,
  Box,
  Text,
  Center,
  Spacer,
  Link,
  Container,
} from "@chakra-ui/react";
import {useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";
import {css} from '@emotion/react'

//TODO: Add Go to page && Change the ugly layout!

const mainCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: bold;
  }
`;

export default function RelationNameCard({ user }) {
  const dispatch = useDispatch();
  const {me} = useSelector((state)=>state.user)
  const id = user?.id
  const isFollowing = me?.Followings.find((following)=>following.id === id)

  const onFollowingHandle = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: id,
      });
    }
  }, [isFollowing]);
  

  return (
    <div css={mainCss}>
      <div>
        <Avatar name={user?.nickname} bgColor="gray" size="md" />
        <Link href={`/user/${id}`}>{user?.nickname}</Link>
      </div>
      <Link color="blue" onClick={onFollowingHandle}>
        {isFollowing? "Unfollow" : "Follow"}
      </Link>
    </div>
  );
}
