import Immutable from 'immutable';
import { ACTIONS } from '../constants';

const deckMetadataDefaultState = Immutable.Map();
const decksDefaultState = Immutable.Map();

export function deckMetadataReducer( state=deckMetadataDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.DECKS.LOAD_METADATA.COMPLETE:
            return Immutable.fromJS( action.data );
        case ACTIONS.DECKS.SAVE_NEW.COMPLETE:
            const data = Immutable.fromJS( action.data );
            return state.set( data.get( 'deckId' ), data );
        default:
            return state;
    }
}

export function decksReducer( state=decksDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.CARDS.SAVE_NEW.COMPLETE:
            const { deckId } = action.data;
            let cardList = state.get( deckId ) ? state.get( deckId ) : Immutable.List();
            cardList = cardList.push( action.data );
            return state.set( deckId, cardList );
        default:
            return state;
    }
};
