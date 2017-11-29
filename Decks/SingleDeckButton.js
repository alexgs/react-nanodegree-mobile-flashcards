import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import sharedStyles from '../sharedStyles';

class SingleDeckButton extends PureComponent {
    static propTypes = {
        deckId: PropTypes.string.isRequired,
        pressHandler: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    handleButtonPress() {
        this.props.pressHandler( this.props.deckId );
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.handleButtonPress } style={ sharedStyles.button }>
                <Text style={ sharedStyles.buttonText }>{ this.props.text }</Text>
            </TouchableOpacity>
        );
    }
}

export default SingleDeckButton;
