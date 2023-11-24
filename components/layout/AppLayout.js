import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  Divider,
  Container,
  IconButton,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { BiHome, BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";

import Spacer from "../CustomizedUI/Spacer";
import useContainer from "../../hooks/useContainer";
import SearchButton from "./SearchButton";
import { userState } from "../../recoil";

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
  :hover {
    cursor: pointer;
  }
`;
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
`;

function AppLayout({ children }) {
  const isMobile = useContainer({ default: false, md: true });

  const { me } = useRecoilValue(userState);
  const footerMenuRef = useRef(null);
  const router = useRouter();
  const [ref, inView] = useInView();

  const onLoginButtonHandler = useCallback(() => {
    router.push(me ? `/user/${me?.id}` : "/login");
  }, [me?.id]);

  const onHomeButtonHandler = useCallback(() => {
    router.push("/");
  }, []);

  useEffect(() => {
    const footerMenu = footerMenuRef.current;
    if (footerMenu) {
      footerMenu.style.opacity = inView ? 0 : 1;
    }
  }, [inView]);
  return (
    <Container maxW="container.lg">
      <Menu>
        <div css={wrapperCss}>
          <Link href="/">
            <MenuButton as="a" css={linkCss}>
              My Memories
            </MenuButton>
          </Link>
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
                aria-label="Home Button"
                data-testid="home-button"
              />
              <SearchButton type={IconButton} />
              {me ? (
                <Avatar
                  src={me?.ProfileImage ? me?.ProfileImage?.src : null}
                  size="sm"
                  onClick={onLoginButtonHandler}
                />
              ) : (
                <IconButton
                  icon={<BiUserCircle />}
                  fontSize="25px"
                  variant="ghost"
                  onClick={onLoginButtonHandler}
                  aria-label="Profile Button"
                />
              )}
            </div>
          </div>
        </>
      )}
      <div ref={ref} style={{ height: 2 }} />
    </Container>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
