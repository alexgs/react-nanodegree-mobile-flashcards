import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

function basicReducer (state=Immutable.Map(), action) {
    return Immutable.fromJS( { hello: 'Susannah' } );
}

export default combineReducers( {
    foo: basicReducer
} );
