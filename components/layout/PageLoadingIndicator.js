import React from "react";
import {
  Container,
  HStack,
  Skeleton,
  Spacer as ChakraSpacer,
  Divider,
  Card,
  SkeletonCircle,
  SkeletonText,
  Center,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Spacer from "../CustomizedUI/Spacer";

import useContainer from "../../hooks/useContainer";

export function UserInfoLoadingIndicator() {
  return (
    <>
      <Card maxW="container.lg" p="5">
        <HStack>
          <SkeletonCircle size="10" />
          <Skeleton height="15px" width="200px" />
          <ChakraSpacer />
        </HStack>
      </Card>
      <Spacer />
      <Card maxW="container.lg" p="5">
        <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
      </Card>
    </>
  );
}

export function PostLoadingIndicator() {
  return (
    <Container maxW="container.lg" p="5">
      <CardSkeleton />
      <Spacer size={15} />
      <CardSkeleton hasImage />
      <Spacer size={15} />
      <CardSkeleton />
    </Container>
  );
}

export function UserHeaderIndicator() {
  const isMobile = useContainer({ default: false, md: true });

  return (
    <Center>
      <HStack gap="5">
        {!isMobile && <SkeletonCircle size="100" />}
        <VStack>
          <HStack>
            <Skeleton height="20px" width="200px" />
            <Skeleton height="40px" width="100px" />
          </HStack>
          <Skeleton height="20px" width="300px" />
          <Skeleton height="20px" width="300px" />
        </VStack>
      </HStack>
    </Center>
  );
}

export function UserPostsLoadingIndicator() {
  const isMobile = useContainer({ default: false, md: true });

  return (
    <SimpleGrid columns={3} spacing={1}>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      <Card>
        <Skeleton height={isMobile ? "100px" : "300px"} />
      </Card>
      {isMobile && (
        <>
          <Card>
            <Skeleton height="100px" />
          </Card>
          <Card>
            <Skeleton height="100px" />
          </Card>
          <Card>
            <Skeleton height="100px" />
          </Card>
        </>
      )}
    </SimpleGrid>
  );
}

export function PageLoadingIndicator() {
  const isMobile = useContainer({ default: false, md: true });
  return (
    <Container maxW="container.lg" p="5">
      <HStack>
        <Skeleton height="40px" width="100px" />
        <ChakraSpacer />
        {!isMobile && (
          <>
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
          </>
        )}
      </HStack>
      <Spacer />
      <Divider />
      <Spacer />
      <CardSkeleton />
      <Spacer size={15} />
      <CardSkeleton hasImage />
      <Spacer size={15} />
      <CardSkeleton />
    </Container>
  );
}

function CardSkeleton({ hasImage }) {
  return (
    <Card p="5">
      <HStack>
        <SkeletonCircle size="10" />
        <Skeleton height="15px" width="100px" />
        <ChakraSpacer />
        <Skeleton height="30px" width="30px" />
      </HStack>
      <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
      <Spacer />

      {hasImage && (
        <Center>
          <Skeleton width="70vw" height="40vh" />
        </Center>
      )}
    </Card>
  );
}
