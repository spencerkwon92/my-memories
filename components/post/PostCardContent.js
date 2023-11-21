import React from "react";
import PropTypes from "prop-types";
import { Link } from "@chakra-ui/react";
import { css } from "@emotion/react";

const LinkCss = css`
  color: blue;
  font-weight: bold;
`;

function PostCardContent({ postContent }) {
  return (
    <div>
      {postContent.split(/(#[^\s#]+)/g).map((ele, index) => {
        if (ele.match(/(#[^\s#]+)/)) {
          return (
            <Link
              key={ele + index}
              href={`/hashtag/${ele.slice(1)}`}
              css={LinkCss}
            >
              {ele}
            </Link>
          );
        }
        const lines = ele.split(/\n/g);
        return (
          <React.Fragment key={ele + index}>
            {lines?.map((line, lineIndex) => (
              <React.Fragment key={`line-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
