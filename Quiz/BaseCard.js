import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, Dimensions } from 'react-native';
import sharedStyles from '../Shared/styles';

class BaseCard extends React.PureComponent {
    static propTypes = {
        questionsRemaining: PropTypes.number,
        text: PropTypes.string.isRequired
    };

    render() {
        const questionCountdown = this.props.questionsRemaining
            ? <Text>Questions Remaining: { this.props.questionsRemaining }</Text>
            : null;
        return (
            <ScrollView contentContainerStyle={ [
                sharedStyles.container,
                sharedStyles.containerVerticalCenter,
                { width: Dimensions.get( 'window' ).width }
            ] }>
                { questionCountdown }
                <Text style={ sharedStyles.quizText }>{ this.props.text }</Text>
                { this.props.children }
            </ScrollView>
        );
    }
}

export default BaseCard;
