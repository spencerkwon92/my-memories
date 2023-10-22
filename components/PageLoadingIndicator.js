import React from 'react'
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
} from "@chakra-ui/react";
import Spacer from './CustomizedUI/Spacer'

import useContainer from '../hooks/useContainer';

function PageLoadingIndicator() {
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

function CardSkeleton({hasImage}){
  return (
    <Card p="5">
      <HStack>
        <SkeletonCircle size="10" />
        <Skeleton height="15px" width="100px" />
        <ChakraSpacer/>
        <Skeleton height="30px" width="30px" />
      </HStack>
      <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
      <Spacer/>

      {hasImage&&
        <Center>
          <Skeleton width='70vw' height='40vh'/>
        </Center>
      }
    </Card>
  );
}

export default PageLoadingIndicator