import React,{useState,useCallback} from 'react'
import {HStack, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, iseDisclosure, useDisclosure} from '@chakra-ui/react'
import {BiSearch} from 'react-icons/bi'
import { css } from '@emotion/react'
import {useRouter} from 'next/router'

import useInput from '../hooks/useInput'
import Spacer from './CustomizedUI/Spacer'

const buttonCss = css`
  :hover {
    background-color: transparent;
    color: #1890ff;
  }
`;

export default function SearchButton({type, children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChangeValue, setValue] = useInput('')
  const Router = useRouter()


  const onClickHandler = useCallback(()=>{
    console.log(`this is search: ${value}`);
    Router.push(`post/${value}`);
    setValue('')
    onClose()
  },[value])

  const ConditionButton = type;

  return (
    <>
      <ConditionButton
        variant="ghost"
        aria-label="Search Button"
        icon={<BiSearch />}
        leftIcon={type === Button && <BiSearch />}
        onClick={onOpen}
        fontSize="25px"
        css={buttonCss}
      >
        {children}
      </ConditionButton>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Input
                type="text"
                value={value}
                onChange={onChangeValue}
                required
              />
              <Button onClick={onClickHandler}>Search</Button>
            </HStack>
            <Spacer/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}