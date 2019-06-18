require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async (event, context, callback) => {
    try {
        return ok(await repository.list());
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
