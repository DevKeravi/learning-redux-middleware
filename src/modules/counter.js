import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASNYC = "INCREASE_ASNYC";
const DECREASE_ASNYC = "DECREASE_ASNYC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASNYC });
export const decreaseAsync = () => ({ type: DECREASE_ASNYC });

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}
export function* counterSaga() {
  yield takeEvery(INCREASE_ASNYC, increaseSaga);
  yield takeLatest(DECREASE_ASNYC, decreaseSaga);
}
const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
