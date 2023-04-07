import React, {useState, useCallback} from 'react'
import {Button, Form, Input} from 'antd'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import {loginAction} from '../reducers/user'
import useInput from "../hooks/useInput";



export default function LoginForm (){
  const [id, onChangeId] = useInput("")
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch()
  const {loginLoading} = useSelector(state => state.user)

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({
      id,
      password
    }))

  }, [id, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: "10px" }}>
      <div>
        <label htmlFor="user-id">Id</label>
        <Input name="user-id" value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          LogIn
        </Button>
        <Link href="/signup" legacyBehavior>
          <a>
            <Button>Sign up</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
}