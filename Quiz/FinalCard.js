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
        restartFunction: PropTypes.func.isRequired,
        totalAnswerCount: PropTypes.number.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleClosePress = this.handleClosePress.bind( this );
        this.handleRestartPress = this.handleRestartPress.bind( this );
    }

    handleClosePress() {
        this.props.closeFunction();
    }

    handleRestartPress() {
        this.props.restartFunction();
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
                <Button onPressFunction={ this.handleClosePress }>
                    <Text style={ sharedStyles.buttonText }>Close</Text>
                </Button>
                <Button onPressFunction={ this.handleRestartPress }>
                    <Text style={ sharedStyles.buttonText }>Restart</Text>
                </Button>
            </BaseCard>
        );
    }
}

export default FinalCard;
