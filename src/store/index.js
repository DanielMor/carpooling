import { createStore, combineReducers } from 'redux';
import app from './app/reducer';

const reducers = combineReducers({
  app,
});

export default createStore(reducers);
