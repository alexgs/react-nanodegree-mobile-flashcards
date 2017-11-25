import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import DeckButton from './DeckButton';
import * as actions from './actions';
import { STORE } from '../constants';

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        backgroundColor: 'oldlace',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10
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
        this.props.dispatch( actions.placeholder( deckId ) );
    }

    render() {
        const metadata = this.props[ STORE.DECK_METADATA ];
        const decks = metadata.asMutable()
            .sort( ( a, b ) => a.get( 'title' ).localeCompare( b.get( 'title' ) ) )
            .map( data => (
                <DeckButton
                    key={ data.get( 'id' ) }
                    deckId={ data.get( 'id' ) }
                    pressHandler={ this.handleButtonPress }
                    title={ data.get( 'title' ) }
                />
            ) )
            .toArray();
        return ( <View style={ styles.container }>{ decks }</View> );
    }
}

function mapStateToProps( state ) {
    return {
        [STORE.DECK_METADATA]: state.get( STORE.DECK_METADATA )
    };
}

export default connect( mapStateToProps )( DeckListView );
