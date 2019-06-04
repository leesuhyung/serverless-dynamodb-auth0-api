class BaseRepository {
    get _baseParams() {
        return {
            TableName: this._tableName
        };
    }

    constructor(documentClient, tableName) {
        this._documentClient = documentClient;
        this._tableName = tableName;
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

    async put(item) {
        const params = this._createParamObject({Item: item});
        await this._documentClient.put(params).promise();

        return item;
    }

    async delete(id) {
        const params = this._createParamObject({Key: {id}});
        await this._documentClient.delete(params).promise();

        return id;
    }
}

exports.BaseRepository = BaseRepository;
