import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class SingleDeckView extends PureComponent {
    static propTypes = {};

    render() {
        return (
            <View>
                <Text>Single Deck View</Text>
                <Text>Deck ID: { this.props.navigation.state.params.id }</Text>
            </View>
        );
    }
}

export default SingleDeckView;
