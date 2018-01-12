import * as ActionTypes from '../constants/ActionTypes';

// dummy state for testing UI
const initialState = [
  {
    id: 'DB8DCBF404CCC8C6413311A99FE5564240C7FEDAAEF1750A5EDD4749D0C6748D',
    type: 'send',
    amount: '0.000010',
    date: 'December 23 2017 20:53'
  },
  {
    id: 'FBDB40B68F0808F6CBAA53D457CBD90D140B5E1F558A865116F6DF147B4F3A9B',
    type: 'receive',
    amount: '80.000000',
    date: 'December 19 2017 14:56'
  }
];

const actionsMap = {
  [ActionTypes.ADD_TODO](state, action) {
    return [
      {
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.text
      },
      ...state
    ];
  },
  [ActionTypes.DELETE_TODO](state, action) {
    return state.filter(todo => todo.id !== action.id);
  },
  [ActionTypes.EDIT_TODO](state, action) {
    return state.map(
      todo => (todo.id === action.id ? Object.assign({}, todo, { text: action.text }) : todo)
    );
  },
  [ActionTypes.COMPLETE_TODO](state, action) {
    return state.map(
      todo =>
        todo.id === action.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo
    );
  },
  [ActionTypes.COMPLETE_ALL](state /*, action*/) {
    const areAllCompleted = state.every(todo => todo.completed);
    return state.map(todo =>
      Object.assign({}, todo, {
        completed: !areAllCompleted
      })
    );
  },
  [ActionTypes.CLEAR_COMPLETED](state /*, action*/) {
    return state.filter(todo => todo.completed === false);
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
