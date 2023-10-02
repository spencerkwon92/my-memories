import { Card, Button } from "antd";
import {css} from '@emotion/react'
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Divider,
  Center,
  Container,
  Heading,
  Link,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Router from "next/router";

import { logoutRequestAction } from "../reducers/user";
import RelationNameCard from "./RelationNameCard";
import { LOAD_FOLLOWERS_REQUEST } from "../reducers/user";
import {default as CustomSpacer} from "./CustomizedUI/Spacer";

const flexCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    padding-top: 10px;
    margin-left: 10px;
  }
`;

const lineMesCss = css`
  color: rgb(130, 129, 129);
`;

const UserProfile = () => {
  const { me, logoutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const profileButtonHandler = useCallback(()=>{
    Router.push('/profile')
  },[])

  return (
    <>
      <div css={flexCss}>
        <Avatar name={me.nickname} bgColor="gray" size="lg" />
        <div>
          <Link fontWeight="bold" href={`/user/${me?.id}`}>
            {me.nickname}
          </Link>
          <Text fontSize="sm">{me.email}</Text>
        </div>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={onLogOut} loading={logoutLoading}>
              로그아웃
            </MenuItem>
            <MenuItem onClick={profileButtonHandler}>프로필 관리</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <Center height="15px">
        <Divider />
      </Center>
      <Container>
        <Heading size="md">Following List</Heading>
        <div
          css={lineMesCss}
        >{`${me?.nickname}님을 팔로우 하는 사용자들입니다.`}</div>
        <CustomSpacer />
        {me?.Followers.map((follower) => {
          return (
            <>
              <RelationNameCard key={follower.id} user={follower} />
              <CustomSpacer />
            </>
          );
        })}
      </Container>
    </>
    //TODO: Add following, follower, post count
  );

  // return (
  //   <Card
  //     actions={[
  //       <div key="twit">
  //         포스트
  //         <br />
  //         {me.Posts.length}
  //       </div>,
  //       <div key="following">
  //         팔로잉
  //         <br />
  //         {me.Followings.length}
  //       </div>,
  //       <div key="follower">
  //         팔로워
  //         <br />
  //         {me.Followers.length}
  //       </div>,
  //     ]}
  //   >
  //     <Card.Meta
  //       avatar={<Avatar>{me.nickname[0]}</Avatar>}
  //       title={me.nickname}
  //     />
  //     <Button onClick={onLogOut} loading={logoutLoading}>
  //       로그아웃
  //     </Button>
  //   </Card>
  // );
};

export default UserProfile;
