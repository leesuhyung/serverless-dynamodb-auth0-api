## setup

```bash
npm i
```

```bash
sls dynamodb install
```

## usage
scan endpoint
```bash
# option: --aws-profile {profileName}
sls info
```

```bash
sls offline start
```

## deploy
aws IAM set credentials
```bash
# ~/.aws/credentials
sls config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

```bash
# option: --aws-profile {profileName}
sls deploy
```
