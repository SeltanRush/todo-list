import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './TodoApp.scss';

export const TodoApp = () => {
  const b = block('todo-app');
  return (
    <div className={b()}>
      <h1 className={b('title')}>Todo App</h1>
    </div>
  );
}