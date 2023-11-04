import React from 'react';
import PropTypes from 'prop-types';
import {Image, Box} from '@chakra-ui/react'
import styled from '@emotion/styled'

import ImageCarousel from '../CustomizedUI/ImageCarousel';

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  &[aria-label="userPostImages"] {
    width: 100%;
    height: 90vh;
    > img {
      height: 90vh;
      width: auto;
    }
  }
`;


function PostImages({ images, label, ...props }){

  if (images.length === 1) {
    return (
      <StyledBox aria-label={label}>
        <Image
          src={images[0].src}
          alt={images[0].src}
          fallbackSrc={images[0].src.replace(
            /\/resizedPostImages\//,
            "/postImages/"
          )}
        />
      </StyledBox>
    );
  }

  return (
    <StyledBox aria-label={label}>
      <ImageCarousel images={images} label={label} />
    </StyledBox>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default PostImages;
