import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class QuizView extends PureComponent {
    render() {
        return (
            <View>
                <Text>Quiz View</Text>
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {  };
}

export default connect( mapStateToProps )( QuizView );
