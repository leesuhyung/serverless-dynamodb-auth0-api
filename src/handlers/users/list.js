require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async (event) => {
    const users = await repository.list();

    return ok(users);
};
