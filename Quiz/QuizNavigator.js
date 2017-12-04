import { StackNavigator } from 'react-navigation';
import QuizController from './QuizController';
import { SCREENS } from '../constants';

const QuizNavigator = StackNavigator(
    {
        [ SCREENS.QUIZ.CARDS ]: {
            screen: QuizController,
            navigationOptions: { header: null }
        }
    },
    { initialRouteName: SCREENS.QUIZ.CARDS }
);

export default QuizNavigator;
