import React from 'react';
import { Heading,VStack,Center,Text, Box, Divider} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'

import useContainer from '../hooks/useContainer';
import RelationNameCard from './RelationNameCard';
import {css} from '@emotion/react';
import Spacer from './CustomizedUI/Spacer';

const listCss = css`
  height: 100vh;
  overflow-y: hidden;
  :hover{
    overflow-y: auto;
  }
`

function FollowList({as, header, data }){
  const isMobile = useContainer({ default: false, md: true });
  const {me} = useSelector((state)=>state.user)

  return (
    <Box shadow="md" borderWidth="1px" p="20px">
      <VStack align="left" h="50vh">
        <Center>
          <Heading size={isMobile ? "sm" : "md"}>{header}</Heading>
        </Center>
        {as === "following" ? (
          <Text margin="0">{`${me?.nickname}님이 팔로잉 하고 있는 사용자들 입니다.`}</Text>
        ) : (
          <Text margin="0">{`${me?.nickname}님을 팔로우 하고 있는 사용자들 입니다.`}</Text>
        )}
        <Divider />
        <div className="listContent" css={listCss}>
          {data.map((follow) => (
            <div key={follow.id}>
              <RelationNameCard user={follow} />
              <Spacer />
            </div>
          ))}
        </div>
      </VStack>
    </Box>
  );
}

FollowList.propTypes = {
  as: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
