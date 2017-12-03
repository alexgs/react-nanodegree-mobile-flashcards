import Immutable from 'immutable';
import { ACTIONS } from '../constants';

const deckMetadataDefaultState = Immutable.Map();
const decksDefaultState = Immutable.Map();

// --- DECK METADATA REDUCER ---

export function deckMetadataReducer( state=deckMetadataDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.DECKS.DELETE_DECK.COMPLETE:
            return handleDeleteMetadata( state, action.data.deckId );
        case ACTIONS.DECKS.LOAD_METADATA.COMPLETE:
            return Immutable.fromJS( action.data );
        case ACTIONS.DECKS.SAVE_NEW.COMPLETE:
            const data = Immutable.fromJS( action.data );
            return state.set( data.get( 'deckId' ), data );
        default:
            return state;
    }
}

// Helper Functions

function handleDeleteMetadata( privateState, deckId ) {
    return privateState.delete( deckId );
}

// --- DECKS REDUCER ---

export function decksReducer( state=decksDefaultState, action ) {
    switch( action.type ) {
        case ACTIONS.DECKS.DELETE_DECK.COMPLETE:
            return handleDeleteDeck( state, action.data.deckId );
        case ACTIONS.DECKS.LOAD_CARDS.COMPLETE:
            return handleLoadCards( state, action.data );
        case ACTIONS.CARDS.SAVE_NEW.COMPLETE:
            return handleSaveNewCard( state, action.data.deckId, action.data );
        default:
            return state;
    }
}

// Helper Functions

function handleDeleteDeck( privateState, deckId ) {
    const keys = privateState
        .filter( ( cardList, currentDeckId ) => currentDeckId === deckId )
        .keys();
    const mutableState = privateState.asMutable();
    for ( let key of keys) {
        mutableState.delete( key )
    }
    return mutableState.asImmutable();
}

function handleLoadCards( privateState, { cardData, deckId } ) {
    return privateState.set( deckId, Immutable.fromJS( cardData ) );
}

function handleSaveNewCard( privateState, deckId, cardData ) {
    let cardList = privateState.get( deckId ) ? privateState.get( deckId ) : Immutable.List();
    cardList = cardList.push( cardData );
    return privateState.set( deckId, cardList );
}
