import React from 'react';
import IconButton from '../IconButton/IconButton';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg';

const Todo = ({ text, completed, onToggleCompleted, onDelete }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>

    <button onClick={onDelete} className="TodoList__btn">
      Удалить
    </button>
    {/* <IconButton onClick={onDelete}>
        <DeleteIcon width="32" height="32" fill='#fff'/>
    </IconButton> */}
  </>
);

export default Todo;
