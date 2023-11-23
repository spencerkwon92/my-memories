import React, { useCallback } from "react";
import {
  Avatar,
  Center,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import useContainer from "../../hooks/useContainer";
import Spacer from "../CustomizedUI/Spacer";
import { userState } from "../../recoil";

function UserHeader({ user }) {
  const isMobile = useContainer({ default: false, md: true });
  const { me } = useRecoilValue(userState);
  const router = useRouter();

  const onClickHandler = useCallback(() => {
    router.push("/profile");
  }, []);

  const FollowDashboard = (
    <HStack gap={isMobile ? "30px" : "15px"}>
      <Text fontSize="xl" fontWeight="bold" margin="0">
        게시물 {user?.Posts.length}
      </Text>
      <Text fontSize="xl" fontWeight="bold" margin="0">
        팔로워 {user?.Followers.length}
      </Text>
      <Text fontSize="xl" fontWeight="bold" margin="0">
        팔로우 {user?.Followings.length}
      </Text>
    </HStack>
  );

  return (
    <>
      <Center gap={isMobile ? "30px" : "50px"}>
        <Avatar
          name={user?.nickname}
          bgColor="gray"
          size={isMobile ? "xl" : "2xl"}
          src={user?.ProfileImage ? user.ProfileImage?.src : null}
        />
        <VStack align="right">
          <HStack gap={isMobile ? "10px" : "20px"}>
            <Text
              fontSize={isMobile ? "xl" : "3xl"}
              fontWeight="bold"
              margin="0"
            >
              {user?.nickname}
            </Text>
            {me?.id === user?.id && (
              <Button size="sm" onClick={onClickHandler}>
                프로필 수정
              </Button>
            )}
          </HStack>
          <Text fontSize="xl" margin="0">
            {user?.email}
          </Text>
          {!isMobile && FollowDashboard}
        </VStack>
      </Center>
      <Spacer />
      <Divider />
      {isMobile && (
        <>
          <Spacer size={20} />
          <Center>{FollowDashboard}</Center>
        </>
      )}
    </>
  );
}

UserHeader.propTypes = {
  user: PropTypes.object,
};

export default UserHeader;
