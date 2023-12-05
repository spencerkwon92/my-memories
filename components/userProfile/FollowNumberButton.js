import React, {useCallback} from 'react';
import {css} from '@emotion/react';
import {Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody} from '@chakra-ui/react';
import RelationNameCard from "../homeProfileSection/RelationNameCard";
import Spacer from "../CustomizedUI/Spacer";
import useContainer from "../../hooks/useContainer";

const followButtonCss = css`
 :hover{
    cursor: pointer;
 }
`

const modalCss = css`
  height: 50vh;
  margin: 0 10px;
  >.modal-body{
    overflow-y: hidden;
    :hover[data-isFlowed]{
      overflow-y: scroll;
    }
  }
`

export default function FollowNumberButton({type='', followInfo, isLoggedIn}){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useContainer({ default: false, md: true });
  const isFlowed = followInfo?.length > parseInt(`${isMobile ? 8 : 5}`, 10);

  const onClickFollowNumberHandler = useCallback(()=>{
    onOpen();
  },[])
  return(
    <>
      <Text css={followButtonCss} fontSize="xl" fontWeight="bold" margin="0" onClick={onClickFollowNumberHandler}>
        {type === 'followers'? `팔로워 ${followInfo?.length}` :`팔로잉 ${followInfo?.length}`}
      </Text>
      <Modal onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay />
        <ModalContent css={modalCss}>
          <ModalHeader>{type === 'followers' ? '팔로워 목록' : '팔로잉 목록'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modal-body' data-isFlowed={isFlowed?true:null}>
            {
              !isLoggedIn
              ?
                <Text>로그인이 필요합니다.</Text>
                :
                followInfo?.map((follow)=>(
                  <div key={follow?.id}>
                    <RelationNameCard user={follow}/>
                    <Spacer/>
                  </div>
                ))
            }

          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}