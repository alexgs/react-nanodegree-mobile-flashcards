import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AnswerCard from './QuizCardAnswer';
import QuestionCard from './QuizCardQuestion';
import sharedStyles from '../Shared/styles';
import { STORE } from '../constants';

class QuizView extends PureComponent {
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
            currentPosition: null,
            showAnswer: null
        };
        this.handleShowAnswerPress = this.handleShowAnswerPress.bind( this );
    }

    componentDidMount() {
        this.setState( {
            currentPosition: 0,
            showAnswer: false
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
        const cardData = cardList.get( currentPosition );
        const card = showAnswer
            ? <AnswerCard text={ cardData.get( 'answer' ) } />
            : <QuestionCard showAnswerFunction={ this.handleShowAnswerPress } text={ cardData.get( 'question' ) } />;

        return (
            <View style={ sharedStyles.container }>
                { card }
            </View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        [ STORE.DECKS ]: state.get( STORE.DECKS )
    };
}

export default connect( mapStateToProps )( QuizView );
