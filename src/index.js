import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import TodoApp from './TodoApp/view/TodoApp';
import configureStore from './configureStore';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <TodoApp />
    </BrowserRouter>
  </Provider>, document.getElementById('root'),
);