import { App, Stack, StackProps, aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CdkNotfifierFeatureStackExample extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new dynamodb.Table(this, 'Table', {
      tableName: `Table-${branchName}`,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}

const app = new App();

const branchName = process.env.BRANCH_NAME || 'dev';
console.log(`Deploying with stack postfix ${branchName}`);

new CdkNotfifierFeatureStackExample(app, `cdk-notifier-feature-stacks-${branchName}`);

app.synth();