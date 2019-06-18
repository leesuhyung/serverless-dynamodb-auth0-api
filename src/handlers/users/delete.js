require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const noContent = withStatusCode(204);

exports.handler = async (event, context, callback) => {
    const {id} = event.pathParameters;

    try {
        await repository.delete(id);
        return noContent();
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
