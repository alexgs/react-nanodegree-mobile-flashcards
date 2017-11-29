import _ from 'lodash';
import uuidGenerator from 'uuid/v4';
import { AsyncStorage } from 'react-native';
import { ERROR_SOURCES, STORE } from './constants';
import * as utils from './utils';

import flow from 'lodash/fp/flow';
import fromPairs from 'lodash/fp/fromPairs';
import mapValues from 'lodash/fp/mapValues';
import merge from 'lodash/fp/merge';
import toPairs from 'lodash/fp/toPairs';
const fp = { flow, fromPairs, mapValues, merge, toPairs };

const LOG_PREFIX = '{-}';

const emptyAsyncData = _.mapValues( {
    [STORE.DECK_METADATA]: {}
}, JSON.stringify );

export function getDeckMetaData() {
    return AsyncStorage.getAllKeys()
        .then( keys => {
            if ( keys.includes( STORE.DECK_METADATA ) ) {
                return AsyncStorage.getItem( STORE.DECK_METADATA );
            } else {
                return Promise.resolve( emptyAsyncData[ STORE.DECK_METADATA ] );
            }
        } )
        .then( json => {
            return Promise.resolve( JSON.parse( json ) );
        } );
}

export function saveNewDeck ( title ) {
    const id = uuidGenerator();

    return AsyncStorage.getAllKeys()
        .then( keys => {
            // Retrieve all the data from AsyncStorage
            if ( keys.length > 0 ) {
                return AsyncStorage.multiGet( keys );
            } else {
                return Promise.resolve( _.toPairs( emptyAsyncData ) );
            }
        } )
        .then( dataPairs => {
            // Merge the new data into the data store
            const payload = { id, title };
            const newData = _.set( {}, [ STORE.DECK_METADATA, id ], payload );

            const data = fp.flow(
                fp.fromPairs,
                fp.mapValues( JSON.parse ),
                fp.merge( newData ),
                fp.mapValues( JSON.stringify ),
                fp.toPairs
            )( dataPairs );

            // Save the data
            return AsyncStorage.multiSet( data );
        } )
        .then( errors => {
            // Handle errors or retrieve the new data
            if ( errors && errors.length > 0 ) {
                const message = `${LOG_PREFIX} Error(s) saving data :: ${JSON.stringify( errors )}`;
                throw utils.errorFactory( message, ERROR_SOURCES.API );
            } else {
                return AsyncStorage.getItem( STORE.DECK_METADATA );
            }
        } )
        .then( json => {
            // Return a Promise with just the new data
            const data = _.get( JSON.parse( json ), id );
            return Promise.resolve( data );
        } );
}
