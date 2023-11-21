import React, { useCallback } from "react";
import { css } from "@emotion/react";
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
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

import { logoutRequestAction } from "../../reducers/user";
import RelationNameCard from "./RelationNameCard";
import { default as CustomSpacer } from "../CustomizedUI/Spacer";
import { logOut } from "../../reducers/user";
import { userState } from "../../recoil";
import { useRecoilValue } from "recoil";

const flexCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    margin-left: 10px;
    > a {
      font-weight: bold;
    }
  }
`;

const lineMesCss = css`
  color: rgb(130, 129, 129);
`;

function UserProfile() {
  // const { me } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    // dispatch(logOut());
    console.log("test!!");
  }, []);

  const { me } = useRecoilValue(userState);

  return (
    <>
      <div css={flexCss}>
        <Avatar
          name={me?.nickname}
          bgColor="gray"
          size="lg"
          src={me.ProfileImage ? me.ProfileImage?.src : null}
        />
        <div>
          <Link href={`/user/${me?.id}`}>
            <a>{me?.nickname}</a>
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
            <Link href="/profile">
              <MenuItem as="a">프로필 관리</MenuItem>
            </Link>
            <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
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
        {me?.Followers?.map((follower) => {
          return (
            <div key={follower.id}>
              <RelationNameCard user={follower} />
              <CustomSpacer />
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default UserProfile;
