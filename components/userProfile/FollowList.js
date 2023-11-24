import React from "react";
import { Heading, VStack, Center, Text, Box, Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";

import useContainer from "../../hooks/useContainer";
import RelationNameCard from "../homeProfileSection/RelationNameCard";
import { css } from "@emotion/react";
import Spacer from "../CustomizedUI/Spacer";
import { userState } from "../../recoil";

const listCss = css`
  height: 100vh;
  overflow-y: hidden;
  :hover {
    overflow-y: auto;
  }
`;

function FollowList({ type, header }) {
  const isMobile = useContainer({ default: false, md: true });
  const { me } = useRecoilValue(userState);

  return (
    <Box shadow="md" borderWidth="1px" p="20px">
      <VStack align="left" h="50vh">
        <Center>
          <Heading size={isMobile ? "sm" : "md"}>{header}</Heading>
        </Center>
        {type === "following" ? (
          <Text margin="0">{`${me?.nickname}님이 팔로잉 하고 있는 사용자들 입니다.`}</Text>
        ) : (
          <Text margin="0">{`${me?.nickname}님을 팔로우 하고 있는 사용자들 입니다.`}</Text>
        )}
        <Divider />
        <div className="listContent" css={listCss}>
          {type === "following"
            ? me?.Followings?.map((following) => (
                <div key={following.id}>
                  <RelationNameCard user={following} />
                  <Spacer />
                </div>
              ))
            : me?.Followers?.map((follower) => (
                <div key={follower.id}>
                  <RelationNameCard user={follower} />
                  <Spacer />
                </div>
              ))}
        </div>
      </VStack>
    </Box>
  );
}

FollowList.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};

export default FollowList;
