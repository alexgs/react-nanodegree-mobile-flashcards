import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import sharedStyles from '../Shared/sharedStyles';

class NewCardView extends PureComponent {
    static propTypes = {
        navigation: PropTypes.shape( {
            state: PropTypes.shape( {
                params: PropTypes.shape( {
                    deckId: PropTypes.string.isRequired
                } )
            } )
        } )
    };

    render() {
        return (
            <View style={ sharedStyles.container }>
                <Text>Save</Text>
                <Text>Cancel</Text>
            </View>
        );
    }
}

export default NewCardView;
