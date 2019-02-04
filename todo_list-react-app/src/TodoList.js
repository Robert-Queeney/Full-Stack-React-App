import React from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';



class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // setting todos to be an empty array to start
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentWillMount() {
        this.loadTodos()
    }

    async loadTodos() {
       let todos = await apiCalls.getTodos();
       this.setState({ todos })
    }
// method that will actually get the todo on the page
    async addTodo(value){
       let newTodo = await apiCalls.createTodo(value);
       this.setState({todos: [...this.state.todos, newTodo]})
    // this will add the newTodo into state after the fetch call 
    // "...this.state.todos" takes all of the existing todos before adding newTodo
    }
   

    async deleteTodo(id){
        await apiCalls.removeTodo(id)
        // this will get rid of the one with the id we are trying to delete
        const todos = this.state.todos.filter(todo => todo._id !== id)
        // then set state to the new todos with the one todo deleted
        this.setState({todos: todos})
    }

    async toggleTodo(todo){
        let updatedTodo = await apiCalls.updateTodo(todo)
            // maps through todos and 
            const todos = this.state.todos.map(t =>
            // if that todo's completed is equal to the updatedTodo's completed, we will change that todo's complted to the opposite
            (t._id === updatedTodo._id) ? {...t, completed: !t.completed} : t
            )
            this.setState({todos: todos})
        }

    render() {
        // using 't' for each element in the todos array
        const todos = this.state.todos.map((t) => (
            <TodoItem
                // can use the _id data in todos obj for the key
                key={t._id}
                {...t}
                // we are binding this here becasue we need data specific to this TodoItem specifically (t._id)
                onDelete={this.deleteTodo.bind(this, t._id)}
                // need the entire 't' or todo becasue we need more info than just the id to change the completed state
                onToggle={this.toggleTodo.bind(this, t)}
            />
        ));
        return (
            <div>
                <h1>Todo List!</h1>
                <TodoForm addTodo={this.addTodo}/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList; 