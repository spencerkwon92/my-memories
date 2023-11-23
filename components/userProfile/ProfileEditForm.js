import React, { useCallback, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Container,
  Center,
  Avatar,
  Button,
  HStack,
  Text,
  VStack,
  Input,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";

import useInput from "../../hooks/useInput";
import Spacer from "../CustomizedUI/Spacer";
import styled from "@emotion/styled";
import { userState } from "../../recoil";
import {
  changeNicknameAPI,
  uploadProfileImageAPI,
  editProfileImageAPI,
} from "../../apis/user";
import produce from "../../util/produce";

const ButtonImage = styled(Image)`
  opacity: 0.5;
  transition: opacity 0.3s ease;
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

function ProfileEditForm() {
  const [userStateBlock, setUserState] = useRecoilState(userState);
  const { me } = userStateBlock;
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeNicknameMutation = useMutation(
    "changeNickname",
    changeNicknameAPI,
    {
      onSuccess(data) {
        setUserState((prev) =>
          produce(prev, (draft) => {
            draft.me.nickname = data.nickname;
          })
        );
      },
    }
  );

  const onNicknameEditButton = useCallback(() => {
    changeNicknameMutation.mutate(nickname);
    alert("닉네임이 변경되었습니다.");
  }, [changeNicknameMutation, nickname]);

  return (
    <>
      <Container centerContent>
        <Center>
          <Heading>프로필 편집</Heading>
        </Center>
        <Spacer />
        <HStack gap="20px">
          <Image
            borderRadius="full"
            boxSize="80px"
            src={me.ProfileImage !== null ? me.ProfileImage.src : null}
            fallbackSrc={me.ProfileImage.src.replace(
              /\/resizedUserImages\//,
              "/userProfileImages/"
            )}
          />
          <VStack>
            <Text margin="0" fontSize="lg" fontWeight="bold">
              {me?.nickname}
            </Text>
            <Button size="sm" onClick={onOpen}>
              프로필 이미지 바꾸기
            </Button>
          </VStack>
        </HStack>
        <Spacer size={20} />
        <HStack>
          <Input type="text" value={nickname} onChange={onChangeNickname} />
          <Button onClick={onNicknameEditButton}>닉네임 수정</Button>
        </HStack>
      </Container>
      <Spacer size={20} />
      <ProfileImageEditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function ProfileImageEditModal({ isOpen, onClose }) {
  const [userStateBlock, setUserState] = useRecoilState(userState);
  const { me } = userStateBlock;
  const [imagePath, setImagePath] = useState(me.ProfileImage?.src || "");
  const profileImageInput = useRef();

  const editProfileImageMutation = useMutation(
    "editProfileImage",
    editProfileImageAPI,
    {
      onMutate() {
        console.log("editProfileStart");
      },
      onSuccess(data) {
        setUserState((prev) =>
          produce(prev, (draft) => {
            draft.me.ProfileImage = data;
          })
        );
      },
      onError(error) {
        console.log(error);
      },
      onSettled() {
        console.log("editProfileEnd");
      },
    }
  );

  const onChangeProfileImage = useCallback((e) => {
    const profileImageFormData = new FormData();
    profileImageFormData.append("profileImage", e.target.files[0]);

    uploadProfileImageAPI(profileImageFormData).then((data) =>
      setImagePath(data)
    );
  }, []);

  const onProfileImageUpload = useCallback(() => {
    profileImageInput.current.click();
  }, [profileImageInput.current]);

  const onClick = useCallback(() => {
    const formData = new FormData();
    formData.append("profileImage", imagePath);
    editProfileImageMutation.mutate(formData);

    onClose();
  }, [imagePath]);

  const onCloseModalHandler = useCallback(() => {
    if (imagePath) {
      setImagePath(null);
    }
    onClose();
  }, [imagePath]);

  let ConditionalImageButton;
  if (me.ProfileImage === null && !imagePath) {
    ConditionalImageButton = (
      <IconButton
        icon={<PlusSquareIcon />}
        fontSize="50"
        minW="70%"
        minH="100%"
        onClick={onProfileImageUpload}
      />
    );
  } else {
    if (imagePath) {
      ConditionalImageButton = (
        <ButtonImage
          src={imagePath.replace(
            /\/resizedUserImages\//,
            "/userProfileImages/"
          )}
          alt="프로필 이미지"
          width="100%"
          height="100%"
          objectFit="cover"
          onClick={onProfileImageUpload}
        />
      );
    } else {
      ConditionalImageButton = (
        <ButtonImage
          src={me.ProfileImage.src.replace(
            /\/resizedUserImages\//,
            "/userProfileImages/"
          )}
          alt="프로필 이미지"
          width="100%"
          height="100%"
          objectFit="cover"
          onClick={onProfileImageUpload}
        />
      );
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onCloseModalHandler} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>프로필 이미지 편집</ModalHeader>
        <ModalCloseButton onClick={onCloseModalHandler} />
        <ModalBody>
          {/* {uploadProfileImageLoading && (
            <Center>
              <Text fontWeight="bold">
                이미지를 바꾸고 있어요.
                <Spinner />
              </Text>
            </Center>
          )} */}
          <Center height={"20vh"}>
            <input
              type="file"
              name="image"
              hidden
              ref={profileImageInput}
              onChange={onChangeProfileImage}
            />
            {ConditionalImageButton}
          </Center>
          <Spacer />
          <VStack>
            <Text margin="0" color="red" fontWeight="bold">
              아직은 20MB 이하 이미지만 업로드가 가능합니다.😰
            </Text>
            <Text margin="0">클릭해서 이미지를 선택하세요!</Text>
            <Button onClick={onClick}> 프로필 이미지로 변경하기</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

ProfileImageEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imagePath: PropTypes.string,
};

export default ProfileEditForm;
