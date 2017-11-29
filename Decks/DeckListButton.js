import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import sharedStyles from '../sharedStyles';

class DeckButton extends PureComponent {
    static propTypes = {
        deckId: PropTypes.string.isRequired,
        pressHandler: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    handleButtonPress() {
        this.props.pressHandler( this.props.deckId );
    }

    render() {
        const title = _.startCase( this.props.title );
        return (
            <TouchableOpacity onPress={ this.handleButtonPress } style={ sharedStyles.button }>
                <Text style={ sharedStyles.buttonText }>{ title }</Text>
            </TouchableOpacity>
        );
    }
}

export default DeckButton;
