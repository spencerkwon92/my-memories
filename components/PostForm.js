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
  Box,
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { PlusSquareIcon, ArrowUpIcon, AddIcon } from "@chakra-ui/icons";

import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_LOADED_IMAGE,
  ADD_POST_REQUEST,
  addComment,
} from "../reducers/post";
//TODO: 이미지 업로드 과정 다시 공부 && useRef, useReducer, useCallback, useMemo 다시 공부...
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
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

  return (
    <>
      <IconButton onClick={onOpen} width="full" icon={<AddIcon />}>
        +
      </IconButton>
      <Center height="25px">
        <Divider />
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} width="100px">
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
          <Box>
            {imagePaths.map((image, i) => (
              <div key={image} style={{ display: "inline-block" }}>
                <Image src={`http://localhost:3065/${image}`} alt={image} />
                <Center>
                  <Button onClick={onRemoveImage(i)}>제거</Button>
                </Center>
              </div>
            ))}
          </Box>
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

  // return (
  //   <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmitForm}>
  //     <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
  //     <div>
  //       <input type="file" multiple hidden ref={imageInput} onChange ={onChangeImages}/>
  //       <Button onClick={onClickImageUpload}>이미지 업로드</Button>
  //       <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>올리기</Button>
  //     </div>
  //     <div>
  //       {imagePaths.map((image, i) => (
  //         <div key={image} style={{ display: 'inline-block' }}>
  //           <img src={`http://localhost:3065/${image}`} style={{ width: '200px' }} alt={image} />
  //           <div>
  //             <Button onClick={onRemoveImage(i)}>제거</Button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </Form>
  // );
};

export default PostForm;
