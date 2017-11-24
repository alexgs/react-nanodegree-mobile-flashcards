import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckListView from '../DeckList/View';
import NewDeckView from '../NewDeck/View';

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
