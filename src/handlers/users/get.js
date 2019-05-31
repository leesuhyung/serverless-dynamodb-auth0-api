require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
    const {id} = event.pathParameters;
    const user = await repository.get(id);

    if (!user) {
        return notFound();
    }

    return ok(user);
};
