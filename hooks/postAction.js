import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postState } from "../recoil";
import {
  loadPostsAPI,
  loadUserPostsAPI,
  loadHashtagPostsAPI,
} from "../apis/post";
import produce from "../util/produce";

export function useLoadPosts() {
  const [post, setPost] = useRecoilState(postState);
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery("posts", ({ pageParam = "" }) => loadPostsAPI(pageParam), {
      getNextPageParam: (lastPage) => {
        return lastPage.length === 10
          ? lastPage[lastPage.length - 1].id
          : undefined;
      },
    });

  useEffect(() => {
    if (data) {
      setPost((prev) =>
        produce(prev, (draft) => {
          draft.mainPosts = data.pages.flat();
        })
      );
    }
  }, [data]);

  return [post, fetchNextPage, hasNextPage, isLoading, error];
}

export function useLoadUserPosts(userId) {
  const [postStateBlock, setPostState] = useRecoilState(postState);
  const {
    data,
    fetchNextPage: loadNextPosts,
    hasNextPage: hasMorePosts,
    isLoading: loadUserPostsLoading,
    error: loadUserPostsError,
  } = useInfiniteQuery(
    ["posts", userId],
    ({ pageParam = "" }) => loadUserPostsAPI(userId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length === 10
          ? lastPage[lastPage.length - 1].id
          : undefined;
      },
    }
  );

  useEffect(() => {
    if (data) {
      setPostState((prev) =>
        produce(prev, (draft) => {
          draft.mainPosts = data.pages.flat();
        })
      );
    }
  }, [data]);

  return [
    postStateBlock,
    loadNextPosts,
    hasMorePosts,
    loadUserPostsLoading,
    loadUserPostsError,
  ];
}

export function useHashtagPosts(tag) {
  const [postStateBlock, setPostState] = useRecoilState(postState);
  const {
    data,
    fetchNextPage: loadNextPosts,
    hasNextPage: hasMorePosts,
    isLoading: loadHashtagPostsLoading,
    error: loadHashtagPostsError,
  } = useInfiniteQuery(
    ["hashtag", tag],
    ({ pageParam = "" }) => loadHashtagPostsAPI(tag, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length === 10
          ? lastPage[lastPage.length - 1].id
          : undefined;
      },
    }
  );

  useEffect(() => {
    if (data) {
      setPostState((prev) =>
        produce(prev, (draft) => {
          draft.mainPosts = data.pages.flat();
        })
      );
    }
  }, [data]);

  return [
    postStateBlock,
    loadNextPosts,
    hasMorePosts,
    loadHashtagPostsLoading,
    loadHashtagPostsError,
  ];
}
