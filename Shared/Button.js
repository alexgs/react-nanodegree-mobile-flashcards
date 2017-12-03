import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import sharedStyles from './styles';

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
            <TouchableOpacity onPress={ this.handleButtonPress } style={ sharedStyles.button }>
                { this.props.children }
            </TouchableOpacity>
        );
    }
}

export default SingleDeckButton;
