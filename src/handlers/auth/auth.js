const jwt = require('jsonwebtoken');
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;

exports.handler = async (event, context, callback) => {
    console.log(event);
    if (!event.authorizationToken) {
        return callback('Unauthorized');
    }

    const tokenParts = event.authorizationToken.split(' ');
    const tokenValue = tokenParts[1];

    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
        return callback('Unauthorized');
    }
    const options = {
        audience: AUTH0_CLIENT_ID,
    };

    try {
        jwt.verify(tokenValue, AUTH0_CLIENT_PUBLIC_KEY, options, (verifyError, decoded) => {
            if (verifyError) {
                console.log('verifyError', verifyError);
                // 401 Unauthorized
                console.log(`Token invalid. ${verifyError}`);
                return callback('Unauthorized');
            }
            // is custom authorizer function
            console.log('valid from customAuthorizer', decoded);
            return callback(null);
        });
    } catch (err) {
        console.log('catch error. Invalid token', err);
        return callback('Unauthorized');
    }
};
