## build a restful api using serverless framework
#### with AWS lambda, AWS api gateway, AWS dynamoDB

## setup
```bash
npm i
```

```bash
sls dynamodb install
```

```bash
cp .env.dist .env
```

## usage
scan endpoint
```bash
# option: --aws-profile {profileName}
sls info
```

```bash
# http://localhost:3000
sls offline start
```

## deploy
aws IAM set credentials
```bash
# ~/.aws/credentials
sls config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

```bash
# dev
npm run deploy

# prod
npm run deploy prod
```

## dynamo db
view `serverless.yaml`, `db.js`
