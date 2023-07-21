import React, { Component } from 'react';
import TodoList from './TodoList/TodoList';
import initialTodos from '../components/todos.json';
import TodoEditor from './TodoEditor';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import Modal from './Modal';
import Tabs from './Tabs/Tabs';
import tabs from './tabs.json';
import IconButton from './IconButton/IconButton';
import { ReactComponent as AddIcon } from '../icons/add.svg';

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
    filter: '',
    showModal: false,
  };

  addTodo = text => {
    console.log('text', text);
    const todo = {
      id: nanoid(),
      text: text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    console.log('todoId', todoId);
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };
  componentDidMount() {
    console.log('App componentDidMount');
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      console.log('Обновилось туду');
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  // closeModal = () => {
  //   this.setState({ showModal: false });
  // };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <>
        {/* <Tabs items={tabs}/> */}
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          {' '}
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {/* <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* <h1>Состояние компонента</h1> */}
        {/* <Dropdown /> */}
        {/* <Counter   /> */}
        {/* <ColorPicker options={colorPickerOptions} defaultIdx={3}/> */}
        <p>Общее кол-во: {totalTodoCount}</p>
        <p>Кол-во выполненных: {completedTodoCount}</p>
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </>
    );
  }
}

export default App;
