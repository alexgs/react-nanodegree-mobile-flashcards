import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from './reducer';

const store = createStore( rootReducer, devToolsEnhancer() );

export default store;
