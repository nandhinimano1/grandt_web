const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.token': 'sqa_77de266adb07256b7655fe86c9d4b03c5e0af632',
      'sonar.projectName': 'grandt',
      'sonar.projectDescription': 'test sonarqube ...',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.sources': './src',
      'sonar.exclusions': '**/*.test.tsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit()
);
