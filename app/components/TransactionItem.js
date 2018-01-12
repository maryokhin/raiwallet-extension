import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TransactionItem.css';

export default class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired
  };

  handleLink(transactionLink) {
    chrome.tabs.create({ url: transactionLink, active: true });
  }

  render() {
    const { transaction } = this.props;
    const transactionLink = `https://raiblocks.net/block/index.php?h=${transaction.id}`;

    return (
      <li className={style.normal}>
        <div className={style.view}>
          <label>{transaction.type}</label>
          <label>{transaction.amount}</label>
          <label>{transaction.date}</label>
          <a href={transactionLink} onClick={() => this.handleLink(transactionLink)}>
            {transaction.id}
          </a>
        </div>
      </li>
    );
  }
}
