module.exports.db = (serverless) => {
    const getTableName = (tableName) => {
        return `${serverless.service.service}-${serverless.service.provider.stage}-${tableName}`
    };

    return {
        users: getTableName('users')
    }
};
