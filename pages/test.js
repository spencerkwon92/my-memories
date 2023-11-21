import { useRecoilValue } from "recoil";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";

import { userState } from "../recoil";
import useLoadMyInfo from "../hooks/useLoadMyInfo";
import { loadMyInfoAPI } from "../apis/user";
import { loadPostsAPI } from "../apis/post";

export default function TestPage() {
  const { me } = useLoadMyInfo();
  // // const { data } = useQuery("loadMyInfo", loadMyInfoAPI);
  // console.log(user.me);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "loadPosts",
    ({ pageParam = "" }) => loadPostsAPI(pageParam),
    {
      getNextPageParam: (lastPage) => {
        console.log("lastPage: ", lastPage);
        return lastPage[lastPage.length - 1]?.id;
      },
    }
  );

  const queryClient = useQueryClient();

  console.log("posts: ", posts?.pages.flat());
  console.log(queryClient);

  return <div>test</div>;
}
