import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Dummy extends PureComponent {
    render() {
        console.log( JSON.stringify( this.props, null, 2 ) );
        return (
            <View>
                <Text>Hello {this.props.hello}! Shake your booty!</Text>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.hello };
}

export default connect( mapStateToProps )( Dummy );
