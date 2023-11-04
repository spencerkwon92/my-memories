import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ImageZoomModal(disclosure, data={}) {
  const { isOpen, onOpen, onClose } = disclosure;

  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalBody>
        <div>This is ImageZoom</div>
      </ModalBody>
    </Modal>
  )

}

export default ImageZoomModal; 