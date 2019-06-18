require('dotenv/config');
const _ = require('lodash');

const { UserRepository, withStatusCode, parseWith, withProcessEnv, uuidv1 } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200);
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

    // todo: 수정할것. https://stackoverflow.com/questions/31683075/how-to-do-a-deep-comparison-between-2-objects-with-lodash
    if (_.isEqual(originalUser.sort(), updateUser.sort())) {
        return noContent();
    }

    try {
        // todo: return data 는 JSON.stringfy 해야함. 다른메소드도 동시적용할것.
        return ok(await repository.update(id, originalUser, updateUser));
    } catch (e) {
        return callback(null, { statusCode: e.statusCode, body: JSON.stringify(e) });
    }
};
