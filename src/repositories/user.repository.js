const {BaseRepository} = require('./base.repository');

class UserRepository extends BaseRepository {
    constructor(documentClient) {
        const tableName = process.env.USERS_TABLE;
        super(documentClient, tableName)
    }
}

exports.UserRepository = UserRepository;
