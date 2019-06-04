const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const withProcessEnv = ({ AWS_ENDPOINT, AWS_REGION, IS_OFFLINE, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY }) => () => {
    let options;

    if (!!IS_OFFLINE) {
        // IS_OFFLINE is set by the serverless-offline-plugin
        options = {
            endpoint: AWS_ENDPOINT,
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        };
    }

    return new DocumentClient(options);
};

module.exports = {
    withProcessEnv
};
