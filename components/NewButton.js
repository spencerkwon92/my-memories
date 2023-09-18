import React from 'react'
import {css} from '@emotion/react'

import BaseButton from './BaseButton'

export default function NewButton({children, color}){
  
  const buttonCss = css`
    background-color: ${color} !important;
  `

  return (
    <BaseButton as="NewButton" otherCss={buttonCss}>
      {children}
    </BaseButton>
  );
}