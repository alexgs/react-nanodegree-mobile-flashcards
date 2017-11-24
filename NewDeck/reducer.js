import Immutable from 'immutable';

const decksDefaultState = Immutable.Map();

export default decksReducer = function decksReducerFunction( state=decksDefaultState, action ) {
    switch( action.type ) {
        default:
            return state;
    }
};
