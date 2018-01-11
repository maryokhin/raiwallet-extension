import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <header>
        <h1>Rai wallet</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="How much do you want to send?"
        />
      </header>
    );
  }
}
