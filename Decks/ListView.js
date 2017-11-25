import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { STORE } from '../constants';

const styleConstants = {
    buttonHorizontalPadding: 30,
    buttonVerticalPadding: 10
};

const styles = StyleSheet.create( {
    button: {
        backgroundColor: 'purple',
        marginTop: 15,
        paddingTop: styleConstants.buttonVerticalPadding,
        paddingBottom: styleConstants.buttonVerticalPadding,
        paddingLeft: styleConstants.buttonHorizontalPadding,
        paddingRight: styleConstants.buttonHorizontalPadding
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    label: {
        fontSize: 30,
        textAlign: 'center'
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 24,
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        width: '80%'
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

    handleButtonPress() {
        this.props.dispatch( actions.placeholder() );
    }

    render() {
        const metadata = this.props[ STORE.DECK_METADATA ];
        const decks = metadata.asMutable()
            .sort( ( a, b ) => a.get( 'title' ).localeCompare( b.get( 'title' ) ) )
            .map( data => <Text key={ data.get( 'id' ) }>{ data.get( 'title' ) }</Text> )
            .toArray();
        return ( <View>{ decks }</View> );
    }
}

function mapStateToProps( state ) {
    return {
        [STORE.DECK_METADATA]: state.get( STORE.DECK_METADATA )
    };
}

export default connect( mapStateToProps )( DeckListView );
