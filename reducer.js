import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import newDeckReducer from './NewDeck/reducer';
import { STORE } from './constants';

function basicReducer (state=Immutable.Map(), action) {
    return Immutable.fromJS( { hello: 'Susannah' } );
}

export default combineReducers( {
    [STORE.DECKS]: newDeckReducer,
    foo: basicReducer
} );
