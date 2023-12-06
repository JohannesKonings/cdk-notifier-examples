import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.110.1',
  defaultReleaseBranch: 'main',
  name: 'cdk-notifier-feature-stacks',
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,

  deps: [
    'aws-cdk-github-oidc',
  ],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [
  //   '',
  // ],
  // packageName: undefined,  /* The "name" in package.json. */
});

project.gitignore.exclude('act');

project.synth();