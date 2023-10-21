import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Divider,
  Center,
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { PlusSquareIcon, ArrowUpIcon, AddIcon } from "@chakra-ui/icons";
import {css} from '@emotion/react'
import styled from "@emotion/styled";

import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_LOADED_IMAGE,
  ADD_POST_REQUEST,
} from "../reducers/post";

const imageGroupWrapperCss = css`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  transition: transform 0.3s ease;
`;

const imageWrapperCss = css`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  min-width: 100%;
  transition: transform 0.3s ease;
`; 
const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
`
const StyledRemoveButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  margin: 10px
`

function PostForm(){
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const {
    imagePaths,
    addPostLoading,
    addPostDone,
    uploadImagesLoading,
    uploadImagesError,
  } = useSelector((state) => state.post);
  const {me} = useSelector((state)=>state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append("image", file);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_LOADED_IMAGE,
        data: index,
      });
    },[]);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }

    const formData = new FormData();

    imagePaths.forEach((path) => {
      formData.append("image", path);
    });

    formData.append("content", text);

    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });

    onClose();
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  console.log(uploadImagesError, uploadImagesLoading, uploadImagesDone)
  
  if (uploadImagesError) {
    alert(uploadImagesError);
  }

  return (
    <>
      <IconButton onClick={onOpen} width="full" icon={<AddIcon />}>
        +
      </IconButton>
      <Center height="25px">
        <Divider />
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>메모리 작성하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Please input your memory."
              onChange={onChangeText}
            />
          </ModalBody>
          <div css={imageGroupWrapperCss}>
            {imagePaths.map((image, i) => (
              <div key={image} css={imageWrapperCss}>
                <StyledImage
                  src={image.replace(/\/resizedPostImages\//, "/postImages/")}
                  alt={image}
                />
                <StyledRemoveButton onClick={onRemoveImage(i)}>
                  제거
                </StyledRemoveButton>
              </div>
            ))}
          </div>
          <ModalFooter>
            <input
              type="file"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <HStack>
              <Button onClick={onClickImageUpload}>
                이미지
                <PlusSquareIcon />
              </Button>
              <Button loading={addPostLoading} onClick={onSubmitForm}>
                메모리 올리기
                <ArrowUpIcon />
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostForm;
