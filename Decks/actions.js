import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

function loadDeckMetadataComplete( data ) {
    return {
        type: ACTIONS.DECKS.LOAD_METADATA.COMPLETE,
        data
    };
}

export function loadDeckMetadataStart() {
    return function( dispatch ) {
        return api.getDeckMetaData()
            .then( metadata => dispatch( loadDeckMetadataComplete( metadata ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}

export function placeholder( data ) {
    return {
        type: ACTIONS.PLACEHOLDER,
        data: { id: data }
    };
}

function saveNewDeckComplete( data ) {
    return {
        type: ACTIONS.DECKS.SAVE_NEW.COMPLETE,
        data
    };
}

export function saveNewDeckStart( title ) {
    return function( dispatch ) {
        return api.saveNewDeck( title )
            .then( newDeckData => dispatch( saveNewDeckComplete( newDeckData ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}
