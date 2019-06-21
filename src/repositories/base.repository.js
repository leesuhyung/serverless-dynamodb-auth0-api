const dynamodbUpdateExpression = require('dynamodb-update-expression');

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
        return await this._documentClient.scan(params).promise();
    }

    async get(id) {
        const params = this._createParamObject({Key: id});
        const response = await this._documentClient.get(params).promise();

        return response.Item;
    }

    async indexQuery(index, value) {
        const params = this._createParamObject({
            IndexName: index,
            KeyConditionExpression : `${index} = :${index}`,
            ExpressionAttributeValues: {}
        });

        params.ExpressionAttributeValues[':' + index] = value;
        return await this._documentClient.query(params).promise();
    }

    async put(item) {
        const params = this._createParamObject({Item: item});
        await this._documentClient.put(params).promise();

        return item;
    }

    // https://www.npmjs.com/package/dynamodb-update-expression
    async update(id, originalItem, updateItem) {
        const updateExpression = dynamodbUpdateExpression.getUpdateExpression(originalItem, updateItem);
        const params = Object.assign(this._createParamObject({
            Key: {id},
            ReturnValues: "UPDATED_NEW"
        }), updateExpression);

        return await this._documentClient.update(params).promise();
    }

    async delete(id) {
        const params = this._createParamObject({Key: {id}});
        await this._documentClient.delete(params).promise();

        return id;
    }
}

exports.BaseRepository = BaseRepository;
