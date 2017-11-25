import Immutable from 'immutable';
import { ACTIONS } from '../constants';

const deckMetadataDefaultState = Immutable.Map();
const dummyDefaultState = Immutable.Map();

export function deckMetadataReducer( state=deckMetadataDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.DECKS.SAVE_NEW.COMPLETE:
            const data = action.data;
            return state.set( data.id, data );
        default:
            return state;
    }
}

export function dummyReducer( state=dummyDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.PLACEHOLDER:
            return state.set( 'placeholder', action.data );
        default:
            return state;
    }
};
