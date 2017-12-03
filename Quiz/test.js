const QuizController = require( './QuizController' );

const controller = new QuizController();
console.log( controller.a );
controller.a = 27.4;
console.log( controller.a );
