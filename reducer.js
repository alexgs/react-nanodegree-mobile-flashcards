import { combineReducers } from 'redux-immutable';
import { deckMetadataReducer, decksReducer } from './Decks/reducers';
import { STORE } from './constants';

export default combineReducers( {
    [STORE.DECK_METADATA]: deckMetadataReducer,
    [STORE.DECKS]: decksReducer
} );
