import React from 'react';
import PropTypes from 'prop-types';

import ImageCarousel from './CustomizedUI/ImageCarousel';

function PostImages({ images,...props }){

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} />
      </>
    );
  }

  return (
    <div {...props}>
      <ImageCarousel images={images}/>
    </div>

  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
