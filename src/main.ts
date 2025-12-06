import { App, Stack, StackProps, aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class CdkNotfifierFeatureStackExample extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      tableName: `Table-${branchName}`,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    new LogGroup(this, 'LogGroup', {
      logGroupName: 'alreadyexisting',
    });

    // Add GSI 1
    table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'gsi1pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'gsi1sk', type: dynamodb.AttributeType.STRING },
    });

    // Add GSI 2
    table.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: { name: 'gsi2pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'gsi2sk', type: dynamodb.AttributeType.STRING },
    });
  }
}

const app = new App();

const branchName = process.env.BRANCH_NAME || 'dev';
console.log(`Deploying with stack postfix ${branchName}`);

new CdkNotfifierFeatureStackExample(app, `cdk-notifier-feature-stacks-${branchName}`);

app.synth();