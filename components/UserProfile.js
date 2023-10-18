import React, { useCallback } from "react";
import {css} from '@emotion/react'
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Text,
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
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Router from "next/router";
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { logoutRequestAction } from "../reducers/user";
import RelationNameCard from "./RelationNameCard";
import {default as CustomSpacer} from "./CustomizedUI/Spacer";
import {backUrl} from '../config/config'

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

function UserProfile(){
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
        <Avatar
          name={me.nickname}
          bgColor="gray"
          size="lg"
          src={
            me.ProfileImage
              ? `${backUrl}/${me.ProfileImage?.src}`
              : null
          }
        />
        <div>
          <Link as={NextLink} fontWeight='bold' href={`/user/${me?.id}`}>
            {me.nickname}
          </Link>
          <Text fontSize="sm">{me.email}</Text>
        </div>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="profile menu"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={profileButtonHandler}>프로필 관리</MenuItem>
            <MenuItem onClick={onLogOut} loading={logoutLoading}>
              로그아웃
            </MenuItem>
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
  );
};

UserProfile.propTypes = {
  me: PropTypes.object.isRequired,
  logoutLoading: PropTypes.bool.isRequired,
}

export default UserProfile;
