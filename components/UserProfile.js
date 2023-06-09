import { Card, Button } from "antd";
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
  Spacer,
  MenuItem,
  Divider,
  Center,
  Container,
  Heading,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { logoutRequestAction } from "../reducers/user";
import RelationNameCard from "./RelationNameCard";
import { LOAD_FOLLOWERS_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const { me, logoutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
  }, []);

  return (
    <>
      <Flex>
        <Avatar name={me.nickname} bgColor="gray" size="lg" />
        <Box ml="3">
          <Link fontWeight="bold" href={`/user/${me?.id}`}>
            {me.nickname}
          </Link>
          <Text fontSize="sm">{me.email}</Text>
        </Box>
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
            <MenuItem onClick={onLogOut} loading={logoutLoading}>
              프로필 관리
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Center height="15px">
        <Divider />
      </Center>
      <Container>
        <Heading size="md">Follower List</Heading>
        {me?.Followers.map((follower) => (
          <RelationNameCard key={follower.id} user={follower} />
        ))}
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
