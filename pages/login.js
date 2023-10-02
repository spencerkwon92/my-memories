import React from 'react'

import AppLayout from '../components/AppLayout'
import NewLoginForm from '../components/NewLoginForm'

export default function loginPage(){
  return (
    <AppLayout>
      <NewLoginForm/>
    </AppLayout>
  )
}