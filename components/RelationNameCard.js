import React from "react";
import {
  Flex,
  Avatar,
  Box,
  Text,
  Center,
  Spacer,
  Link,
} from "@chakra-ui/react";

//TODO: Add Go to page && Change the ugly layout!
export default function RelationNameCard({ user }) {
    
  return (
    <Center>
      <Avatar name={user?.nickname} bgColor="gray" size="md" />
      <Center padding={10}>
        <Text fontWeight="bold">{user?.nickname}</Text>
      </Center>
      <Spacer />
      <Center>
        <Link color="blue" href={`/user/${user?.id}`}>
          Visit
        </Link>
      </Center>
    </Center>
  );
}
