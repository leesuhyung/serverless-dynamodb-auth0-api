require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const noContent = withStatusCode(204);

exports.handler = async (event) => {
    const {id} = event.pathParameters;
    await repository.delete(id);
    return noContent();
};
