import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import Spacer from "./Spacer";
import useContainer from "../../hooks/useContainer";

const StyledBox = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &[aria-label="userPostImages"] {
    height: 90vh;
    width: 100%;
    .imageGroup {
      height: 100%;
      > img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
const imageGroupCss = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  aspect-ratio: 1/1;
`;

const imageWrapperCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  min-width: 100%;
  > img {
    width: 100%;
    height: auto;
    margin: 0;
    pointer-events: none;
  }
`;

const buttonWrapperCss = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  pointer-events: none;

  .leftButton {
    position: absolute;
    left: 0;
    margin-left: 10px;
    pointer-events: auto;

    background-color: rgba(240, 240, 240, 0.5);
    :hover {
      background-color: rgba(240, 240, 240, 0.8);
    }
  }
  .rightButton {
    position: absolute;
    right: 0;
    margin-right: 10px;
    pointer-events: auto;

    background-color: rgba(240, 240, 240, 0.5);
    :hover {
      background-color: rgba(240, 240, 240, 0.8);
    }
  }

  .imageMarks {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 10px;
  }
`;

const indexMarkerCss = css`
  border-radius: 50%;
  color: rgba(240, 240, 240, 0.5);
`;

export default function ImageCarousel({ images, label }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useContainer({ default: false, md: true });

  const imageListSize = images.length;
  const imageGroupRef = useRef(null);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!down && isMobile) {
      if (mx > 0 && currentImageIndex !== 0) {
        toPrevSlide();
      } else if (mx < 0 && currentImageIndex !== imageListSize - 1) {
        toNextSlide();
      }
    }
  });

  const toPrevSlide = useCallback(() => {
    const indexForMove =
      imageGroupRef.current.clientWidth * (currentImageIndex - 1);
    setCurrentImageIndex((prev) => prev - 1);
    api.start({ x: (imageGroupRef.current.scrollLeft -= indexForMove) });
  }, [currentImageIndex]);

  const toNextSlide = useCallback(() => {
    const indexForMove =
      imageGroupRef.current.clientWidth * (currentImageIndex + 1);
    setCurrentImageIndex((prev) => prev + 1);
    api.start({ x: (imageGroupRef.current.scrollLeft -= indexForMove) });
  }, [currentImageIndex]);

  return (
    <StyledBox aria-label={label}>
      <animated.div
        className="imageGroup"
        css={imageGroupCss}
        style={{ x }}
        {...bind()}
        ref={imageGroupRef}
      >
        {images.map((image, index) => (
          <div key={index} css={imageWrapperCss}>
            <Image
              key={index}
              src={image.src}
              alt={image.src}
              mb={4}
              fallbackSrc={image.src.replace(
                /\/resizedPostImages\//,
                "/postImages/"
              )}
            />
          </div>
        ))}
      </animated.div>

      <div css={buttonWrapperCss}>
        <HStack justify="center" spacing={4}>
          {currentImageIndex !== 0 && (
            <IconButton
              className="leftButton"
              icon={<ArrowLeftIcon />}
              aria-label="Previous"
              onClick={toPrevSlide}
              size="sm"
              isRound
            />
          )}
          {currentImageIndex !== imageListSize - 1 && (
            <IconButton
              className="rightButton"
              icon={<ArrowRightIcon />}
              aria-label="Next"
              onClick={toNextSlide}
              size="sm"
              isRound
            />
          )}
        </HStack>
        <Spacer />
        <Center className="imageMarks">
          <HStack spacing={2}>
            {images.map((image, index) => (
              <div key={index} css={indexMarkerCss}>
                {index === currentImageIndex ? "●" : "○"}
              </div>
            ))}
          </HStack>
        </Center>
      </div>
    </StyledBox>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  label: PropTypes.string,
};
