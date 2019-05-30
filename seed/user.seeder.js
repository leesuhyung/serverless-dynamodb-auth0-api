// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

class UserSeeder {
    constructor(dynamodb, docClient) {
        this.dynamodb = dynamodb;
        this.docClient = docClient;

        this._tablename = 'users';
    }

    async hasTable() {
        const tables = await this.dynamodb.listTables().promise();

        return tables.TableNames && ~tables.TableNames.indexOf(this._tablename);
    }

    async createTable() {
        const tableParams = {
            TableName: this._tablename,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                }
            ],
            AttributeDefinitions: [
                // 모든 기본 및 색인 키 속성의 이름과 유형
                {
                    AttributeName: 'id',
                    AttributeType: 'S', // (S | N | B) for string, number, binary
                }
            ],
            ProvisionedThroughput: {
                // 테이블에 필요한 프로비저닝 된 처리량
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            }
        };

        const result = await this.dynamodb.createTable(tableParams).promise();

        return !!result.$response.error;
    }

    async deleteTable() {
        const result = await this.dynamodb.deleteTable({TableName: this._tablename}).promise();

        return !!result.$response.err;
    }

    async seed(users = []) {
        const putRequests = users.map(u => ({
            PutRequest: {
                Item: Object.assign({}, u)
            }
        }));

        const params = {
            RequestItems: {
                [this._tablename]: putRequests
            }
        };

        await this.docClient.batchWrite(params).promise();
    }
}

exports.UserSeeder = UserSeeder;
