const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.token': process.env.SONARQUBE_TOKEN,
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
