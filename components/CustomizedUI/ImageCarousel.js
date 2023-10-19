import React,{useState, useRef, useCallback} from 'react'
import {Box, Button, HStack, Image, IconButton, Center} from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import Spacer from './Spacer'

const StyledBox = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  .leftButton {
    position: absolute;
    left: 0;
    margin-left: 10px;

    background-color: rgba(240, 240, 240, 0.5);
    :hover {
      background-color: rgba(240, 240, 240, 0.8);
    }
  }
  .rightButton {
    position: absolute;
    right: 0;
    margin-right: 10px;

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

const imageGroupCss = css`
  display: flex;
  flex-direction:row;
  overflow-x: hidden;
`

const imageContainerCss = css`
  display:flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  background-color: black;
`

const imageCss = css`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  max-width: 100%;
  max-height: 100%;
  object-fit: container;
  margin: 0;

  &.active {
    opacity: 1;
  }
`;
const indexMarkerCss = css`
  border-radius: 50%;
  color: rgba(240, 240, 240, 0.5);

  :hover {
    color: rgb(240, 240, 240);
  }
`;

export default function ImageCarousel({images}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageListSize = images.length;
  const imageGroupRef = useRef(null);

  const toPrevSlide = useCallback(() => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(imageListSize - 1);
      imageGroupRef.current.scrollLeft = imageGroupRef.current.scrollWidth;
    } else {
      setCurrentImageIndex((prev) => prev - 1);
      imageGroupRef.current.scrollLeft -= imageGroupRef.current.clientWidth;
    }
  },[currentImageIndex, imageListSize]);

  const toNextSlide = useCallback(() => {
    if (currentImageIndex === imageListSize - 1) {
      setCurrentImageIndex(0);
      imageGroupRef.current.scrollLeft = 0;
    } else {
      setCurrentImageIndex((prev) => prev + 1);
      imageGroupRef.current.scrollLeft += imageGroupRef.current.clientWidth;
    }
  },[currentImageIndex, imageListSize]);

  return (
    <StyledBox>
      <div css={imageGroupCss} ref={imageGroupRef}>
        {images.map((image, index) => (
          <div key={index} css={imageContainerCss}>
            <Image
              key={index}
              src={image.src}
              alt={image.src}
              width="100%"
              height="auto"
              mb={4}
              css={imageCss}
              className={`carousel-image ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          </div>
        ))}
      </div>

      <div css={buttonWrapperCss}>
        <HStack justify="center" spacing={4}>
          <IconButton
            className="leftButton"
            icon={<ArrowLeftIcon />}
            aria-label="Previous"
            onClick={toPrevSlide}
            size="sm"
            isRound
          />
          <IconButton
            className="rightButton"
            icon={<ArrowRightIcon />}
            aria-label="Next"
            onClick={toNextSlide}
            size="sm"
            isRound
          />
        </HStack>
        <Spacer />
        <Center className="imageMarks">
          <HStack spacing={2}>
            {images.map((image, index) => (
              <button key={index} css={indexMarkerCss}>
                {index === currentImageIndex ? "●" : "○"}
              </button>
            ))}
          </HStack>
        </Center>
      </div>
    </StyledBox>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};