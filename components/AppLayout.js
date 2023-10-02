import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, Divider, Center, Container } from "@chakra-ui/react";
import { css } from "@emotion/react";
import {useSelector} from 'react-redux'

import Spacer from "./CustomizedUI/Spacer";

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
  const {me} = useSelector((state)=>state.user)
  
  return (
    <Container maxW="container.lg">
      <Menu>
        <div css={wrapperCss}>
          <MenuButton as="a" href="/" css={linkCss}>
            My Memories
          </MenuButton>
          <MenuButton
            as="a"
            href={me ? `/user/${me.id}` : "/login"}
            css={linkCss}
          >
            {me ? "My Profile" : "Login"}
          </MenuButton>
        </div>
      </Menu>
      <Spacer />
      <Divider />
      <Spacer />
      <div>{children}</div>
    </Container>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
