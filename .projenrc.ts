import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.231.0',
  minNodeVersion: '24.11.1',
  defaultReleaseBranch: 'main',
  name: 'cdk-notifier-examples',
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.PNPM,
  github: false,

});

project.gitignore.exclude('act');

project.synth();