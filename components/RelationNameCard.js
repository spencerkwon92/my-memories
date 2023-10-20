import React, {useCallback} from "react";
import {Avatar,Button} from "@chakra-ui/react";
import {useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const mainCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: bold;
  }
`;

function RelationNameCard({ user }) {
  const dispatch = useDispatch();
  const {me} = useSelector((state)=>state.user)
  const id = user?.id
  const isFollowing = me?.Followings.find((following)=>following.id === id)

  const onFollowingHandle = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: id,
      });
    }
  }, [isFollowing]);
  

  return (
    <div css={mainCss}>
      <div>
        <Avatar
          name={user?.nickname}
          bgColor="gray"
          size="md"
          src={user.ProfileImage ? user.ProfileImage?.src : null}
        />
        <Link href={`/user/${id}`} passHref>
          <a>{user?.nickname}</a>
        </Link>
      </div>
      <Button color="blue" onClick={onFollowingHandle} variant='link' >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}

RelationNameCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RelationNameCard;