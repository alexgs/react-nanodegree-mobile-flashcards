import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class NewDeckView extends PureComponent {
    render() {
        // console.log( JSON.stringify( this.props, null, 2 ) );
        return (
            <View>
                <Text>Hello { this.props.hello }!</Text>
                <Text>NEW DECK</Text>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return { hello: state.getIn( [ 'foo', 'hello' ] ) };
}

export default connect( mapStateToProps )( NewDeckView );
