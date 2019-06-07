import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

function configureStore() {
  const reducer = createReducer();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      persistState([]),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (arg => arg),
    ),
  );

  return store;
}

function createReducer() {
  return combineReducers({
  });
}


export { createReducer };
export default configureStore;
