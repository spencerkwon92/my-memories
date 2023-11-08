import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import _ from "lodash";

export const initialState = {
  mainPosts: [],

  singlePost: null,

  imagePaths: [],

  hasMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  createPostLoading: false,
  createPostDone: false,
  createPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  createCommentLoading: false,
  createCommentDone: false,
  createCommentError: null,

  removePostCommentLoading: false,
  removePostCommentDone: false,
  removePostCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
};

export const uploadImages = createAsyncThunk(
  "post/uploadImages",
  async (data) => {
    const res = await axios.post("/post/images", data);
    return res.data;
  }
);

const loadPostsThrottle = async (lastId) => {
  const res = await axios.get(`/posts?lastId=${lastId || 0}`);
  return res.data;
};

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  _.throttle(loadPostsThrottle, 5000)
);

export const createPost = createAsyncThunk("post/createPost", async (data) => {
  const res = await axios.post("/post", data);
  return res.data;
});

export const likePost = createAsyncThunk("post/likePost", async (data) => {
  const res = await axios.patch(`/post/${data}/like`);
  return res.data;
});

export const unLikePost = createAsyncThunk("post/unLikePost", async (data) => {
  const res = await axios.delete(`/post/${data}/like`);
  return res.data;
});

export const removePost = createAsyncThunk("post/removePost", async (data) => {
  const res = await axios.delete(`/post/${data}`);
  return res.data;
});

export const createComment = createAsyncThunk(
  "post/createComment",
  async (data) => {
    const res = await axios.post(`/post/${data.postId}/comment`, data);
    return res.data;
  }
);

export const loadUserPosts = createAsyncThunk(
  "post/loadUserPosts",
  async ({ userId, lastId }) => {
    const res = await axios.get(`/user/${userId}/posts?lastId=${lastId || 0}`);
    return res.data;
  }
);

const loadHashtagPostsThrottle = async ({ data, lastId }) => {
  const res = await axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
  return res.data;
};

export const loadHashtagPosts = createAsyncThunk(
  "post/loadHashtagPosts",
  _.throttle(loadHashtagPostsThrottle, 5000)
);

export const updatePostContent = createAsyncThunk(
  "post/updatePostContent",
  async ({ content, postId }) => {
    const res = await axios.patch(`/post/${postId}/content`, {
      content: content,
    });
    return res.data;
  }
);

export const removePostComment = createAsyncThunk(
  "post/removePostComment",
  async ({ commentId, postId }) => {
    const res = await axios.delete(`/comment/${commentId}?postId=${postId}`);
    return res.data;
  }
);

export const loadPost = createAsyncThunk("post/loadPost", async (data) => {
  const res = await axios.get(`/post/${data}`);
  return res.data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeLoadedImage(draft, action) {
      draft.imagePaths = draft.imagePaths.filter(
        (path, i) => i !== action.data
      );
    },
    removeAllLoadedImages(draft) {
      draft.imagePaths = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.post,
      }))
      //uploadImages request
      .addCase(uploadImages.pending, (state) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = state.imagePaths.concat(action.payload);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error;
      })
      //loadPosts request
      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      // createPost request
      .addCase(createPost.pending, (state) => {
        state.createPostLoading = true;
        state.createPostDone = false;
        state.createPostError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostLoading = false;
        state.createPostDone = true;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostLoading = false;
        state.createPostError = action.error;
      })
      // likePost request
      .addCase(likePost.pending, (state) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.mainPosts.find(
          (post) => post.id === action.payload.PostId
        );
        post.Likers.push({ id: action.payload.UserId });
        state.likePostLoading = false;
        state.likePostDone = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error;
      })
      // unLikePost request
      .addCase(unLikePost.pending, (state) => {
        state.unLikePostLoading = true;
        state.unLikePostDone = false;
        state.unLikePostError = null;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        const post = state.mainPosts.find(
          (post) => post.id === action.payload.PostId
        );
        post.Likers = post.Likers.filter(
          (post) => post.id !== action.payload.UserId
        );
        state.unLikePostLoading = false;
        state.unLikePostDone = true;
      })
      .addCase(unLikePost.rejected, (state, action) => {
        state.unLikePostLoading = false;
        state.unLikePostError = action.error;
      })
      // removePost request
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        state.mainPosts = state.mainPosts.filter(
          (post) => post.id !== action.payload.PostId
        );
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error;
      })
      // createComment request
      .addCase(createComment.pending, (state) => {
        state.createCommentLoading = true;
        state.createCommentDone = false;
        state.createCommentError = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const post = state.mainPosts.find(
          (post) => post.id === action.payload.PostId
        );
        post.Comments.unshift(action.payload);
        state.createCommentLoading = false;
        state.createCommentDone = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.createCommentLoading = false;
        state.createCommentError = action.error;
      })
      //loadUserPosts request
      .addCase(loadUserPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      //loadHashtagPosts request
      .addCase(loadHashtagPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      //updatePostContent request
      .addCase(updatePostContent.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostDone = false;
        state.updatePostError = null;
      })
      .addCase(updatePostContent.fulfilled, (state, action) => {
        const post = state.mainPosts.find(
          (post) => post.id === action.payload.PostId
        );
        post.content = action.payload.content;
        state.updatePostLoading = false;
        state.updatePostDone = true;
      })
      .addCase(updatePostContent.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostError = action.error;
      })
      //removePostComment request
      .addCase(removePostComment.pending, (state) => {
        state.removePostCommentLoading = true;
        state.removePostCommentDone = false;
        state.removePostCommentError = null;
      })
      .addCase(removePostComment.fulfilled, (state, action) => {
        const post = state.mainPosts.find(
          (post) => post.id === action.payload.PostId
        );
        post.Comments = post.Comments.filter(
          (comment) => comment.id !== action.payload.CommentId
        );
        state.removePostCommentLoading = false;
        state.removePostCommentDone = true;
      })
      .addCase(removePostComment.rejected, (state, action) => {
        state.removePostCommentLoading = false;
        state.removePostCommentError = action.error;
      })
      //loadPost request
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostDone = true;
        state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error;
      }),
});

export default postSlice;
