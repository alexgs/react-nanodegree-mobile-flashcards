import _ from 'lodash';
import React, { PureComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';
import { SCREENS, STORE } from '../constants';

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
            .map( data => (
                <Button
                    key={ data.get( 'deckId' ) }
                    payload={ data.get( 'deckId' ) }
                    onPressFunction={ this.handleButtonPress }
                >
                    <Text>{ _.startCase( data.get( 'title' ) ) }</Text>
                </Button>
            ) )
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
        [STORE.DECK_METADATA]: state.get( STORE.DECK_METADATA )
    };
}

export default connect( mapStateToProps )( DeckListView );
