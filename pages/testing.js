import React, { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import { css } from "@emotion/react";

const boxCss = css`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  background-color: red;
`;

export default function Testing() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });

  return (
    <AppLayout>
      <animated.div css={boxCss} {...bind()} style={{ x, y }}>
        This is Testing box!
      </animated.div>
    </AppLayout>
  );
}
