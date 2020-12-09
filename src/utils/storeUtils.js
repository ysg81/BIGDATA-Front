import {createStore} from 'redux';
import path from 'ramda/src/path';

import {DataWrap} from './dataWrap';

// 액션 이름을 오브젝트 형식으로 생성
export const generateActions = name => ({
  REQUEST: `${name}_REQUEST`,
  SUCCESS: `${name}_SUCCESS`,
  FAILURE: `${name}_FAILURE`,
});

// fetch 리듀서
export const fetchReducer = (actionObj, key) => initialValue => (state = DataWrap.init(initialValue), action) => {
  switch (action.type) {
  case actionObj.REQUEST:
    return DataWrap.go(state.wrappedData);

  case actionObj.SUCCESS:
    return DataWrap.fulfill(key ? path(['result', key])(action) : action.result);

  case actionObj.FAILURE:
    return DataWrap.reject(action.error);

  default:
    return state;
  }
};

// 빈 리듀서
const emptyReducer = initialValue => actionKey => (state, action) => (
  action.type === actionKey
    ? DataWrap.fulfill(initialValue)
    : state
);

// 빈 목록 리듀서
export const emptyListReducer = emptyReducer([]);

// 빈 오브젝트 리듀서
export const emptyObjectReducer = emptyReducer({});

// 초기화 리듀서
const clearReducer = initialValue => actionKey => (state, action) => (
  action.type === actionKey
    ? DataWrap.init(initialValue)
    : state
);

// 목록 초기화 리듀서
export const clearListReducer = clearReducer([]);

// 오브젝트 초기화 리듀서
export const clearObjectReducer = clearReducer({});

let store = null;

// 스토어 리턴
export const getStore = (reducer, enhancer) => {
  if (!store) store = createStore(reducer, enhancer);

  return store;
};
