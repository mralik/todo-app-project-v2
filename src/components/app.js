import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.setState({ todos: todos });
    }

    render() {
        return (
            <div>
                <h3>React ToDos App</h3>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });

    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);

        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        this.setState({ todos: this.state.todos });
    }
}
