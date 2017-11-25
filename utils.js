
export function errorFactory( message, errorSource ) {
    const error = new Error( message );
    error.source = errorSource;
}

export function thunkErrorHandlerFactory( errorSource ) {
    return function thunkErrorProcessor( error ) {
        if (error.source && error.source === errorSource) {
            console.log(`>>> ERROR: ${error} <<<`)
        } else {
            throw error;
        }
    }
}
