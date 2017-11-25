import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckListView from '../Decks/ListView';
import NewDeckView from '../Decks/NewDeckView';

const MainNavigator = TabNavigator( {
    Decks: {
        screen: DeckListView,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },
    NewDeck: {
        screen: NewDeckView,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        }
    }
} );

export default MainNavigator;
