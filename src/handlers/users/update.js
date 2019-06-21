require('dotenv/config');
const _ = require('lodash');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);
const noContent = withStatusCode(204);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event, context, callback) => {
    const {body, pathParameters} = event;
    const {id} = pathParameters;

    const originalUser = await repository.get(id);
    const updateUser = parseJson(body);

    if (!originalUser) {
        return notFound();
    }

    if (_.isMatch(originalUser, updateUser)) {
        return noContent();
    }

    try {
        return ok(await repository.update(id, originalUser, updateUser));
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
