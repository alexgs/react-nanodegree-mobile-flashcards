import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import { deckMetadataReducer, dummyReducer } from './Decks/reducers';
import { STORE } from './constants';

function basicReducer( state = Immutable.Map(), action ) {
    return Immutable.fromJS( { hello: 'Susannah' } );
}

export default combineReducers( {
    [STORE.DECK_METADATA]: deckMetadataReducer,
    [STORE.DECKS]: dummyReducer,
    foo: basicReducer
} );
