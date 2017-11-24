import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import TopLevelNavigator from './Navigators/TopLevel';
import store from './store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <View style={ { flex: 1 } }>
                    <TopLevelNavigator />
                </View>
            </Provider>
        );
    }
}
