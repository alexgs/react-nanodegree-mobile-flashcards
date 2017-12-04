import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SCREENS, STORE } from '../constants';
import Button from '../Shared/Button';
import sharedStyles from '../Shared/styles';

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
        this.handleSimpleNav = this.handleSimpleNav.bind( this );
    }

    // componentDidMount() {}

    handleSimpleNav( deckId, quizStore ) {
        this.props.navigation.navigate( SCREENS.QUIZ.CARDS, { deckId, quizStore } );
    }

    render() {
        const deckId = this.props.navigation.state.params.deckId;
        if ( !deckId ) {
            // Too soon--abort until next call
            return null;
        }

        const quizStore = this.props.navigation.state.params.quizStore
            ? this.props.navigation.state.params.quizStore
            : initializeQuizStore( deckId, this.props[ STORE.DECKS ] );

        return (
            <View style={ sharedStyles.container }>
                <Text style={ sharedStyles.inputLabel }>Hello Quiz!</Text>
                <Button onPressFunction={ () => this.handleSimpleNav( deckId, quizStore ) }>
                    <Text style={ sharedStyles.buttonText }>Navigate!</Text>
                </Button>
            </View>
        );
    }
}

function initializeQuizStore( deckId, deckData ) {
    console.log( `!! INFO !! Initializing quiz store` );
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
