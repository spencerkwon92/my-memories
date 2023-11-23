import React, { useCallback, useRef } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
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
import { ArrowUpIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import useInput from "../../hooks/useInput";
import { removePostAPI, updatePostContentAPI } from "../../apis/post";
import { useMutation, useQueryClient } from "react-query";
import { postState } from "../../recoil";
import { useSetRecoilState, useRecoilValue } from "recoil";
import produce from "../../util/produce";

function PostMenuButton({ post }) {
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateAlertOpen,
    onOpen: onUpdateAlertOpen,
    onClose: onUpdateAlertClose,
  } = useDisclosure();

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
      <UpdateModal
        isOpen={isUpdateAlertOpen}
        onClose={onUpdateAlertClose}
        post={post}
      />
    </>
  );
}

function AlertModal({ isOpen, onClose, post }) {
  const cancelRef = useRef();
  const setPostState = useSetRecoilState(postState);

  const removePostMutation = useMutation("posts", removePostAPI, {
    onMutate() {
      console.log("load Start!");
    },
    onSuccess(data) {
      setPostState((prev) => ({
        ...prev,
        mainPosts: prev.mainPosts.filter((post) => post.id !== data.PostId),
      }));
    },
    onSettled() {
      console.log("load End!");
    },
  });
  const postDeleteHandler = useCallback(() => {
    removePostMutation.mutate(post?.id);
    onClose();
  }, [removePostMutation]);

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

function UpdateModal({ isOpen, onClose, post }) {
  const [text, onChangeText] = useInput(post?.content || "");
  const setPostState = useSetRecoilState(postState);

  const updatePostsContentMutation = useMutation(
    "updatePostContent",
    updatePostContentAPI,
    {
      onMutate() {
        console.log("updatePostContent Start!");
      },
      onSuccess(data) {
        setPostState((prev) =>
          produce(prev, (draft) => {
            const post = draft.mainPosts.find(
              (post) => post.id === data.PostId
            );
            post.content = data.content;
          })
        );
      },
      onSettled() {
        console.log("updatePostContent End!");
      },
    }
  );

  const onUpdateContentClickHandler = useCallback(() => {
    updatePostsContentMutation.mutate({ content: text, postId: post.id });

    alert("메모리 내용이 수정되었습니다.");
    onClose();
  }, [text]);

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
