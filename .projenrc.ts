import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.138.0',
  minNodeVersion: '20.12.2',
  defaultReleaseBranch: 'main',
  name: 'cdk-notifier-examples',
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,
  github: false,

});

project.gitignore.exclude('act');

project.synth();