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

export default function UserHeader({ user }) {
  return (
    <>
      <Center gap="50px">
        <Avatar name={user?.nickname} bgColor="gray" size="2xl" />
        <VStack spacing={1} align="right">
          <Heading>{user?.nickname}</Heading>
          <HStack>
            <Text fontSize="xl" fontWeight="bold">
              게시물 {user?.Posts.length}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              팔로워 {user?.Followers.length}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              팔로우 {user?.Followings.length}
            </Text>
          </HStack>
          <Text fontSize="xl" fontWeight="bold">
            {user?.email}
          </Text>
        </VStack>
      </Center>
      <Divider />
    </>
  );
}
