import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TransactionItem.css';

export default class TransactionItem extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired
  };

  handleLink = (transactionLink) => {
    chrome.tabs.create({ url: transactionLink, active: true });
  };

  render() {
    const { transaction } = this.props;

    const sign = transaction.type === 'send' ? '-' : '+';
    const amount = `${sign}${transaction.amount}`;
    const link = `https://raiblocks.net/block/index.php?h=${transaction.id}`;
    const hash = `${transaction.id.slice(0, 10)}...${transaction.id.slice(-4)}`;

    return (
      <li className={style.normal}>
        <div className={style.container}>
          <div className={style.column}>
            <label>{transaction.type}</label>
            <label>{amount}</label>
          </div>
          <div className={style.column}>
            <label>{transaction.date}</label>
            <a href={link} onClick={() => this.handleLink(link)}>
              {hash}
            </a>
          </div>
        </div>
      </li>
    );
  }
}
