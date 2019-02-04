import React from 'react';

class TodoForm extends React.Component {
    constructor(props){
        super(props);
        // making state here so we can capture the input value and add it as a todo
        this.state = {inputValue: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // method that allows the form to submit info
    handleChange(event){
        this.setState({
            // this extracts the value of the form input and sets it to state
            inputValue: event.target.value
        })
    }
    // method that allows the button to submit form info
    handleSubmit(){
        // taking the addTodo method from TodoList and adding the form value (this.state.inputValue)
        this.props.addTodo(this.state.inputValue)
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    /* make sure you have the value= below or this wont work */
                    value={this.state.inputValue}
                    /* this onChange will allow you to change the input field */
                    onChange={this.handleChange}
                />   
                <button
                    onClick={this.handleSubmit}
                >Add Todo</button>
            </div>
        )
    }
}


export default TodoForm;