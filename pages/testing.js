import React, {useEffect} from 'react'
import {css} from '@emotion/react'
import {Button, IconButton} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import AppLayout from '../components/AppLayout'
import BaseButton from '../components/BaseButton'
import NewButton from '../components/NewButton'
import {LOAD_FOLLOWERS_REQUEST} from '../reducers/user'

export default function testing() {
  const {me} = useSelector((state)=> state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST
    })
  },[])

  console.log(me)
  

  return (
    <AppLayout>
      <div>Hello world!!</div>
    </AppLayout>
  )
}
 