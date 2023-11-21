import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  me: null,

  userInfo: null,

  profileImagePath: null,

  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,

  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  signupLoading: false, // 회원가입  우도중
  signupDone: false,
  signupError: null,

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  editProfileImgeLoading: false,
  editProfileImgeDone: false,
  editProfileImgeError: null,

  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
};

export const logIn = createAsyncThunk("user/logIn", async (data) => {
  const res = await axios.post("/user/login", data);
  return res.data;
});

export const logOut = createAsyncThunk("user/logOut", async () => {
  const res = await axios.post("/user/logout");
  return res.data;
});

export const signUp = createAsyncThunk("user/signUp", async (data) => {
  const res = await axios.post("/user", data);
  return res.data;
});

export const loadMyInfo = createAsyncThunk("user/loadMyInfo", async () => {
  const res = await axios.get("/user");
  return res.data;
});

export const loadUser = createAsyncThunk("user/loadUser", async (data) => {
  const res = await axios.get(`/user/${data}`);
  return res.data;
});

export const follow = createAsyncThunk("user/follow", async (data) => {
  const res = await axios.patch(`/user/${data}/follow`);
  return res.data;
});

export const unfollow = createAsyncThunk("user/unfollow", async (data) => {
  const res = await axios.delete(`/user/${data}/follow`);
  return res.data;
});

export const changeNickname = createAsyncThunk(
  "user/changeNickname",
  async (data) => {
    const res = await axios.patch("/user/nickname", { nickname: data });
    return res.data;
  }
);

export const loadFollowers = createAsyncThunk(
  "user/loadFollowers",
  async () => {
    const res = await axios.get("/user/followers");
    return res.data;
  }
);

export const loadFollowings = createAsyncThunk(
  "user/loadFollowings",
  async () => {
    const res = await axios.get("/user/followings");
    return res.data;
  }
);

export const editProfileImage = createAsyncThunk(
  "user/editProfileImage",
  async (data) => {
    const res = await axios.patch("/user/profileImage", data);
    return res.data;
  }
);

export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (data) => {
    const res = await axios.post("/user/profileImage", data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPostPostToMe(draft, action) {
      draft.me.Posts.unshift({ id: action.payload });
    },
    removePostOfMe(draft, action) {
      draft.me.Posts = draft.me.Posts.filter(
        (post) => post.id !== action.payload
      );
    },
    removeLoadedImage(draft) {
      draft.profileImagePath = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.user,
      }))
      //login action
      .addCase(logIn.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.me = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error;
      })
      //logout action...
      .addCase(logOut.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.me = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.error;
      })
      // signup action...
      .addCase(signUp.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.error;
      })
      //loadmyinfo request action...
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error;
      })
      //loaduser request action...
      .addCase(loadUser.pending, (state) => {
        state.loadUserLoading = true;
        state.loadUserDone = false;
        state.loadUserError = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserDone = true;
        state.userInfo = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserError = action.error;
      })
      //follow request action...
      .addCase(follow.pending, (state) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.followLoading = false;
        state.me.Followings.push({ id: action.payload.UserId });
        state.followDone = true;
      })
      .addCase(follow.rejected, (state, action) => {
        state.followLoading = false;
        state.followError = action.error;
      })
      //unfollow request action...
      .addCase(unfollow.pending, (state) => {
        state.unfollowLoading = true;
        state.unfollowDone = false;
        state.unfollowError = null;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.unfollowLoading = false;
        state.me.Followings = state.me.Followings.filter(
          (following) => following.id !== action.payload.UserId
        );
        state.unfollowDone = true;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowError = action.error;
      })
      //loadFollowers request action...
      .addCase(loadFollowers.pending, (state) => {
        state.loadFollowersLoading = true;
        state.loadFollowersDone = false;
        state.loadFollowersError = null;
      })
      .addCase(loadFollowers.fulfilled, (state, action) => {
        state.loadFollowersLoading = false;
        state.me.Followers = action.payload;
        state.loadFollowersDone = true;
      })
      .addCase(loadFollowers.rejected, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersError = action.error;
      })
      //loadFollowings request action...
      .addCase(loadFollowings.pending, (state) => {
        state.loadFollowingsLoading = true;
        state.loadFollowingsDone = false;
        state.loadFollowingsError = null;
      })
      .addCase(loadFollowings.fulfilled, (state, action) => {
        state.loadFollowingsLoading = false;
        state.me.Followings = action.payload;
        state.loadFollowingsDone = true;
      })
      .addCase(loadFollowings.rejected, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsError = action.error;
      })
      //changeNickname request action...
      .addCase(changeNickname.pending, (state) => {
        state.changeNicknameLoading = true;
        state.changeNicknameDone = false;
        state.changeNicknameError = null;
      })
      .addCase(changeNickname.fulfilled, (state, action) => {
        state.changeNicknameLoading = false;
        state.changeNicknameDone = true;
        state.me.nickname = action.payload.nickname;
      })
      .addCase(changeNickname.rejected, (state, action) => {
        state.changeNicknameLoading = false;
        state.changeNicknameError = action.error;
      })
      //editprofileimage request action...
      .addCase(editProfileImage.pending, (state) => {
        state.editProfileImageLoading = true;
        state.editProfileImageDone = false;
        state.editProfileImageError = null;
      })
      .addCase(editProfileImage.fulfilled, (state, action) => {
        state.editProfileImageLoading = false;
        state.editProfileImageDone = true;
        state.me.ProfileImage = action.payload;
      })
      .addCase(editProfileImage.rejected, (state, action) => {
        state.editProfileImageLoading = false;
        state.editProfileImageError = action.error;
      })
      //uploadProfileImage request action...
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadProfileImageLoading = true;
        state.uploadProfileImageDone = false;
        state.uploadProfileImageError = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.uploadProfileImageLoading = false;
        state.profileImagePath = action.payload;
        state.uploadProfileImageDone = true;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadProfileImageLoading = false;
        state.uploadProfileImageError = action.error;
      })
      .addDefaultCase((state) => state),
});

export default userSlice;
