import _ from 'lodash';
import uuidGenerator from 'uuid/v4';
import { AsyncStorage } from 'react-native';
import { ASYNC_TYPES } from './constants';

import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import fromPairs from 'lodash/fp/fromPairs';
import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import pickBy from 'lodash/fp/pickBy';
const fp = { filter, flow, fromPairs, map, mapValues, pickBy };

export function loadCards( deckId ) {
    return AsyncStorage.getAllKeys()
        .then( keys => AsyncStorage.multiGet( keys ) )
        .then( records => {
            const cards = fp.flow(
                fp.fromPairs,
                fp.map( record => JSON.parse( record ) ),
                fp.filter( record => record.type === ASYNC_TYPES.CARD && record.deckId === deckId )
            )( records );

            return Promise.resolve( cards );
        } )
}

export function loadDeckMetaData() {
    return AsyncStorage.getAllKeys()
        .then( keys => AsyncStorage.multiGet( keys ) )
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
