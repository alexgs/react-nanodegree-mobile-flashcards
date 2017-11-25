import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

export function placeholder() {
    return {
        type: ACTIONS.PLACEHOLDER,
        data: {
            id: 27,
            foo: 'bar'
        }
    };
}

function saveNewDeckEnd( data ) {
    return {
        type: ACTIONS.DECKS.SAVE_NEW.COMPLETE,
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
