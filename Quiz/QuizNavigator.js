import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';
import { SCREENS } from '../constants';



const QuizNavigator = StackNavigator(
    {
        [SCREENS.QUIZ.CARDS]: {
            screen: splashScreen
        }
    },
    {
        initialRouteName: 'SplashScreen'
    }
);

function splashScreen( props ) {
    return (
        <View style={ sharedStyles.container }>
            <Text style={ sharedStyles.inputLabel }>Hello Quiz!</Text>
            <Button onPressFunction={ () => props.navigation.navigate( 'SplashScreen' ) }>
                <Text style={ sharedStyles.buttonText }>Navigate!</Text>
            </Button>
        </View>
    );
}

// Save the default function, so we can re-use it
const defaultGetStateForAction = QuizNavigator.router.getStateForAction;

// Error: Expect nav state to have routes and index
const errorData = {
    'params': {
        'deckId': '82fd2327-6187-4dca-834e-e6b5000e15db'
    },
    'key': 'id-1512337891860-2',
    'routeName': 'screens.quiz'
};

/* ACTION --> {
    "type": "Navigation/INIT",
    "params": { "deckId":"82fd2327-6187-4dca-834e-e6b5000e15db" }
} */

/* initial STATE --> undefined */
/* STATE --> {
    "params": {
        "deckId": "82fd2327-6187-4dca-834e-e6b5000e15db"
    },
    "index": 0,
    "routes": [ {
        "routeName": "SplashScreen",
        "key": "Init-id-1512338961658-2",
        "params": { "deckId":"82fd2327-6187-4dca-834e-e6b5000e15db" }
    } ],
    "key": "id-1512338961658-3",
    "routeName": "screens.quiz"
} */
/* STATE --> {
    "params": {
        "deckId": "82fd2327-6187-4dca-834e-e6b5000e15db"
    },
    "index": 2,
    "routes": [ {
        "routeName": "SplashScreen",
        "key": "Init-id-1512339100467-2",
        "params": { "deckId":"82fd2327-6187-4dca-834e-e6b5000e15db" }
    }, {
        "key": "id-1512339100467-4",
        "routeName": "SplashScreen"
    },{
        "key": "id-1512339100467-5",
        "routeName": "SplashScreen"
    } ],
    "key":"id-1512339100467-3",
    "routeName":"screens.quiz"
} */

/* NAV-RESULT --> {
    "index": 0,
    "routes": [ {
        "routeName": "SplashScreen",
        "key": "Init-id-1512338156727-2",
        "params": { "deckId":"82fd2327-6187-4dca-834e-e6b5000e15db" }
    } ]
} */
QuizNavigator.router.getStateForAction = function( action, state ) {
    console.log( `>>> ACTION <<< ${JSON.stringify( action )}` );
    console.log( `>>> STATE <<< ${JSON.stringify( state )}` );
    const navResult = defaultGetStateForAction( action, state );
    console.log( `>>> NAV-RESULT <<< ${JSON.stringify( navResult )}` );
    return navResult;
};

export default QuizNavigator;
