import React, { useState } from 'react';
import block from 'bem-cn';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './Form.scss';

export const Form = ({ createTodo }) => {
  const b = block('form');
  const [state, changeState] = useState({
    name: '',
    description: '',
    importance: '0',
    deadlineDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    deadlineTime: dayjs().format('HH:mm'),
  });

  const { name, description, deadlineDate, deadlineTime, importance } = state;

  const setState = value => changeState({ ...state, ...value });

  const onChange = e => setState({ [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = e => {
    e.preventDefault();
    createTodo(state);
    changeState({
      name: '',
      description: '',
      importance: 0,
      deadlineDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      deadlineTime: dayjs().format('HH:mm'),
    });
  };

  return (
    <form className={b()} name="createTodo" onSubmit={onSubmit}>
      <label className={b('item')}>
        <span className={b('item-title')}>Todo name</span>
        <input
          className={b('item-input')}
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
      </label>

      <label className={b('item')}>
        <span className={b('item-title')}>Description</span>
        <textarea
          className={b('item-textarea')}
          name="description"
          onChange={onChange}
          value={description}
        />
      </label>

      <div className={b('item')}>
        <span className={b('item-title')}>Deadline</span>
        <div className={b('item-fields')}>
          <input
            className={b('item-input')}
            type="date"
            name="deadlineDate"
            onChange={onChange}
            value={deadlineDate}
          />
          <input
            className={b('item-input')}
            type="time"
            name="deadlineTime"
            onChange={onChange}
            value={deadlineTime}
          />
        </div>
      </div>

      <div className={b('item')}>
        <span className={b('item-title')}>Importance</span>
        <div className={b('item-radios')}>
          <label className={b('item-radio')}>
            <span className={b('item-radio-title')}>Normal</span>
            <input
              className={b('item-radio-input')}
              type="radio"
              name="importance"
              value="0"
              checked={importance === '0'}
              onChange={onChange}
            />
          </label>

          <label className={b('item-radio')}>
            <span className={b('item-radio-title')}>High</span>
            <input
              className={b('item-radio-input')}
              type="radio"
              name="importance"
              value="1"
              checked={importance === '1'}
              onChange={onChange}
            />
          </label>

          <label className={b('item-radio')}>
            <span className={b('item-radio-title')}>Very high</span>
            <input
              className={b('item-radio-input')}
              type="radio"
              name="importance"
              value="2"
              onChange={onChange}
              checked={importance === '2'}
            />
          </label>
        </div>

        <button className={b('submit')} type="submit">Create ToDo</button>

      </div>
    </form>
  );
};

Form.propTypes = {
  createTodo: PropTypes.func.isRequired,
};