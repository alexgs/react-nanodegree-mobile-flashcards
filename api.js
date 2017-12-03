import _ from 'lodash';
import uuidGenerator from 'uuid/v4';
import { AsyncStorage } from 'react-native';
import { ASYNC_TYPES, ERROR_SOURCES } from './constants';
import { errorFactory } from './utils';

import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import fromPairs from 'lodash/fp/fromPairs';
import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import pickBy from 'lodash/fp/pickBy';
const fp = { filter, flow, fromPairs, map, mapValues, pickBy };

export function deleteDeck( deckId ) {
    const cardFilter = cardBelongsToDeckIdFactory( deckId );
    const metadataFilter = metadataBelongsToDeckIdFactory( deckId );
    const filterFunction = function( record ) {
        return cardFilter( record ) || metadataFilter( record );
    };

    return getAllRecords()
        .then( records => {
            const keys = fp.flow(
                fp.fromPairs,
                fp.map( record => JSON.parse( record ) ),
                fp.filter( filterFunction ),
                fp.map( record => {
                    if ( record.type === ASYNC_TYPES.CARD ) {
                        return record.cardId;
                    } else if ( record.type === ASYNC_TYPES.DECK_METADATA ) {
                        return record.deckId;
                    } else {
                        throw errorFactory(
                            `>>> WARNING <<< Unexpected record type "${record.type}" in function 'api.deleteDeck'`,
                            ERROR_SOURCES.API
                        );
                    }
                } )
            )( records );

            return AsyncStorage.multiRemove( keys );
        } )
        .then( errors => {
            if ( errors && errors.length > 0 ) {
                throw errorFactory(
                    `>>> ERROR <<< Error deleting key(s): ${JSON.stringify(errors)}`,
                    ERROR_SOURCES.API
                );
            } else {
                return Promise.resolve( 'Complete!' );
            }
        } );
}

export function loadCards( deckId ) {
    const filterFunction = cardBelongsToDeckIdFactory( deckId );
    return getAllRecords()
        .then( records => {
            const cards = fp.flow(
                fp.fromPairs,
                fp.map( record => JSON.parse( record ) ),
                fp.filter( filterFunction )
            )( records );

            return Promise.resolve( cards );
        } );
}

export function loadDeckMetaData() {
    return getAllRecords()
        .then( records => {
            const metadata = fp.flow(
                fp.fromPairs,
                fp.mapValues( record => JSON.parse( record ) ),
                fp.pickBy( record => record.type === ASYNC_TYPES.DECK_METADATA )
            )( records );

            return Promise.resolve( metadata );
        } );
}

export function saveNewCard( cardData ) {
    // `cardData` has 3 fields: deckId, question, answer
    const id = uuidGenerator();
    const payload = _.merge( {}, cardData, {
        type: ASYNC_TYPES.CARD,
        cardId: id
    } );
    return AsyncStorage.setItem( id, JSON.stringify( payload ) )
        .then( () => Promise.resolve( payload ) );
}

export function saveNewDeck( title ) {
    const id = uuidGenerator();
    const payload =  {
        type: ASYNC_TYPES.DECK_METADATA,
        deckId: id,
        title
    };
    return AsyncStorage.setItem( id, JSON.stringify( payload ) )
        .then( () => Promise.resolve( payload ) );
}

function cardBelongsToDeckIdFactory( deckId ) {
    return function( record ) {
        return record.type === ASYNC_TYPES.CARD && record.deckId === deckId;
    };
}

function getAllRecords() {
    return AsyncStorage.getAllKeys()
        .then( keys => AsyncStorage.multiGet( keys ) );
}

function metadataBelongsToDeckIdFactory( deckId ) {
    return function( record ) {
        return record.type === ASYNC_TYPES.DECK_METADATA && record.deckId === deckId;
    };
}
