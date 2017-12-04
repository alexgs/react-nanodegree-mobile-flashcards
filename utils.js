import _ from 'lodash';

export function errorFactory( message, errorSource ) {
    const error = new Error( message );
    error.source = errorSource;
}

export function formatDeckTitle( title ) {
    return _.startCase( title );
}

export function getCardCountText( cardList ) {
    const cardCount = cardList ? cardList.size : 0;
    const cardCountLabel = cardCount === 1 ? 'card' : 'cards';
    return `${cardCount} ${cardCountLabel}`;
}

export function getDeckTitle( metadata ) {
    return formatDeckTitle( metadata.get( 'title' ) );
}

export function thunkErrorHandlerFactory( errorSource ) {
    return function thunkErrorProcessor( error ) {
        if (error.source && error.source === errorSource) {
            console.log(`>>> ERROR: ${error} <<<`)
        } else {
            throw error;
        }
    }
}
