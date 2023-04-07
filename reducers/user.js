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


export default (state = initialState, action)=>{
  switch(action.type){
    case LOG_IN_REQUEST:
      return{
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      }

    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading:false,
        loginDone:true,
        loginError:null,
        me: dummyUser(action.data),
      }
    case LOG_IN_FAILURE:
      return{
        ...state,
        loginLoading: false,
        loginDone: false,
        loginError: action.error,
      }

    case LOG_OUT_REQUEST:
      return{
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null
      }
    case LOG_OUT_SUCCESS:
      return{
        ...state,
        logoutLoading:false,
        logoutDone: true,
        logoutError: null,
      }
    case LOG_OUT_FAILURE:
      return{
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      }
    
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      }
      //TODO: it might be better to use spread operator
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone:true,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      }

    default:
      return{
        ...state,
      }
  }
}