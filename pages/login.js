import React, { useCallback, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import { loginRequestAction } from "../reducers/user";
import useInput from "../hooks/useInput";
import AppLayout from "../components/AppLayout";
import Spacer from "../components/CustomizedUI/Spacer";

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
  const dispatch = useDispatch();
  const { loginLoading, loginError, loginDone, me } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (loginError) alert(loginError);
    if (loginDone || me) Router.push("/");
  }, [loginDone, me, loginError]);

  const onSubmit = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <AppLayout>
      <div css={wrapperCss}>
        <Container>
          <Center>
            <Heading size="xl">My Memories</Heading>
          </Center>
          <Spacer size="20" />
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
            Don't have an account?{" "}
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