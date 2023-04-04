import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import PropTypes from "prop-types";
import {useSelector} from 'react-redux'

import Footer from "../components/Footer";
import LoginForm from "./LoginForm";
import UserProfile from './UserProfile'

const dummy = {
  nickname: 'Sungjin Kwon',
  Post: [],
  Followings:[],
  Followers:[],
  isLoggedIn: false,
}

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isloggedIn);
   
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
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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

      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
