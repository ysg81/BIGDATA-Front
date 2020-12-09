import React, {useRef} from 'react';

const INITIAL = 'Initial';
const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

// Initial 상태
const init = data => wrapData(data, INITIAL);

// Pending 상태
const go = data => wrapData(data, PENDING);

// Fulfilled 상태
const fulfill = data => wrapData(data, FULFILLED);

// Rejected 상태
const reject = reason => wrapData(reason, REJECTED);

// 내부 생성자
const wrapData = (data, status = INITIAL) => ({
  get wrappedData () {
    return data;
  },
  status,
});

// 생성자
export const DataWrap = {
  init,
  go,
  fulfill,
  reject,
};

const noop = () => {};
const isFunction = o => typeof o === 'function';

const isValidOn = on => {
  if (!on) return false;
  if (!Array.isArray(on)) return false;
  if (on.length === 0) return false;

  const hasEmpty = on.filter(o => o === undefined || o === null).length > 0;

  return !hasEmpty;
};

const flattenWraps = wraps => ((wraps.length > 1) ? wraps : wraps[0]);

// 입력받은 wraps의 상태에 따라 fulfilled, rejected, pending, otherwise의 실행 결과값을 리턴
export const matchDataWrap = ({
  fulfilled = noop,
  rejected = noop,
  pending = noop,
  otherwise = noop,
}) => on => {
  const wraps = Array.isArray(on) ? on : [on];

  const isFulfilled = wraps.every(wrap => wrap.status === FULFILLED);
  const isRejected = wraps.some(wrap => wrap.status === REJECTED);
  const isPending = wraps.some(wrap => wrap.status === PENDING);

  if (isFulfilled && isFunction(fulfilled)) {
    const data = wraps.map(wrap => wrap.wrappedData);

    return fulfilled(...data);
  }

  if (isRejected && isFunction(rejected)) {
    const data = wraps.map(wrap => wrap.wrappedData);

    return rejected(...data);
  }

  if (isPending && isFunction(pending)) {
    return pending();
  }

  return otherwise();
};

export const MatchDataWrap = props => {
  const {on, children, cached = false} = props;
  const prevWraps = useRef([]);
  const wraps = Array.isArray(on) ? on : [on];

  // 현재 상태를 알아내고, 이전 wraps 저장
  const currentCase = matchDataWrap({
    fulfilled: () => {
      prevWraps.current = [...wraps];
      return FULFILLED_CASE;
    },
    rejected: () => {
      prevWraps.current = null;
      return REJECTED_CASE;
    },
    pending: () => PENDING_CASE,
    otherwise: () => INITIAL_CASE,
  })(wraps);

  const components = React.Children.toArray(children);
  const c = components.find(ch => ch.type.fName === currentCase);

  // 제공된 엘리먼트를 렌더
  if (c) return React.cloneElement(c, {on});

  // success가 아니더라도 캐쉬된 데이터가 있다면 FulfilledCase 사용
  if (
    (currentCase === INITIAL_CASE || currentCase === PENDING_CASE) &&
    cached &&
    isValidOn(prevWraps.current)
  ) {
    const s = components.find(ch => ch.type.fName === FULFILLED_CASE);
    return React.cloneElement(s, {on: flattenWraps(prevWraps.current)});
  }

  return null;
};

export const InitialCase = props => {
  const {children} = props;

  return isFunction(children) ? children() : children;
};

export const PendingCase = props => {
  const {children} = props;

  return isFunction(children) ? children() : children;
};

export const FulfilledCase = props => {
  const {children, on} = props;
  const data = Array.isArray(on) ? on.map(o => o.wrappedData) : on.wrappedData;

  return isFunction(children) ? children(data) : children;
};

export const RejectedCase = props => {
  const {children, on} = props;
  const data = Array.isArray(on) ? on.map(o => o.wrappedData) : on.wrappedData;

  return isFunction(children) ? children(data) : children;
};

/* eslint-disable no-multi-assign */
// minify 되어도 사용 가능하도록 속성값을 사용
const INITIAL_CASE = (InitialCase.fName = 'InitialCase');
const PENDING_CASE = (PendingCase.fName = 'PendingCase');
const FULFILLED_CASE = (FulfilledCase.fName = 'FulfilledCase');
const REJECTED_CASE = (RejectedCase.fName = 'RejectedCase');