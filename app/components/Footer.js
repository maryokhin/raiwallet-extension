import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_SENT, SHOW_RECEIVED } from '../constants/TransactionFilters';
import style from './Footer.css';

const FILTERS = [SHOW_ALL, SHOW_SENT, SHOW_RECEIVED];
const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_SENT]: 'Sent',
  [SHOW_RECEIVED]: 'Received'
};

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    if (props.onShow) {
      this.filterHandlers = FILTERS.map(filter => () => props.onShow(filter));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onShow) {
      this.filterHandlers = FILTERS.map(filter => () => nextProps.onShow(filter));
    }
  }

  renderTransactionCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'transaction' : 'transactions';

    return (
      <span className={style.transactionCount}>
        <strong>{activeCount || 'No'}</strong> {itemWord}
      </span>
    );
  }

  renderFilterLink(filter, handler) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter } = this.props;

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'hand' }}
        onClick={handler}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className={style.footer}>
        {this.renderTransactionCount()}
        <ul className={style.filters}>
          {FILTERS.map((filter, i) => (
            <li key={filter}>{this.renderFilterLink(filter, this.filterHandlers[i])}</li>
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
