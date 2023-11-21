import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postState } from "../recoil";
import { loadPostsAPI } from "../apis/post";

export function useLoadPosts() {
  const [post, setPost] = useRecoilState(postState);
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery(
      "mainPosts",
      ({ pageParam = "" }) => loadPostsAPI(pageParam),
      {
        getNextPageParam: (lastPage) => {
          return lastPage[lastPage.length - 1]?.id;
        },
      }
    );
  useEffect(() => {
    if (data) {
      setPost((prev) => ({ ...prev, mainPosts: data?.pages.flat() }));
    }
  }, [data]);

  return [post, fetchNextPage, hasNextPage, isLoading, error];
}

// export function useAddPost(){
//   const [loading, setLoading] = useState(false);
//   const []
// }
