import _ from 'lodash';
import * as api from '../api';
import { ACTIONS, ERROR_SOURCES } from '../constants';
import { thunkErrorHandlerFactory } from '../utils';

export function placeholder() {
    return {
        type: ACTIONS.PLACEHOLDER,
        data: {
            id: 27,
            foo: 'bar'
        }
    };
}
