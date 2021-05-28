import { RECEIVE_COINS } from '../actions/coins';

export default function coins(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COINS:
      return {
        ...state,
        ...action.coins,
      };
    default:
      return state;
  }
}
