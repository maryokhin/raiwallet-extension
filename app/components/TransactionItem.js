import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TransactionItem.css';

export default class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
  };

  render() {
    const { transaction } = this.props;

    return (
      <li>
        <div className={style.view}>
          <label>{transaction.type}</label>
          <label>{transaction.amount}</label>
          <label>{transaction.date}</label>
        </div>
      </li>
    );
  }
}
