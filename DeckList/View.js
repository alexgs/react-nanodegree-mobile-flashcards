import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';

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

    handleButtonPress() {
        this.props.dispatch( actions.placeholder() );
    }

    render() {
        return (
            <View>
                <Text>Hello { this.props.hello }!</Text>
                <Text>DECK LIST</Text>
                <TouchableOpacity onPress={ this.handleButtonPress } style={ styles.button }>
                    <Text style={ styles.buttonText }>DO PLACEHOLDER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( DeckListView );
