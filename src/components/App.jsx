import React, { Component } from 'react';
import TodoList from './TodoList/TodoList';
// import initialTodos from '../components/todos.json';
import TodoEditor from './TodoEditor';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import Modal from './Modal';

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
    todos: [],
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
    if (this.state.todos !== prevState.todos) {
      console.log('Обновилось туду');
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
        {showModal && (
          <Modal>
            <h1>Привет, это контент модалки как children</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, autem, voluptatem, quisquam impedit iusto mollitia quia
              et sint vero corrupti doloribus aperiam esse cum? Rem maxime dolor
              repudiandae libero nam. Voluptate quis nesciunt esse! Sequi ex
              ipsam placeat delectus in vel sapiente, commodi numquam quibusdam
              possimus aperiam porro, voluptatem totam?
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрыть
            </button>
          </Modal>
        )}
        {/* <h1>Состояние компонента</h1> */}
        {/* <Dropdown /> */}
        {/* <Counter   /> */}
        {/* <ColorPicker options={colorPickerOptions} defaultIdx={3}/> */}
        {/* <TodoEditor onSubmit={this.addTodo} />
        <p>Общее кол-во: {totalTodoCount}</p>
        <p>Кол-во выполненных: {completedTodoCount}</p>
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        /> */}
      </>
    );
  }
}

export default App;
