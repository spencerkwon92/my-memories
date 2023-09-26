import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, Divider, Center } from "@chakra-ui/react";
import { css } from "@emotion/react";

const linkCss = css`
  & > * {
    font-size: 20px;
  }
`;

const wrapperCss = css`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 0px 10px;
`;


const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu>
        <div css={wrapperCss}>
          <MenuButton as="a" href="/" css={linkCss}>
            My Memories
          </MenuButton>
        </div>
      </Menu>
      <Center height="25px">
        <Divider />
      </Center>
      <div>{children}</div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
