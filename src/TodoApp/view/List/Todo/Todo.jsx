import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { importanceNames } from 'TodoApp/data';
import './Todo.scss';

export const Todo = ({ todo }) => {
  const b = block('todo');
  const { name, description, deadlineDate, deadlineTime,
    createdAt, id, importance } = todo;
  const isExpired = dayjs(`${deadlineDate} ${deadlineTime}`).isBefore();
  return (
    <li className={b({ expired: isExpired })}>
      <div className={b('top')}>
        <h4 className={b('name')}>{name}</h4>
        <span className={b('importance')}>{importanceNames[importance]}</span>
      </div>
      <div className={b('description')}>{description}</div>
      <div className={b('center')}>
        <Link className={b('button')} to={`/edit/${id}`}>Edit</Link>
      </div>
      <div className={b('bottom')}>
        <div className={b('time-item')}>
          <span className={b('time-item-title')}>Deadline:</span>
          <div className={b('time-item-date')}>{`${deadlineDate} ${deadlineTime}`}</div>
        </div>
        <div className={b('time-item')}>
          <span className={b('time-item-title')}>Created at:</span>
          <div className={b('time-item-date')}>{createdAt}</div>
        </div>
      </div>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    deadlineTime: PropTypes.string,
    deadlineDate: PropTypes.string,
    createdAt: PropTypes.string,
    importance: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};