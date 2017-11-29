import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styleConstants = {
    buttonHorizontalPadding: 30,
    buttonVerticalPadding: 5
};

const styles = StyleSheet.create( {
    button: {
        backgroundColor: 'plum',
        marginTop: 15,
        paddingTop: styleConstants.buttonVerticalPadding,
        paddingBottom: styleConstants.buttonVerticalPadding,
        paddingLeft: styleConstants.buttonHorizontalPadding,
        paddingRight: styleConstants.buttonHorizontalPadding,
        width: '80%'
    },
    buttonText: {
        color: '#404040',
        fontSize: 18
    }
} );

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
        const { title } = this.props;
        return (
            <TouchableOpacity onPress={ this.handleButtonPress } style={ styles.button }>
                <Text style={ styles.buttonText }>{ this.props.text }</Text>
            </TouchableOpacity>
        );
    }
}

export default SingleDeckButton;
