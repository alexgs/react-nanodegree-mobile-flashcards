import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

function saveNewDeckEnd( data ) {
    return {
        type: ACTIONS.DECKS.SAVE_NEW.END,
        data
    };
}

export function saveNewDeckStart( title ) {
    return function( dispatch ) {
        return api.saveNewDeck( title )
            .then( newDeckData => dispatch( saveNewDeckEnd( newDeckData ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}
