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
} from "@chakra-ui/react";

import { REMOVE_POST_REQUEST } from '../../reducers/post';



function PostMenuButton({post}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch()
  const postDeleteHandler = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const postUpdateHandler = useCallback(()=>{
    alert('아직 준비중입니다...')
  },[])

  
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
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
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="post menu"
          icon={<BiDotsHorizontalRounded />}
        />

        <MenuList>
          <MenuItem onClick={postUpdateHandler}>수정하기</MenuItem>
          <MenuItem onClick={onOpen}>게시글 삭제</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default PostMenuButton;
