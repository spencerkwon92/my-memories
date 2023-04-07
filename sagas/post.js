export default function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}