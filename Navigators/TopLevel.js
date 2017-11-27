import { TabNavigator, StackNavigator } from 'react-navigation'
import MainScreen from './MainScreen';
import SingleDeckView from '../Decks/SingleDeckView';

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
