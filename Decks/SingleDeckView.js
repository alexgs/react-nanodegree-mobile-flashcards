import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Shared/Button';
import BackButton from '../Shared/HeaderBackButton';
import sharedStyles from '../Shared/styles';
import { SCREENS, STORE } from '../constants';

const styles = StyleSheet.create( {
    cardCount: {
        fontSize: 30,
        paddingTop: 10
    },
    title: {
        fontSize: 48
    }
} );

class SingleDeckView extends PureComponent {
    static navigationOptions = function( props ) {
        return {
            headerLeft: <BackButton navigation={ props.navigation } navigationTarget={ SCREENS.DECK_LIST } />,
            headerStyle: sharedStyles.header
        };
    };

    static propTypes = {
        navigation: PropTypes.shape( {
            state: PropTypes.shape( {
                params: PropTypes.shape( {
                    deckId: PropTypes.string.isRequired
                } )
            } )
        } )
    };

    constructor( props ) {
        super( props );
        this.handleAddCardPress = this.handleAddCardPress.bind( this );
        this.handleDeleteDeckPress = this.handleDeleteDeckPress.bind( this );
        this.handleStartQuizPress = this.handleStartQuizPress.bind( this );
    }

    handleAddCardPress( deckId ) {
        this.props.navigation.navigate( SCREENS.NEW_CARD, { deckId } );
    }

    handleDeleteDeckPress( deckId ) {
        const deckMetadata = this.props[ STORE.DECK_METADATA ].get( deckId );
        const deckTitle = getDeckTitle( deckId, deckMetadata );
        this.props.dispatch( actions.deleteDeckStart( deckId, deckTitle ) );
        this.props.navigation.navigate( SCREENS.DECK_LIST );
    }

    handleStartQuizPress( deckId ) {
        this.props.navigation.navigate( SCREENS.QUIZ.START, { deckId } );
    }

    componentDidMount() {
        const deckId = this.props.navigation.state.params.deckId;
        this.props.dispatch( actions.loadCardsStart( deckId ) );
    }

    render() {
        const deckId = this.props.navigation.state.params.deckId;
        const deckMetadata = this.props[ STORE.DECK_METADATA ].get( deckId );
        const cardList = this.props[ STORE.DECKS ].get( deckId );

        // Abort if we don't have critical data (maybe because we just deleted it)
        if ( !deckMetadata || !cardList ) {
            return null;
        }

        const deckTitle = getDeckTitle( deckId, deckMetadata );
        const cardCount = cardList ? cardList.size : 0;
        const cardCountLabel = cardCount === 1 ? 'card' : 'cards';
        const { height } = Dimensions.get('screen');

        return (
            <View style={ sharedStyles.container }>
                <Text style={ [ styles.title, { paddingTop: height * 0.2 } ] }>{ deckTitle }</Text>
                <Text style={ [ styles.cardCount, { paddingBottom: height * 0.1 } ] }>
                    { cardCount } { cardCountLabel }
                </Text>
                <Button onPressFunction={ this.handleAddCardPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Add Card</Text>
                </Button>
                <Button onPressFunction={ this.handleStartQuizPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Start Quiz</Text>
                </Button>
                <Button onPressFunction={ this.handleDeleteDeckPress } payload={ deckId }>
                    <Text style={ sharedStyles.buttonText }>Delete Deck</Text>
                </Button>
            </View>
        );
    }
}

function getDeckTitle( deckId, metadata ) {
    return _.startCase( metadata.get( 'title' ) );
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECK_METADATA ]: state.get( STORE.DECK_METADATA ),
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( SingleDeckView );
