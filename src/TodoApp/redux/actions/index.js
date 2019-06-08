import dayjs from 'dayjs';

export const actionTypes = {
  CREATE_TODO: 'CREATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  CHANGE_DONE_TODO: 'CHANGE_DONE_TODO',
};

export function createTodo(info) {
  return async dispatch => {
    const createdAt = dayjs().format('DD.MM.YYYY HH:mm');
    const id = Date.now();
    const todo = { ...info, isDone: false, doneDate: '', createdAt, id };
    dispatch({ type: actionTypes.CREATE_TODO, payload: { [id]: todo } });
  };
}

export function editTodo(info, id) {
  return async (dispatch, getState) => {
    const todo = getState().todo.todoList[id];
    const editedTodo = { ...todo, ...info };
    dispatch({ type: actionTypes.EDIT_TODO, payload: { [id]: editedTodo } });
  };
}