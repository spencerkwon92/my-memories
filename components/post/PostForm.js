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
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  PlusSquareIcon,
  ArrowUpIcon,
  AddIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import useContainer from "../../hooks/useContainer";
import postSlice, { uploadImages, createPost } from "../../reducers/post";

const imageGroupCss = css`
  max-height: 50vh;
  overflow-y: hidden;
  :hover {
    overflow-y: scroll;
  }
`;
const imageWrapperCss = css`
  position: relative;
  background-color: black;
`;
const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
const StyledRemoveButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  margin: 10px;
`;

function PostForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, createPostLoading, createPostDone } = useSelector(
    (state) => state.post
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useContainer({ default: false, md: true });
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append("image", file);
    });

    dispatch(uploadImages(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(postSlice.actions.removeLoadedImage(index));
    },
    []
  );

  useEffect(() => {
    if (createPostDone) {
      setText("");
    }
  }, [createPostDone]);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }

    const formData = new FormData();

    imagePaths.forEach((path) => {
      formData.append("image", path);
    });

    formData.append("content", text);

    dispatch(createPost(formData));

    onClose();
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const modalClosehandler = useCallback(() => {
    if (imagePaths.length > 0) {
      dispatch(postSlice.actions.removeAllLoadedImages());
    }
    onClose();
  }, [imagePaths]);

  return (
    <>
      <IconButton onClick={onOpen} width="full" icon={<AddIcon />}>
        +
      </IconButton>
      <Center height="25px">
        <Divider />
      </Center>
      <Modal isOpen={isOpen} onClose={modalClosehandler} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>메모리 작성하기</ModalHeader>
          <ModalCloseButton onClick={modalClosehandler} />
          <ModalBody>
            <Textarea
              placeholder="Please input your memory."
              onChange={onChangeText}
            />
          </ModalBody>

          <div css={imageGroupCss}>
            <SimpleGrid columns={isMobile ? 2 : 3} spacing={2} margin={3}>
              {imagePaths.map((image, i) => (
                <div key={image} css={imageWrapperCss}>
                  <StyledImage
                    src={image.replace(/\/resizedPostImages\//, "/postImages/")}
                    alt={image}
                  />
                  <StyledRemoveButton
                    size="sm"
                    fontSize="10px"
                    icon={<CloseIcon />}
                    isRound={true}
                    onClick={onRemoveImage(i)}
                  />
                </div>
              ))}
            </SimpleGrid>
          </div>

          <Center>
            <Text margin="0" color="red" fontWeight="bold">
              아직은 20MB 이하 이미지만 업로드가 가능합니다.😰
            </Text>
          </Center>
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
              <Button loading={createPostLoading} onClick={onSubmitForm}>
                메모리 올리기
                <ArrowUpIcon />
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostForm;
