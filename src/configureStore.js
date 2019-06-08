import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducer as todoAppReducer } from './TodoApp/redux';

function configureStore() {
  const reducer = createReducer();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      persistState(['todo']),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (arg => arg),
    ),
  );

  return store;
}

function createReducer() {
  return combineReducers({
    todo: todoAppReducer,
  });
}


export { createReducer };
export default configureStore;
