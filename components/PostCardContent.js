import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Text} from '@chakra-ui/react'

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((ele) => {
      if (ele.match(/(#[^\s#]+)/)) {
        return (
          <Link
            href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
            as={`/hashtag/${ele.slice(1)}`}
            key={ele}
            legacyBehavior
          >
            <Text>{ele}</Text>
          </Link>
        );
      }
      return ele;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
