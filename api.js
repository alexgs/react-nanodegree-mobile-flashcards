import _ from 'lodash';
import uuidGenerator from 'uuid/v4';
import { AsyncStorage } from 'react-native';
import { STORE } from './constants';

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

export const saveNewDeck = function( title ) {
    AsyncStorage.getAllKeys()
        .then( keys => {
            if ( keys.length > 0 ) {
                return AsyncStorage.multiGet( keys );
            } else {
                return Promise.resolve( _.toPairs( emptyAsyncData ) );
            }
        } )
        .then( dataPairs => {
            const id = uuidGenerator();
            const payload = { id, title };
            const newData = _.set( {}, [ STORE.DECK_METADATA, id ], payload );

            const data = fp.flow(
                fp.fromPairs,
                fp.mapValues( JSON.parse ),
                fp.merge( newData ),
                fp.mapValues( JSON.stringify ),
                fp.toPairs
            )( dataPairs );
            return AsyncStorage.multiSet( data );
        } )
        .then( errors => {
            if ( errors && errors.length > 0 ) {
                throw new Error( errors );
            } else {
                AsyncStorage.getAllKeys()
                    .then( keys => console.log( `${LOG_PREFIX} keys :: ${keys}` ) );
            }
        } )
        .catch( error => {
            console.log( `${LOG_PREFIX} error message :: ${JSON.stringify(error.message)}` );
        } );
};
