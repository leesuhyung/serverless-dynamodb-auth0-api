require('dotenv/config');

const { UserRepository, withStatusCode, parseWith, withProcessEnv } = require('../_init_');

const docClient = withProcessEnv(process.env)();
const repository = new UserRepository(docClient);
const created = withStatusCode(201);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
    const { body } = event;
    const contact = parseJson(body);

    await repository.put(contact);

    return created();
};
