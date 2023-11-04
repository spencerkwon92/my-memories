import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Box } from '@chakra-ui/react';
import { css } from '@emotion/react';

import PostImages from '../post/PostImages';
import PostCard from '../post/PostCard';
import useContainer from '../../hooks/useContainer';
import ZoomedPostCard from './ZoomedPostCard';


function PostZoomModal({ disclosure, post }) {
  const { isOpen, onOpen, onClose } = disclosure;
  const isMobile = useContainer({ default: false, md: true });

  const isNoImages = post.Images.length === 0;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w={!isMobile && isNoImages? "50vw":"80vw"} h={!isMobile && "90vh"} maxW="null">
        <ModalCloseButton />
        <ModalBody p="0" marginTop={(isMobile||isNoImages) && "50px"}>
          {isMobile || isNoImages ? (
            <PostCard post={post} />
          ) : (
            <ZoomedPostCard post={post} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostZoomModal;