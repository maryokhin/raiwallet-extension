import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import style from './TransactionItem.css';

export default class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (text) => {
    const { transaction, deleteTodo, editTodo } = this.props;
    if (text.length === 0) {
      deleteTodo(transaction.id);
    } else {
      editTodo(transaction.id, text);
    }
    this.setState({ editing: false });
  };

  handleComplete = () => {
    const { transaction, completeTodo } = this.props;
    completeTodo(transaction.id);
  };

  handleDelete = () => {
    const { transaction, deleteTodo } = this.props;
    deleteTodo(transaction.id);
  };

  render() {
    const { transaction } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={transaction.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={transaction.completed}
            onChange={this.handleComplete}
          />
          <label onDoubleClick={this.handleDoubleClick}>{transaction.text}</label>
          <button className={style.destroy} onClick={this.handleDelete} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.completed]: transaction.completed,
          [style.editing]: this.state.editing,
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
