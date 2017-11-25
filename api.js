import _ from 'lodash';
import uuidGenerator from 'uuid/v4';
import { AsyncStorage } from 'react-native';
import { STORE } from './constants';

export const old_saveNewDeck = function( title ) {
    // Make sure there's a key for the metadata
    AsyncStorage.getAllKeys()
        .then( keys => {
            if ( !keys.includes( STORE.DECK_METADATA ) ) {
                // Store an empty object
                return AsyncStorage.setItem( STORE.DECK_METADATA, JSON.stringify( {} ) );
            } else {
                // We can skip this step, so return a fulfilled Promise
                return Promise.resolve( null );
            }
        } )
        // Get the extant deck metadata
        .then( () => AsyncStorage.getItem( STORE.DECK_METADATA ) )
        .then( metadataString => {
            const metadata = JSON.parse( metadataString );
        } );
    // Update the metadata with the new deck
    // Save the deck metadata
};
const logHeader = '{-}';
const emptyAsyncData = _.mapValues( {
    [STORE.DECK_METADATA]: {}
}, JSON.stringify );

export const saveNewDeck = function( title ) {
    AsyncStorage.getAllKeys()
        .then( keys => {
            // console.log( `${logHeader} keys :: ${JSON.stringify(keys)}` );
            if ( keys.length > 0 ) {
                return AsyncStorage.multiGet( keys );
            } else {
                return Promise.resolve( _.toPairs( emptyAsyncData ) );
            }
        } )
        .then( dataPairs => {
            // console.log( `${logHeader} dataPairs :: ${JSON.stringify(dataPairs)}` );
            const id = uuidGenerator();
            const payload = { id, title };
            const newData = _.set( {}, [ STORE.DECK_METADATA, id ], payload );

            const temp3 = _.fromPairs( dataPairs );
            const temp4 = _.mapValues( temp3, JSON.parse );

            const data = _.merge( {}, temp4, newData );
            // console.log( `${logHeader} data :: ${JSON.stringify(data)}` );

            const temp1 = _.mapValues( data, JSON.stringify );
            // console.log( `${logHeader} temp1 :: ${JSON.stringify(temp1)}` );

            const temp2 = _.toPairs( temp1 );
            // console.log( `${logHeader} temp2 :: ${JSON.stringify(temp2)}` );

            return AsyncStorage.multiSet( temp2 );
        } )
        .then( errors => {
            if ( errors && errors.length > 0 ) {
                throw new Error( errors );
            } else {
                AsyncStorage.getAllKeys()
                    .then( keys => console.log( `${logHeader} keys :: ${keys}` ) );
            }
        } )
        .catch( error => {
            console.log( logHeader + error.message );
        } );
};
