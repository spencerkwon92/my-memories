import produce from '../util/produce'

const dummyUser = (data) => ({
  ...data,
  id: 1,
  nickname: '제로초',
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
  Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],

});

export const initialState = {
  me: null,
  
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  signupLoading: false, // 회원가입 시도중
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

  user: null,
  signUpData: {},
  loginData:{},
}


export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; 

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

// front에서 dispatch를 위해 action을 만들어준다.
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};


export default (state = initialState, action)=>produce(state, (draft)=>{
  switch(action.type){
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.loginError = null;
      draft.me = dummyUser(action.data);
      break
    case LOG_IN_FAILURE:
      loginLoading = false;
      loginDone = false;
      loginError = action.error;
      break
    case LOG_OUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break
    case LOG_OUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break
    case LOG_OUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutError = action.error;
      break
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      break
    case SIGN_UP_FAILURE:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.me.Followings.push({id: action.data});
      draft.followDone = true;
      break
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.me.Followings = draft.me.Followings.filter((v)=> v.id !== action.data)
      draft.unfollowDone = true;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
    case ADD_POST_TO_ME:
      draft.me.Posts = draft.me.Posts.unshift({id: action.data});
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v)=> v.id !== action.data);
  }
})