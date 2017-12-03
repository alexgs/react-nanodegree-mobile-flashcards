import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import Button from '../Shared/Button';
import InputField from '../Shared/InputField';
import sharedStyles from '../Shared/styles';
import { connect } from 'react-redux';

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

    constructor( props ) {
        super( props );
        this.state = {
            answer: '',
            question: ''
        };
        this.handleAnswerInput = this.handleAnswerInput.bind( this );
        this.handleCancelPress = this.handleCancelPress.bind( this );
        this.handleQuestionInput = this.handleQuestionInput.bind( this );
        this.handleSavePress = this.handleSavePress.bind( this );
    }

    handleAnswerInput( text ) {
        this.setState( { answer: text } );
    }

    handleCancelPress() {
        this.props.dispatch( { type: 'cancel-button-press' } );
    }

    handleQuestionInput( text ) {
        this.setState( { question: text } );
    }

    handleSavePress() {
        this.props.dispatch( { type: 'save-button-press' } );
    }

    render() {
        return (
            <View style={ [ sharedStyles.container, sharedStyles.containerVerticalCenter ] }>
                <Text style={ sharedStyles.inputLabel }>Question</Text>
                <InputField currentValue={ this.state.question } onChangeFunction={ this.handleQuestionInput } />
                <Text style={ sharedStyles.inputLabel }>Answer</Text>
                <InputField currentValue={ this.state.answer } onChangeFunction={ this.handleAnswerInput } />
                <Button onPressFunction={ this.handleSavePress }>
                    <Text style={ sharedStyles.buttonText }>Save</Text>
                </Button>
                <Button onPressFunction={ this.handleCancelPress }>
                    <Text style={ sharedStyles.buttonText }>Cancel</Text>
                </Button>
            </View>
        );
    }
}

// export default NewCardView;
export default connect()( NewCardView );
