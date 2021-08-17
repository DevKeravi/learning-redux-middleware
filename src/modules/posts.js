import * as postsAPI from "../api/posts";
import { handleAsyncActions, reducerUtils } from "../lib/asyncUtils";
import { getContext, takeEvery } from "redux-saga/effects";
import { createPrmoiseSaga, createPromiseSagaById } from "../lib/asyncUtils";

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";
const GO_TO_HOME = "GO_TO_HOME";

const CLEAR_POST = "CLEAR_POST";

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
export const goToHome = () => ({ type: GO_TO_HOME });
export const clearPost = () => ({ type: CLEAR_POST });

const getPostsSaga = createPrmoiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
function* goToHomeSaga() {
  const history = yield getContext("history");
  history.push("/");
}
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
}
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, "post")(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
