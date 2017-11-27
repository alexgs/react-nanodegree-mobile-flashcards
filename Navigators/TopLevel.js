import { TabNavigator, StackNavigator } from 'react-navigation'
import MainScreen from './MainScreen';
import SingleDeckView from '../Decks/SingleDeckView';

// TODO [Future] Integrate "React Navigation" with Redux[1] ([example][2])
// [1]: https://reactnavigation.org/docs/guides/redux
// [2]: https://github.com/react-community/react-navigation/tree/master/examples/ReduxExample

const TopLevelNavigator = StackNavigator( {
    Home: {
        screen: MainScreen,
        navigationOptions: {
            header: null
        }
    },
    Deck: { screen: SingleDeckView }
} );

export default TopLevelNavigator;
