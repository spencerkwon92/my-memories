import React, { useCallback } from "react";
import {
  Box,
  Grid,
  Avatar,
  GridItem,
  Divider,
  Text,
  HStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

import useContainer from "../../hooks/useContainer";
import PostImages from "../post/PostImages";
import CommentList from "../post/CommentList";
import CommentForm from "../post/CommentForm";
import Spacer from "../CustomizedUI/Spacer";
import PostCardContent from "../post/PostCardContent";

const boxCss = css`
  width: 100%;
  padding: 0px;
`;

function ProfilePostCard({ post = {} }) {
  const isMobile = useContainer({ default: false, md: true });

  const updatedImages = post.Images.map((image) => {
    return {
      ...image,
      src: image.src.replace(/\/resizedPostImages\//, "/postImages/"),
    };
  });

  return (
    <Box css={boxCss}>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem colSpan={4}>
          <PostImages images={updatedImages} label="userPostImages" />
        </GridItem>
        <GridItem colSpan={2} margin="40px 5px 0px 5px">
          <Box position="relative" h="75vh">
            <Box position="absolute" w="100%">
              <HStack>
                <Avatar
                  size="md"
                  name={post.User.nickname}
                  src={post.User.ProfileImage.src}
                />
                <Text fontWeight="bold">{post.User.nickname}</Text>
              </HStack>
              <Spacer />
              <PostCardContent postContent={post.content} />
              <Spacer />

              <Divider />
              <Spacer />
              <CommentList
                comments={post?.Comments}
                postUserId={post?.UserId}
              />
            </Box>
            <Box position="absolute" top="100%" w="100%">
              <CommentForm post={post} />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ProfilePostCard;
