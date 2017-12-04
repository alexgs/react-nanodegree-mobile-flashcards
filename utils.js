import { Notifications, Permissions } from 'expo'
import _ from 'lodash';
import { AsyncStorage } from 'react-native'
import { NOTIFICATION_KEY } from './constants';

export function clearLocalNotification() {
    return AsyncStorage.removeItem( NOTIFICATION_KEY )
        .then( Notifications.cancelAllScheduledNotificationsAsync );
}

const dailyReminderMessage = '👋 Don\'t forget to practice your flashcards today!';

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

const notificationSettings = {
    title: 'Practice Your Flashcards!',
    body: dailyReminderMessage,
    ios: {
        sound: true
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
    }
};

export function setLocalNotification () {
    AsyncStorage.getItem( NOTIFICATION_KEY )
        .then( JSON.parse )
        .then( ( data ) => {
            if ( data === null ) {
                Permissions.askAsync( Permissions.NOTIFICATIONS )
                    .then( ( { status } ) => {
                        if ( status === 'granted' ) {
                            // noinspection JSIgnoredPromiseFromCall
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate( tomorrow.getDate() + 1 );
                            tomorrow.setHours( 20 );
                            tomorrow.setMinutes( 0 );

                            // noinspection JSIgnoredPromiseFromCall
                            Notifications.scheduleLocalNotificationAsync(
                                notificationSettings,
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            // noinspection JSIgnoredPromiseFromCall
                            AsyncStorage.setItem( NOTIFICATION_KEY, JSON.stringify( true ) );
                        }
                    } );
            }
        } );
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
