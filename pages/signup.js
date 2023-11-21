import React, { useCallback, useState, useEffect } from "react";
import { css } from "@emotion/react";
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
import { useMutation } from "react-query";

import { signUpAPI } from "../apis/user";
import AppLayout from "../components/layout/AppLayout";
import useInput from "../hooks/useInput";
import Spacer from "../components/CustomizedUI/Spacer";
import useLoadMyInfo from "../hooks/useLoadMyInfo";

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

function Signup() {
  const [signupLoading, setSignupLoading] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNick] = useInput("");
  const [password, onChangePassword] = useInput("");
  const hasNullText = !email || !nickname || !password || !passwordCheck;
  const { me } = useLoadMyInfo();

  const signUpMutation = useMutation("signUp", signUpAPI, {
    onMutate: () => {
      setSignupLoading(true);
    },
    onSuccess: () => {
      alert("환영합니다! 로그인 페이지로 이동합니다.");
      Router.push("/");
    },
    onError: (error) => {
      alert(error);
    },
    onSettled: () => {
      setSignupLoading(false);
    },
  });
  useEffect(() => {
    if (me?.id) {
      Router.replace("/");
    }
  }, [me?.id]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
    }
    if (!hasNullText) {
      signUpMutation.mutate({ email, nickname, password });
    } else {
      alert("회원 정보를 모두 넣어 주세요!.");
    }
  }, [email, password, nickname, passwordCheck, signUpMutation]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

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
          <Spacer size={20} />
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

              <Button width="100%" isLoading={signupLoading} onClick={onSubmit}>
                회원가입
              </Button>
            </VStack>
          </FormControl>
        </Container>
      </div>
    </AppLayout>
  );
}

export default Signup;
