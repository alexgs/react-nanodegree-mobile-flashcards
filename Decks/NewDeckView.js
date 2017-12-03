import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../Shared/Button';
import InputField from '../Shared/InputField';
import sharedStyles from '../Shared/styles';

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
            <View style={ [ sharedStyles.container, sharedStyles.containerVerticalCenter ] }>
                <Text style={ sharedStyles.inputLabel }>
                    What is the title of your new deck?
                </Text>
                <InputField
                    currentValue={ this.state.newDeckName }
                    onChangeFunction={ this.handleInputChange }
                />
                <Button onPressFunction={ this.handleButtonPress } >
                    <Text style={ sharedStyles.buttonText }>SAVE</Text>
                </Button>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( NewDeckView );
