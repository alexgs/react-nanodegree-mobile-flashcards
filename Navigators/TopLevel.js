import React from 'react';
import { StackNavigator } from 'react-navigation'
import MainScreen from './MainScreen';
import NewCardView from '../Cards/NewCardView';
import SingleDeckView from '../Decks/SingleDeckView';
import QuizView from '../Quiz/QuizView';
import { SCREENS } from '../constants';

// TODO [Future] Integrate "React Navigation" with Redux[1] ([example][2])
// [1]: https://reactnavigation.org/docs/guides/redux
// [2]: https://github.com/react-community/react-navigation/tree/master/examples/ReduxExample

const TopLevelNavigator = StackNavigator(
    {
        [ SCREENS.HOME ]: {
            screen: MainScreen,
            navigationOptions: {
                header: null
            }
        },
        [ SCREENS.SINGLE_DECK ]: {
            screen: SingleDeckView
        },
        [ SCREENS.NEW_CARD ]: {
            screen: NewCardView,
            navigationOptions: {
                header: null
            }
        },
        [ SCREENS.QUIZ ]: {
            screen: QuizView,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: SCREENS.HOME
    }
);

export default TopLevelNavigator;
