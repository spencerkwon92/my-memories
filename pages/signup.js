import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {css} from '@emotion/react'
import Router from "next/router";
import Head from "next/head";
import {
  Container,
  FormControl,
  Input,
  Button,
  VStack,
  Center,
  Heading,
} from "@chakra-ui/react";

import { SIGN_UP_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import Spacer from "../components/CustomizedUI/Spacer";
import logo from '../images/logo.png'

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, me } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me?.id) {
      Router.replace("/");
    }
  }, [me?.id]);

  useEffect(() => {
    if (me) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signupDone) Router.push("/");
  }, [signupDone]);

  useEffect(() => {
    if (signupError) alert(signupError);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  }, [email, password, nickname, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | MyMemories</title>
      </Head>
      <div css={wrapperCss}>
        <Container>
          <Center>
            <Heading size="2xl">Sign Up</Heading>
          </Center>
          <FormControl>
            <VStack spacing={5} align="center">
              <Input
                type="email"
                placeholder="User Email"
                onChange={onChangeEmail}
                required
              />
              <Input
                type="Nickname"
                placeholder="Nickname"
                onChange={onChangeNick}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
                required
              />
              <Input
                type="password"
                placeholder="Password Check"
                onChange={onChangePasswordCheck}
                required
              />
              {passwordError && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}

              <Button
                width="100%"
                isLoading={signupLoading}
                onClick={onSubmit}
              >
                회원가입
              </Button>
            </VStack>
          </FormControl>
        </Container>
      </div>
    </AppLayout>
  );
};

export default Signup;
