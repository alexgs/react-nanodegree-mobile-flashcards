import Immutable from 'immutable';
import { ACTIONS } from '../constants';

const defaultState = Immutable.Map();

export default dummyReducer = function dummyReducerFunction( state=defaultState, action ) {
    switch( action.type ) {
        case ACTIONS.PLACEHOLDER:
            return state.set( 'placeholder', action.data );
        default:
            return state;
    }
};
