import React,{useEffect,useRef} from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Menu, MenuButton, Divider, Center, Container, IconButton, Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import {useSelector} from 'react-redux'
import { BiHome,BiUserCircle } from "react-icons/bi";

import Spacer from "./CustomizedUI/Spacer";
import useContainer from "../hooks/useContainer";
import SearchButton from "./SearchButton";

const buttonCss = css`
  &:hover {
    background-color: transparent;
    color: #1890ff;
  }
  &:focus {
    background-color: transparent;
  }
`;
const linkCss = css`
  font-size: 25px;
  font-weight: bold;
`
const wrapperCss = css`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 0px 10px;
`;

const mobileMenuWrapper = css`
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  z-index: 999;
  height: 6vh;
  width: calc(100% - 62px);
  transition: opacity 0.3s ease;
`;
const mobileMenuListCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AppLayout = ({ children }) => {
  const isMobile = useContainer({ default: false, md: true });
  const {me} = useSelector((state)=>state.user) 
  const footerMenuRef = useRef(null);

  const onLoginButtonHandler = (e) => {
    Router.push(me?`/user/${me?.id}`:"/login");
  }

  const onHomeButtonHandler = () => {
    Router.push('/')
  }

useEffect(() => {
  function onScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if(footerMenuRef.current !==null)footerMenuRef.current.style.opacity=0;
    }else{
    if (footerMenuRef.current !== null)
      footerMenuRef.current.style.opacity = 1;

    }
  }
  window.addEventListener("scroll", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, []);

  
  return (
    <Container maxW="container.lg">
      <Menu>
        <div css={wrapperCss}>
          <MenuButton as="a" href="/" css={linkCss}>
            My Memories
          </MenuButton>
          {!isMobile && (
            <div>
              <SearchButton type={Button}>Search</SearchButton>
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={<BiUserCircle />}
                fontSize="25px"
                css={buttonCss}
                onClick={onLoginButtonHandler}
              >
                {me ? "My Profile" : "Login"}
              </MenuButton>
            </div>
          )}
        </div>
      </Menu>
      <Spacer />
      <Divider />
      <Spacer />
      <div>{children}</div>
      {isMobile && (
        <>
          <div css={mobileMenuWrapper} ref={footerMenuRef}>
            <div css={mobileMenuListCss}>
              <IconButton
                icon={<BiHome />}
                fontSize="25px"
                variant="ghost"
                onClick={onHomeButtonHandler}
              />
              <SearchButton type={IconButton} />
              <IconButton
                icon={<BiUserCircle />}
                fontSize="25px"
                variant="ghost"
                onClick={onLoginButtonHandler}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
