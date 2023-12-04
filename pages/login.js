import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import {
  Container,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
  Center,
  Heading,
} from "@chakra-ui/react";
import Router from "next/router";
import { useMutation } from "react-query";
import {Link} from "next/link";

import useInput from "../hooks/useInput";
import AppLayout from "../components/layout/AppLayout";
import Spacer from "../components/CustomizedUI/Spacer";
import { useLoadMyInfo } from "../hooks/userAction";
import { logInAPI } from "../apis/user";

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  .signUpAnker {
    color: blue;
  }
`;

function LoginPage() {
  const [loginLoading, setLoginLoading] = useState(false);
  const { me } = useLoadMyInfo();

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const emptyTextError = !email || !password;

  const loginMutation = useMutation("login", logInAPI, {
    onMutate: () => {
      setLoginLoading(true);
    },
    onSuccess: () => {
      Router.push("/");
    },
    onError: (err) => {
      setLoginLoading(false);

      console.error(err.response.data);
      alert(err.response.data);
    },
    onSettled: () => {
      setLoginLoading(false);
    },
  });

  useEffect(() => {
    if (me) {
      alert("이미 로그인 되어있습니다. 홈 화면으로 이동합니다.");
      Router.push("/");
    }
  }, [me]);

  const onSubmit = useCallback(() => {
    if (!emptyTextError) {
      loginMutation.mutate({ email, password });
    } else {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
    }
  }, [email, password, loginMutation]);

  return (
    <AppLayout>
      <div css={wrapperCss}>
        <Container>
          <Center>
            <Heading size="xl">My Memories</Heading>
          </Center>
          <Spacer size={20} />
          <FormControl>
            <VStack spacing={5}>
              <Input
                type="email"
                placeholder="User Email"
                onChange={onChangeEmail}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
                required
              />
              <Button width="100%" isLoading={loginLoading} onClick={onSubmit}>
                로그인
              </Button>
            </VStack>
          </FormControl>
        </Container>
        <Center marginTop="10px">
          <Text fontSize="lg">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{" "}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="signUpAnker" href="/signup">
              Sign Up
            </a>
          </Text>
        </Center>
      </div>
    </AppLayout>
  );
}

export default LoginPage;
