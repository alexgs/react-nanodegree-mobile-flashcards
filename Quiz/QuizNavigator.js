import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import AnswerCard from './AnswerCard';
import QuestionCard from './QuestionCard';
import sharedStyles from '../Shared/styles';
import { STORE } from '../constants';
import BaseCard from './BaseCard';

class QuizNavigator extends PureComponent {
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
            correctAnswerCount: null,
            currentPosition: null,
            showAnswer: null,
            totalAnswerCount: null
        };
        this.handleRecordAnswerPress = this.handleRecordAnswerPress.bind( this );
        this.handleShowAnswerPress = this.handleShowAnswerPress.bind( this );
    }

    componentDidMount() {
        this.setState( {
            correctAnswerCount: 0,
            currentPosition: 0,
            showAnswer: false,
            totalAnswerCount: 0
        } );
    }

    handleRecordAnswerPress( answeredCorrectly ) {
        const prevCorrectCount = this.state.correctAnswerCount;
        const newCorrectCount = answeredCorrectly ? prevCorrectCount + 1 : prevCorrectCount;

        const newPosition = this.state.currentPosition + 1;
        const newTotalCount = this.state.totalAnswerCount + 1;

        this.setState( {
            correctAnswerCount: newCorrectCount,
            currentPosition: newPosition,
            showAnswer: false,
            totalAnswerCount: newTotalCount
        } );
    }

    handleShowAnswerPress() {
        this.setState( { showAnswer: true } );
    }

    render() {
        const currentPosition = this.state.currentPosition;
        const showAnswer = this.state.showAnswer;
        if ( !_.isInteger( currentPosition ) || !_.isBoolean( showAnswer ) ) {
            // Component has not fully mounted and initialized state, so bail
            return null;
        }

        const deckId = this.props.navigation.state.params.deckId;
        const cardList = this.props[ STORE.DECKS ].get( deckId );

        let card = null;
        if ( currentPosition < cardList.size ) {
            const cardData = cardList.get( currentPosition );
            card = showAnswer
                ? getAnswerCard( this.handleRecordAnswerPress, cardData.get( 'answer' ) )
                : getQuestionCard( this.handleShowAnswerPress, cardData.get( 'question' ) );
        } else {
            card = getFinalCard( this.state.correctAnswerCount, this.state.totalAnswerCount );
        }
        return (
            <View style={ sharedStyles.container }>
                { card }
            </View>
        );
    }
}

function getAnswerCard( recordAnswerFunction, answerText ) {
    return (
        <AnswerCard
            answerText={ answerText }
            recordAnswerFunction={ recordAnswerFunction }
        />
    );
}

function getFinalCard( correctCount, totalCount ) {
    return (
        <BaseCard text="Your Results!">
            <Text>Correct: {correctCount}</Text>
            <Text>Total: {totalCount}</Text>
        </BaseCard>
    );
}

function getQuestionCard( showAnswerFunction, questionText ) {
    return (
        <QuestionCard
            showAnswerFunction={ showAnswerFunction }
            questionText={ questionText }
        />
    );
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( QuizNavigator );
