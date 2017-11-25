import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import TopLevelNavigator from './Navigators/TopLevel';
import store from './store';

const styles = StyleSheet.create( {
    topLevelContainer: {
        flex: 1,
        paddingTop: 25
    }
} );

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <View style={ styles.topLevelContainer }>
                    <TopLevelNavigator />
                </View>
            </Provider>
        );
    }
}
