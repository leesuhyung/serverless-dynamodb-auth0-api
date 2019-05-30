require('dotenv/config');

const {UserSeeder} = require('./user.seeder');
const {DynamoDB} = require('aws-sdk');
const {DocumentClient} = DynamoDB;
const usersData = require('./users-seed-data.json');

const dynamo = new DynamoDB({
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const doclient = new DocumentClient({service: dynamo});
const userSeeder = new UserSeeder(dynamo, doclient);

const log = (...arg) => console.log('>>', ...arg);

const seedUsers = async () => {
    log('users 테이블을 조회합니다.');

    const exists = await userSeeder.hasTable();

    if (exists) {
        log('users 테이블이 있음. 삭제합니다.');
        await userSeeder.deleteTable();
    }

    log('users 테이블을 생성합니다.');
    await userSeeder.createTable();

    log('데이터 시딩.');
    await userSeeder.seed(usersData);
};

seedUsers()
    .then(() => log('완료!'))
    .catch(e => log(e));
