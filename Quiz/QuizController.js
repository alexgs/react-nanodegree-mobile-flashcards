import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AnswerCard from './AnswerCard';
import BaseCard from './BaseCard';
import QuestionCard from './QuestionCard';
import sharedStyles from '../Shared/styles';
import { SCREENS, STORE } from '../constants';

const QUIZ_STORE = {
    CARD_LIST: 'quiz-store.card-list',
    CORRECT_ANSWER_COUNT: 'quiz-store.correct-answer-count',
    CURRENT_POSITION: 'quiz-store.current-position',
    SHOW_ANSWER: 'quiz-store.show-answer',
    TOTAL_ANSWER_COUNT: 'quiz-store.total-answer-count'
};

class QuizController extends React.PureComponent {
    static propTypes = {
        navigation: PropTypes.shape( {
            state: PropTypes.shape( {
                params: PropTypes.shape( {
                    deckId: PropTypes.string.isRequired,
                    quizStore: PropTypes.any                // Immutable.Map
                } )
            } )
        } )
    };

    constructor( props ) {
        super( props );
        this.state = {
            deckId: null,
            quizStore: null
        };
        this.handleRecordAnswerPress = this.handleRecordAnswerPress.bind( this );
        this.handleShowAnswerPress = this.handleShowAnswerPress.bind( this );
    }

    componentDidMount() {
        const deckId = this.props.navigation.state.params.deckId;
        if ( !deckId ) {
            // Too soon--abort until next call
            return;
        }

        const quizStore = this.props.navigation.state.params.quizStore
            ? this.props.navigation.state.params.quizStore
            : initializeQuizStore( deckId, this.props[ STORE.DECKS ] );

        this.setState( { deckId, quizStore } );
    }

    handleRecordAnswerPress( answeredCorrectly ) {
        let { deckId, quizStore } = this.state;
        const prevCorrectCount = quizStore.get( QUIZ_STORE.CORRECT_ANSWER_COUNT );
        const newCorrectCount = answeredCorrectly ? prevCorrectCount + 1 : prevCorrectCount;

        const newPosition = quizStore.get( QUIZ_STORE.CURRENT_POSITION ) + 1;
        const newTotalCount = quizStore.get( QUIZ_STORE.TOTAL_ANSWER_COUNT ) + 1;

        quizStore = quizStore.asMutable()
            .set( QUIZ_STORE.CORRECT_ANSWER_COUNT, newCorrectCount )
            .set( QUIZ_STORE.CURRENT_POSITION, newPosition )
            .set( QUIZ_STORE.SHOW_ANSWER, false )
            .set( QUIZ_STORE.TOTAL_ANSWER_COUNT, newTotalCount)
            .asImmutable();

        this.props.navigation.navigate( SCREENS.QUIZ.CARDS, { deckId, quizStore } );
    }

    handleShowAnswerPress() {
        let { deckId, quizStore } = this.state;
        quizStore = quizStore.set( QUIZ_STORE.SHOW_ANSWER, true );
        this.props.navigation.navigate( SCREENS.QUIZ.CARDS, { deckId, quizStore } );
    }

    render() {
        const { quizStore } = this.state;
        if ( !quizStore ) {
            // Component has not fully mounted and initialized state, so bail
            return null;
        }

        const currentPosition = quizStore.get( QUIZ_STORE.CURRENT_POSITION );
        const showAnswer = quizStore.get( QUIZ_STORE.SHOW_ANSWER );
        const cardList = quizStore.get( QUIZ_STORE.CARD_LIST );

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

function initializeQuizStore( deckId, deckData ) {
    const rawData = {
        [QUIZ_STORE.CARD_LIST]: deckData.get( deckId ),
        [QUIZ_STORE.CORRECT_ANSWER_COUNT]: 0,
        [QUIZ_STORE.CURRENT_POSITION]: 0,
        [QUIZ_STORE.SHOW_ANSWER]: false,
        [QUIZ_STORE.TOTAL_ANSWER_COUNT]: 0
    };
    return Immutable.fromJS( rawData );
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( QuizController );
