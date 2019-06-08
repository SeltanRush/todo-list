import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Link } from 'react-router-dom';

import { actions as todoActions } from '../redux';

import { List } from './List/List';
import { Form } from './Form/Form';
import { Edit } from './Edit/Edit';
import './TodoApp.scss';

const TodoApp = ({ createTodo, todoList, editTodo }) => {
  const b = block('todo-app');
  return (
    <div className={b()}>
      <header className={b('header')}>
        <Link className={b('link')} to="/create">Create</Link>
        <h1 className={b('title')}>Todo App</h1>
        <Link className={b('link')} to="/list">List</Link>
      </header>
      <Switch>
        <Route path="/create" render={() => <Form createTodo={createTodo} />} />
        <Route path="/list" render={() => <List todoList={todoList} />} />
        <Route
          path="/edit/:id"
          render={({ match: { params: { id } } }) => <Edit todoList={todoList} id={+id} editTodo={editTodo} />}
        />
      </Switch>
    </div>
  );
};

TodoApp.propTypes = {
  createTodo: PropTypes.func.isRequired,
  todoList: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todoList: state.todo.todoList,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    createTodo: todoActions.createTodo,
    editTodo: todoActions.editTodo,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
