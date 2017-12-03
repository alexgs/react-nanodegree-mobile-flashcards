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
    // Define common var names here, because each `case` block is *NOT* a separate scope. :-P
    let cardData = null;
    let deckId = null;
    switch( action.type ) {
        case ACTIONS.DECKS.LOAD_CARDS.COMPLETE:
            cardData = action.data.cardData;
            deckId = action.data.deckId;
            return state.set( deckId, Immutable.fromJS( cardData ) );
        case ACTIONS.CARDS.SAVE_NEW.COMPLETE:
            deckId = action.data.deckId;
            let cardList = state.get( deckId ) ? state.get( deckId ) : Immutable.List();
            cardList = cardList.push( action.data );
            return state.set( deckId, cardList );
        default:
            return state;
    }
};
