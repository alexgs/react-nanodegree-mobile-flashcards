import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';
import { SCREENS, STORE } from '../constants';
import * as utils from '../utils';

const styles = StyleSheet.create( {
    buttonText: {
        fontSize: 24
    },
    cardCountText: {
        color: 'darkgrey',
        fontSize: 15
    }
} );

class DeckListView extends PureComponent {
    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    componentDidMount() {
        this.props.dispatch( actions.loadDeckMetadataStart() );
    }

    handleButtonPress( deckId ) {
        this.props.navigation.navigate( SCREENS.SINGLE_DECK, { deckId } );
    }

    render() {
        const metadata = this.props[ STORE.DECK_METADATA ];
        const decks = metadata.asMutable()
            .sort( ( a, b ) => a.get( 'title' ).localeCompare( b.get( 'title' ) ) )
            .map( ( deckMetadata, deckId ) => {
                const cardList = this.props[ STORE.DECKS ].get( deckId );
                const cardCountText = utils.getCardCountText( cardList );
                const title = utils.formatDeckTitle( deckMetadata.get( 'title' ) );

                return (
                    <Button key={ deckId } payload={ deckId } onPressFunction={ this.handleButtonPress }>
                        <Text style={ [ sharedStyles.buttonText, styles.buttonText ] }>{ title }</Text>
                        <Text style={ styles.cardCountText }>{ cardCountText }</Text>
                    </Button>
                );
            } )
            .toArray();

        return (
            <ScrollView contentContainerStyle={ sharedStyles.container }>
                { decks }
            </ScrollView>
        );
    }
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECK_METADATA ]: state.get( STORE.DECK_METADATA ),
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( DeckListView );
