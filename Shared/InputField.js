import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from './styles';

const styles = StyleSheet.create( {
    input: {
        backgroundColor: colors.offwhite,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 24,
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        width: '80%'
    }
} );

class InputField extends React.PureComponent {
    static propTypes = {
        currentValue: PropTypes.string.isRequired,
        onChangeFunction: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleTextInputChange = this.handleTextInputChange.bind( this );
    }

    handleTextInputChange( newValue ) {
        this.props.onChangeFunction( newValue );
    }

    render() {
        return (
            <TextInput
                style={ styles.input }
                onChangeText={ this.handleTextInputChange }
                value={ this.props.currentValue }
            />
        );
    }
}

export default InputField;
