import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {applyMiddleware} from 'redux';

import {getStore} from './utils/storeUtils';
import rootReducer from './appReducer';
import rootSaga from './appSaga';
import MainPage from './components/MainPage';
import Footer from './Footer';

const sagaMiddleware = createSagaMiddleware();
const store = getStore(rootReducer, applyMiddleware(sagaMiddleware));

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') window.store = store;

sagaMiddleware.run(rootSaga);

const App = props => {

  return (
    <Provider store={store}>
      <MainPage />
      <Footer />
    </Provider>
  );
};

export default App;
