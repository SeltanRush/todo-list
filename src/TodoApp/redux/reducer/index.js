import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_TODO:
      return { ...state, todoList: { ...state.todoList, ...action.payload } };

    case actionTypes.EDIT_TODO:
      return { ...state, todoList: { ...state.todoList, ...action.payload } };

    default:
      return { ...state };
  }
}