import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import BaseCard from './BaseCard';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';

class QuestionCard extends React.PureComponent {
    static propTypes = {
        showAnswerFunction: PropTypes.func.isRequired,
        questionsRemaining: PropTypes.number.isRequired,
        questionText: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    handleButtonPress() {
        this.props.showAnswerFunction();
    }

    render() {
        return (
            <BaseCard questionsRemaining={ this.props.questionsRemaining } text={ this.props.questionText }>
                <Button onPressFunction={ this.handleButtonPress }>
                    <Text style={ sharedStyles.buttonText }>Show Answer</Text>
                </Button>
            </BaseCard>
        );
    }
}

export default QuestionCard;
