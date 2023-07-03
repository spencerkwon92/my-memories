import React from "react";
import {
  Avatar,
  Center,
  Stack,
  Heading,
  Spacer,
  Text,
  Box,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";

export default function UserHeader({ me }) {
  return (
    <>
      <Center gap="50px">
        <Avatar name={me?.nickname} bgColor="gray" size="2xl" />
        <VStack spacing={1} align="right">
          <Heading>{me?.nickname}</Heading>
          <HStack>
            <Text fontSize="xl" fontWeight="bold">
              게시물 {me?.Posts.length}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              팔로워 {me?.Followers.length}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              팔로우 {me?.Followings.length}
            </Text>
          </HStack>
          <Text fontSize="xl" fontWeight="bold">
            {me?.email}
          </Text>
        </VStack>
      </Center>
      <Divider />
    </>
  );
}
