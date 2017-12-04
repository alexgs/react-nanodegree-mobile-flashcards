import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import BaseCard from './BaseCard';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';

class AnswerCard extends React.PureComponent {
    static propTypes = {
        answerText: PropTypes.string.isRequired,
        recordAnswerFunction: PropTypes.func.isRequired,
        questionsRemaining: PropTypes.number.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleCorrectPress = this.handleCorrectPress.bind( this );
        this.handleIncorrectPress = this.handleIncorrectPress.bind( this );
    }

    handleCorrectPress() {
        this.props.recordAnswerFunction( true );
    }

    handleIncorrectPress() {
        this.props.recordAnswerFunction( false );
    }

    render() {
        return (
            <BaseCard questionsRemaining={ this.props.questionsRemaining } text={ this.props.answerText }>
                <Button onPressFunction={ this.handleCorrectPress }>
                    <Text style={ sharedStyles.buttonText }>Correct</Text>
                </Button>
                <Button onPressFunction={ this.handleIncorrectPress }>
                    <Text style={ sharedStyles.buttonText }>Incorrect</Text>
                </Button>
            </BaseCard>
        );
    }
}

export default AnswerCard;
