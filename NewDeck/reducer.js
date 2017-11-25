import Immutable from 'immutable';
import { ACTIONS } from '../constants';

const deckMetadataDefaultState = Immutable.Map();

export default function deckMetadataReducerFunction( state=deckMetadataDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.DECKS.SAVE_NEW.COMPLETE:
            const data = action.data;
            return state.set( data.id, data );
        default:
            return state;
    }
}
