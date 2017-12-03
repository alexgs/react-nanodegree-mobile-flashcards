import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

function saveNewCardComplete( data ) {
    return {
        type: ACTIONS.CARDS.SAVE_NEW.COMPLETE,
        data
    };
}

export function saveNewCardStart( cardData ) {
    // `cardData` has 3 fields: deckId, question, answer
    return function( dispatch ) {
        return api.saveNewCard( cardData )
            .then( data => dispatch( saveNewCardComplete( data ) ) )
            .catch( thunkErrorHandlerFactory( ERROR_SOURCES.API ) );
    };
}
