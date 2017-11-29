import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import SingleDeckButton from './SingleDeckButton';
import { ACTIONS, STORE } from '../constants';

// TODO Add buttons
// TODO Layout and styles

class SingleDeckView extends PureComponent {
    static propTypes = {};

    constructor( props ) {
        super( props );
        this.handleAddCardPress = this.handleAddCardPress.bind( this );
        this.handleDeleteDeckPress = this.handleDeleteDeckPress.bind( this );
        this.handleStartQuizPress = this.handleStartQuizPress.bind( this );
    }

    handleAddCardPress( deckId ) {
        this.props.dispatch( { type: ACTIONS.PLACEHOLDER, data: deckId } );
    }

    handleDeleteDeckPress( deckId ) {
        this.props.dispatch( { type: ACTIONS.PLACEHOLDER, data: deckId } );
    }

    handleStartQuizPress( deckId ) {
        this.props.dispatch( { type: ACTIONS.PLACEHOLDER, data: deckId } );
    }

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
                <SingleDeckButton deckId={ deckId } pressHandler={ this.handleAddCardPress } text="Add Card" />
                <SingleDeckButton deckId={ deckId } pressHandler={ this.handleStartQuizPress } text="Start Quiz" />
                <SingleDeckButton deckId={ deckId } pressHandler={ this.handleDeleteDeckPress } text="Delete Deck" />
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECK_METADATA ]: state.get( STORE.DECK_METADATA ),
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( SingleDeckView );
