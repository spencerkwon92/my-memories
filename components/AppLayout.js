import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton } from "@chakra-ui/react";
import { css } from "@emotion/react";

const linkCss = css`
  & > * {
    font-size: 30px;
  }
`;

const wrapperCss = css`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <Menu>
        <div css={wrapperCss}>
          <MenuButton as="a" href="/" css={linkCss}>
            My Memories
          </MenuButton>
          <MenuButton as="a" href="/profile" css={linkCss}>
            profile
          </MenuButton>
        </div>
      </Menu>
      <div>{children}</div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
