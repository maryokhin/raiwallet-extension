import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TransactionItem.css';

export default class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired
  };

  render() {
    const { transaction } = this.props;

    return (
      <li className={style.normal}>
        <div className={style.view}>
          <label>{transaction.text}</label>
        </div>
      </li>
    );
  }
}
