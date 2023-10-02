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
  Spacer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import { loginRequestAction } from "../reducers/user";
import useInput from "../hooks/useInput";

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  
  .signUpAnker{
    color: blue;
  }
`;

export default function NewLoginForm() {
  const dispatch = useDispatch();
  const { loginLoading, loginError, loginDone, me } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (loginDone || me) Router.push("/");
  }, [loginDone, me]);

  const onSubmit = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <div css={wrapperCss}>
      <Container>
        <Center>
          <Heading size="2xl">My Memories</Heading>
        </Center>
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
              <Button width='52vw' isLoading={loginLoading} onClick={onSubmit}>
                Log In
              </Button>
          </VStack>
        </FormControl>
      </Container>
      <Spacer />
      <Center h="100px">
        <Text fontSize="lg">
          Don't have an account? <a className="signUpAnker" href="/signup">Sign Up</a>
        </Text>
      </Center>
    </div>
  );
}
