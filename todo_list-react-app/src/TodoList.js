import React from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const ApiUrl = '/api/todos';


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

    loadTodos() {
        // can check this initially by going to the Network tab in the dev tools and clicking on the todos
        fetch(ApiUrl)
            .then(response => {
                if (!response.ok) {
                    // error handling 
                    if (response.status >= 400 && response.status < 500) {
                        return response.json().then(data => {
                            let err = { errorMessage: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: 'Please try again later' };
                        throw err;
                    }
                }
                return response.json();
            })
            // 2nd .then b/c json returns a promise -> this.setState({todos}) sets state todos equal to the todos that come back from the fetch call    
            .then(todos => this.setState({ todos }))
    }
// method that will actually get the todo on the page
    addTodo(value){
       fetch(ApiUrl, {
        //    fetch's default call is GET, so we had to specify POST below
           method: 'post', 
           headers: new Headers({
               'Content-Type': 'application/json'
           }),
        //    It will look to add a name, so we set the name to the value we are getting from the input
           body: JSON.stringify({name: value})
       })
       .then(response => {
        if (!response.ok) {
            // error handling 
            if (response.status >= 400 && response.status < 500) {
                return response.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            } else {
                let err = { errorMessage: 'Please try again later' };
                throw err;
            }
        }
        return response.json();
    })
    // this will add the newTodo into state after the fetch call 
        .then(newTodo => {
            // "...this.state.todos" takes all of the existing todos before adding newTodo
            this.setState({todos: [...this.state.todos, newTodo]})
        })
    }

    render() {
        // using 't' for each element in the todos array
        const todos = this.state.todos.map((t) => (
            <TodoItem
                // can use the _id data in todos obj for the key
                key={t._id}
                {...t}
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