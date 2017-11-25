import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const LOG_PREFIX = '+-+';

class NewDeckView extends PureComponent {
    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
        this.handleInputChange = this.handleInputChange.bind( this );
        this.state = { newDeckName: '' };
    }

    handleButtonPress() {
        this.props.dispatch( actions.saveNewDeckStart( this.state.newDeckName ) );
    }

    handleInputChange( text ) {
        this.setState( { newDeckName: text } );
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.label }>What is the title of your new deck?</Text>
                <TextInput
                    style={ styles.input }
                    onChangeText={ this.handleInputChange }
                    value={ this.state.newDeckName }
                />
                <TouchableOpacity onPress={ this.handleButtonPress } style={ styles.button }>
                    <Text style={ styles.buttonText }>SAVE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( NewDeckView );