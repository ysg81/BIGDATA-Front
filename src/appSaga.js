import {all, call, put, takeEvery} from 'redux-saga/effects';

import { GET_MOVIE_POINT_EXPECT } from './appAction';
import { apiGet } from './utils/apiUtils';

function* getMoviePointExpect (action) {
  const {moiveInfo:params} = action.payload;

  try {
    const r = yield call(apiGet, '/movieinfo.php', params);

    yield put({
      type: GET_MOVIE_POINT_EXPECT.SUCCESS,
      result: r,
    });
  } catch (e) {
    yield put({
      type: GET_MOVIE_POINT_EXPECT.FAILURE,
      error: e,
    });
  }
}

export default function* rootSaga () {
  yield all([
    takeEvery(GET_MOVIE_POINT_EXPECT.REQUEST, getMoviePointExpect),
  ]);
}
