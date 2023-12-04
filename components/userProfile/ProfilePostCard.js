import React, {useCallback} from 'react';
import {Card, Text, Box, CardBody, Center, Image, useDisclosure} from '@chakra-ui/react'
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useContainer from '../../hooks/useContainer';
import PostZoomModal from './PostZoomModal';

const StyledCard = styled(Card)`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 0px;

  .contentPart {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    opacity: 0;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    z-index: 1;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);

    transition: opacity 0.3s ease;
  }

  :hover {
    cursor: pointer;
    .contentPart {
      opacity: 1;
    }
  }
`;

const StyledCardBody = styled(CardBody)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0px;
`;


function ProfilePostCard ({post}){
  const isMobile = useContainer({ default: false, md: true });
  const zoomModalDisclosure = useDisclosure()

  const openModalHandler = useCallback(()=>{
    zoomModalDisclosure.onOpen()
  },[])

  if(post.Images.length===0)
  return (
    <>
      <StyledCard onClick={openModalHandler}>
        <StyledCardBody overflow="hidden">
          {isMobile ? (
            <Text fontSize="sm">{post.content}</Text>
          ) : (
            <Center h="100%">
              <Text fontSize="md">{post.content}</Text>
            </Center>
          )}
        </StyledCardBody>
      </StyledCard>
      <PostZoomModal disclosure={zoomModalDisclosure} post={post} />
    </>
  );
  return (
    <>
      <StyledCard>
        <div className="contentPart" onClick={openModalHandler}>
          <Text color="white">{post.content}</Text>
        </div>
        <StyledCardBody backgroundColor="black">
          <Image
            src={post.Images[0].src}
            alt={post.Images[0].src}
            fallbackSrc={post.Images[0].src.replace(
              /\/resizedPostImages\//,
              "/postImages/"
            )}
          />
        </StyledCardBody>
      </StyledCard>
      <PostZoomModal disclosure={zoomModalDisclosure} post={post} />
    </>
  );
}

export default ProfilePostCard;