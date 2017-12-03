import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';

class QuestionCard extends React.PureComponent {
    static propTypes = {
        showAnswerFunction: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
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
            <ScrollView contentContainerStyle={ [
                sharedStyles.container,
                sharedStyles.containerVerticalCenter,
                { width: Dimensions.get( 'window' ).width }
            ] }>
                <Text style={ sharedStyles.quizText }>{ this.props.text }</Text>
                <Button onPressFunction={ this.handleButtonPress }>
                    <Text style={ sharedStyles.buttonText }>Show Answer</Text>
                </Button>
            </ScrollView>
        );
    }
}

export default QuestionCard;
