import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import PropTypes from "prop-types";
import {useSelector} from 'react-redux'
import {createGlobalStyle} from 'styled-components'

import LoginForm from "./LoginForm";
import UserProfile from './UserProfile'

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const {me} = useSelector(state=>state.user)  

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/" legacyBehavior>
            <a>HOME</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile" legacyBehavior>
            <a>PROFILE</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Followed by Zerocho
          </a>
        </Col>
      </Row>

    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;