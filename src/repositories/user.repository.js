class UserRepository {
    get _baseParams() {
        return {
            TableName: 'users'
        };
    }

    constructor(documentClient) {
        this._documentClient = documentClient;
    }

    _createParamObject(additionalArgs = {}) {
        return Object.assign({}, this._baseParams, additionalArgs);
    }

    async list() {
        const params = this._createParamObject();
        const response = await this._documentClient.scan(params).promise();

        return response.Items || [];
    }

    async get(id) {
        const params = this._createParamObject({Key: {id}});
        const response = await this._documentClient.get(params).promise();
    }

    async put(user) {
        const params = this._createParamObject({ Item: user });
        await this._documentClient.put(params).promise();

        return user;
    }

    async delete(id) {
        const params = this._createParamObject({ Key: { id } });
        await this._documentClient.delete(params).promise();

        return id;
    }
}

exports.UserRepository = UserRepository;
