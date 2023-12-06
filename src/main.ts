import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { App, Duration, Stack, StackProps, aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class CdkNotfifierFeatureStackExample extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const githubProvider = new GithubActionsIdentityProvider(this, 'GithubProvider');

    const deployRole = new GithubActionsRole(this, 'DeployRole', {
      provider: githubProvider,
      owner: 'JohannesKonings',
      repo: 'cdk-notifier-feature-stacks',
      roleName: 'github-actions-role',
      description: 'This role deploys stuff to AWS',
      maxSessionDuration: Duration.hours(2),
    });
    deployRole.addToPolicy(new PolicyStatement({
      actions: ['iam:AssumeRole'],
      resources: [
        `arn:aws:iam::${this.account}:role/cdk-hnb659fds-*-role-${this.account}-${this.region}`,
      ],
    }));

    new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CdkNotfifierFeatureStackExample(app, 'cdk-notifier-feature-stacks-dev', { env: devEnv });
// new MyStack(app, 'cdk-notifier-feature-stacks-prod', { env: prodEnv });

app.synth();