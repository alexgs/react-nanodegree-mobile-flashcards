import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
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

class NewDeckView extends PureComponent {
    constructor( props ) {
        super( props );
        this.handleInputChange = this.handleInputChange.bind( this );
        this.state = { newDeckName: '' };
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
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( NewDeckView );
