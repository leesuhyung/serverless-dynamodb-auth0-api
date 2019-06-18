require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event, context, callback) => {
    const { body } = event;
    let user = parseJson(body);
    user = Object.assign(user, {id: uuidv1()});

    try {
        return ok(await repository.put(user));
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
