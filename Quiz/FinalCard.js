import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import BaseCard from './BaseCard';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';

class FinalCard extends React.PureComponent {
    static propTypes = {
        closeFunction: PropTypes.func.isRequired,
        correctAnswerCount: PropTypes.number.isRequired,
        totalAnswerCount: PropTypes.number.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleButtonPress = this.handleButtonPress.bind( this );
    }

    handleButtonPress() {
        this.props.closeFunction();
    }

    render() {
        const {correctAnswerCount, totalAnswerCount} = this.props;
        let message = null;
        if ( correctAnswerCount <= ( totalAnswerCount / 2 ) ) {
            message = 'Keep practicing!\nYou can do it!';
        } else if ( correctAnswerCount < totalAnswerCount ) {
            message = 'Your hard work is paying off!\nGood job!';
        } else {
            message = 'Perfect!';
        }
        return (
            <BaseCard text={ message }>
                <Text>Correct: { correctAnswerCount }</Text>
                <Text>Total: { totalAnswerCount }</Text>
                <Button onPressFunction={ this.handleButtonPress }>
                    <Text style={ sharedStyles.buttonText }>Close</Text>
                </Button>
            </BaseCard>
        );
    }
}

export default FinalCard;
