import React, { Component } from 'react';
import TodoList from './TodoList/TodoList';
import initialTodos from '../components/todos.json';

// import ColorPicker from './Counter/ColorPicker';
// import Counter from './Counter/Counter';
// import Dropdown from './Counter/Dropdown/Dropdown';

// const colorPickerOptions=[
// {label:'red', color:'#F44336'},
// {label:'green', color:'#4caf50'},
// {label:'blue', color:'#2196f3'},
// {label:'grey', color:'#607d8b'},
// {label:'pink', color:'#e91e63'},
// {label:'indigo', color:'#3f51b5'},
// ];

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
    return (
      <>
        <h1>Состояние компонента</h1>
        {/* <Dropdown /> */}
        {/* <Counter   /> */}
        {/* <ColorPicker options={colorPickerOptions} defaultIdx={3}/> */}
        <p>Общее кол-во: {totalTodoCount}</p>
        <p>Кол-во выполненных: {completedTodoCount}</p>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </>
    );
  }
}

export default App;
