require('dotenv/config');
const _ = require('lodash');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event, context, callback) => {
    const {index, value} = event.queryStringParameters;

    try {
        const user = await repository.indexQuery(index, value);

        if (!user) {
            return notFound();
        }

        return ok(user);
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
