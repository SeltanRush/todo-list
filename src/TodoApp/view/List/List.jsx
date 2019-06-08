import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { Todo } from './Todo/Todo';
import './List.scss';

export const List = ({ todoList }) => {
  const b = block('list');
  const items = Object.values(todoList).map(todo => <Todo key={todo.id} todo={todo} />);
  return (
    <ul className={b()}>{items.reverse()}</ul>
  );
};

List.propTypes = {
  todoList: PropTypes.object.isRequired,
};