import {css} from '@emotion/react'

export default function BaseButton({size, children, as, to, otherCss, ...props}){
  const mainCss = css`
    border: 0;
    padding: 10px 20px;
    border-radius: 4px;
    text-align: center;
    background-color: black;
    ${otherCss}
  `

  return (
    <button as={as} css={mainCss} to={to}>
      {children}
    </button>
  );
}