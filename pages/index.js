import React, { useEffect } from "react";
import { Grid, GridItem, Card, Center, Link } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";
import AppLayout from "../components/layout/AppLayout";
import UserProfile from "../components/homeProfileSection/UserProfile";
import useContainer from "../hooks/useContainer";
import Spacer from "../components/CustomizedUI/Spacer";
import { useLoadPosts } from "../hooks/postAction";
import { useLoadMyInfo } from "../hooks/userAction";

function Home() {
  const isMobile = useContainer({ default: false, md: true });
  const [userStateBlock, loadMyInfoLoading] = useLoadMyInfo();
  const [postStateBlock, loadNextPosts, hasMorePosts, loadPostsLoading] =
    useLoadPosts();
  const [ref, inView] = useInView();

  const { mainPosts } = postStateBlock;
  const { me } = userStateBlock;

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      loadNextPosts();
    }
  }, [inView, hasMorePosts, loadPostsLoading]);

  if (loadMyInfoLoading) return null;
  return (
    <AppLayout>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        <GridItem colSpan={isMobile ? 6 : 4}>
          {me && <PostForm />}
          {mainPosts?.map((post) => (
            <div key={post?.id}>
              <PostCard post={post} />
              <Spacer size={20} />
            </div>
          ))}
          <div
            ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
            style={{ height: 2 }}
          />
        </GridItem>
        {!isMobile && (
          <GridItem colSpan={2}>
            {me ? (
              <UserProfile />
            ) : (
              <Card>
                <Center h="10vh">
                  <Link href="/login">로그인 하려면 클릭하세요!</Link>
                </Center>
              </Card>
            )}
          </GridItem>
        )}
      </Grid>
    </AppLayout>
  );
}

// export const getServerSideProps = async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }

//   return {
//     props: {},
//   };
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const cookie = req ? req.headers.cookie : "";
//       axios.defaults.headers.Cookie = "";
//       if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//       }
//       await Promise.all([
//         store.dispatch(loadPosts()),
//         store.dispatch(loadFollowers()),
//         store.dispatch(loadFollowings()),
//       ]);
//       console.log(store.getState());
//     }
// );

export default Home;
