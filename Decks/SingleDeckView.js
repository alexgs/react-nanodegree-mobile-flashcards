import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { STORE } from '../constants';

// TODO Add buttons
// TODO Layout and styles

class SingleDeckView extends PureComponent {
    static propTypes = {};

    render() {
        const deckId = this.props.navigation.state.params.id;
        const deckMetadata = this.props[ STORE.DECK_METADATA ].get( deckId );
        const deckData = this.props[ STORE.DECKS ].get( deckId );
        const cardCount = deckData ? deckData.size() : 0;
        const cardCountLabel = cardCount === 1 ? 'card' : 'cards';

        return (
            <View>
                <Text>{ deckMetadata.get( 'title' ) }</Text>
                <Text>{ cardCount } { cardCountLabel }</Text>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        [STORE.DECK_METADATA]: state.get( STORE.DECK_METADATA ),
        [STORE.DECKS]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( SingleDeckView );
