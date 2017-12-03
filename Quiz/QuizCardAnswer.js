import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import sharedStyles from '../Shared/styles';

class QuizCardAnswer extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render() {
        return (
            <ScrollView contentContainerStyle={ [ sharedStyles.container, sharedStyles.containerVerticalCenter ] }>
                <Text style={ sharedStyles.quizText }>{ this.props.text }</Text>
            </ScrollView>
        );
    }
}

export default QuizCardAnswer;
