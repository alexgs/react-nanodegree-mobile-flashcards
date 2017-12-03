import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from './styles';

const styleConstants = {
    horizontalPadding: 30,
    verticalPadding: 5
};

const styles = StyleSheet.create( {
    button: {
        alignItems: 'center',
        backgroundColor: colors.offwhite,
        borderColor: colors.darkgrey,
        borderRadius: 4,
        borderWidth: 1,
        elevation: 2,
        marginTop: 15,
        paddingTop: styleConstants.verticalPadding,
        paddingBottom: styleConstants.verticalPadding,
        paddingLeft: styleConstants.horizontalPadding,
        paddingRight: styleConstants.horizontalPadding,
        width: '80%'
    }
} );

class SingleDeckButton extends PureComponent {
    static propTypes = {
        onPressFunction: PropTypes.func.isRequired,
        payload: PropTypes.any
    };

    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    handleButtonPress() {
        this.props.onPressFunction( this.props.payload );
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.handleButtonPress } style={ styles.button }>
                { this.props.children }
            </TouchableOpacity>
        );
    }
}

export default SingleDeckButton;
