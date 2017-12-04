import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

function deleteDeckComplete( deckId, title ) {
    return {
        type: ACTIONS.DECKS.DELETE_DECK.COMPLETE,
        data: { deckId, title }
    };
}

export function deleteDeckStart( deckId, title ) {
    return function( dispatch ) {
        return api.deleteDeck( deckId )
            .then( () => dispatch( deleteDeckComplete( deckId, title ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}

function loadCardsComplete( deckId, cardData ) {
    return {
        type: ACTIONS.DECKS.LOAD_CARDS.COMPLETE,
        data: { cardData, deckId }
    };
}

export function loadCardsStart( deckId ) {
    return function( dispatch ) {
        return api.loadCards( deckId )
            .then( cardData => dispatch( loadCardsComplete( deckId, cardData ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}

function loadDeckMetadataComplete( data ) {
    return {
        type: ACTIONS.DECKS.LOAD_METADATA.COMPLETE,
        data
    };
}

export function loadDeckMetadataStart() {
    return function( dispatch ) {
        return api.loadDeckMetaData()
            .then( metadata => {
                _.forEach( metadata, ( currentMetadata, deckId ) => dispatch( loadCardsStart( deckId ) ) );
                dispatch( loadDeckMetadataComplete( metadata ) )
            } )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}

function saveNewDeckComplete( data ) {
    return {
        type: ACTIONS.DECKS.SAVE_NEW.COMPLETE,
        data
    };
}

export function saveNewDeckStart( title, deckId ) {
    return function( dispatch ) {
        return api.saveNewDeck( title, deckId )
            .then( newDeckData => dispatch( saveNewDeckComplete( newDeckData ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}
