import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import coins from './coins';

export default combineReducers({
  coins,
  loadingBar: loadingBarReducer,
});
