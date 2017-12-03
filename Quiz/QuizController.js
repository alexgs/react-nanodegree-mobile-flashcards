const store = {
    a: new WeakMap()
};

function setA( index, value ) {
    store.a.set( index, value );
}

class QuizController {
    constructor() {
        // Set an initial value for a
        setA( this, 7 );
    }

    get a() {
        return store.a.get( this );
    }

    set a( value ) {
        throw new Error( 'Property "a" is read-only' );
    }

    incrementA() {
        setA( this, this.a + 1 );
    }
}

const controller = new QuizController();
console.log( controller.a );
try {
    controller.a = 27.4;
    console.log( 'Oops!' );     // Never printed if setter is an instance method
} catch( error ) {
    console.log( `>>> ERROR <<< ${error}` );
}
console.log( controller.a );
controller.incrementA();
controller.incrementA();
console.log( controller.a );
controller.incrementA();
controller.incrementA();
console.log( controller.a );

