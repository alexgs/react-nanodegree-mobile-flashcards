import { TabNavigator } from 'react-navigation'
import DeckListView from '../Decks/ListView';
import NewDeckView from '../Decks/NewDeckView';
import { SCREENS } from '../constants';

const MainNavigator = TabNavigator(
    {
        [ SCREENS.DECK_LIST ]: {
            screen: DeckListView,
            navigationOptions: {
                tabBarLabel: 'Decks'
            }
        },
        [ SCREENS.NEW_DECK ]: {
            screen: NewDeckView,
            navigationOptions: {
                tabBarLabel: 'New Deck'
            }
        }
    },
    {
        initialRouteName: SCREENS.DECK_LIST
    }
);

export default MainNavigator;
