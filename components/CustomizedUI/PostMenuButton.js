import React, {useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  IconButton,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { PlusSquareIcon, ArrowUpIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { REMOVE_POST_REQUEST } from '../../reducers/post';
import useInput from '../../hooks/useInput'
import { UPDATE_POST_CONTENT_REQUEST } from '../../reducers/post';

function PostMenuButton({post}) {

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const {isOpen:isUpdateAlertOpen, onOpen: onUpdateAlertOpen, onClose: onUpdateAlertClose} = useDisclosure();
  
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="post menu"
          variant={"outline"}
          icon={<BiDotsHorizontalRounded />}
        />
        <MenuList>
          <MenuItem onClick={onUpdateAlertOpen}>수정하기</MenuItem>
          <MenuItem onClick={onDeleteAlertOpen}>게시글 삭제</MenuItem>
        </MenuList>
      </Menu>
      <AlertModal
        isOpen={isDeleteAlertOpen}
        onClose={onDeleteAlertClose}
        post={post}
      />
      <UpdateModal isOpen={isUpdateAlertOpen} onClose={onUpdateAlertClose} post={post}/>
    </>
  );
}

function AlertModal({isOpen, onClose, post}){
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const postDeleteHandler = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>게시글 삭제</AlertDialogHeader>
          <AlertDialogBody>게시글을 정말로 삭제하시겠습니까?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소하기
            </Button>
            <Button colorScheme="red" onClick={postDeleteHandler} ml={3}>
              삭제하기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

function UpdateModal({isOpen, onClose, post}){
  const {imagePaths} = useSelector((state)=>state.post) // imagePaths는 일시적인것... 그렇다면 이미지 페스도 수정해줘야 하나?
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput(post?.content||'')

  const onUpdateContentClickHandler = useCallback(()=>{
    dispatch({
      type: UPDATE_POST_CONTENT_REQUEST,
      data: text,
      postId: post.id,
    })

    alert('메모리 내용이 수정되었습니다.')
    onClose()
  },[text])

  const onImageUploadClickHandler = useCallback(()=>{
    alert('기능이 아직 완성 되지 않았어요')
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>메모리 수정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea value={text} onChange={onChangeText} />
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onImageUploadClickHandler}>
              이미지
              <PlusSquareIcon />
            </Button>
            <Button onClick={onUpdateContentClickHandler}>
              메모리 수정하기
              <ArrowUpIcon />
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

PostMenuButton.propTypes = {
  post: PropTypes.object.isRequired,
};

UpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostMenuButton;
