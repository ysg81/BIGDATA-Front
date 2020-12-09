import {combineReducers} from 'redux';
import path from 'ramda/src/path';
import reduceReducers from 'reduce-reducers';

import { fetchReducer, clearObjectReducer } from './utils/storeUtils';
import { CLEAR_MOVIE_POINT_EXPECT, GET_MOVIE_POINT_EXPECT } from './appAction';
import { DataWrap } from './utils/dataWrap';

const moviePointExpectReducer = reduceReducers(
  DataWrap.init({}),
  fetchReducer(GET_MOVIE_POINT_EXPECT)({}),
  clearObjectReducer(CLEAR_MOVIE_POINT_EXPECT)
)

export default combineReducers({
  moviePointExpect:moviePointExpectReducer
});

const createSelector = key => path([key]);

export const moviePointExpectSelector = createSelector('moviePointExpect')
