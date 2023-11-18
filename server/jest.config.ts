module.exports = {
  testEnvironment: 'node',
  testRegex: '.*\\.(spec|test)\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  moduleNameMapper: {
    '@domain/(.*)': ['<rootDir>/src/domain/$1'],
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
    '@filters/(.*)': ['<rootDir>/src/filters/$1'],
    '@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
    '@constants/(.*)': ['<rootDir>/src/constants/$1'],
    '@decorators/(.*)': ['<rootDir>/src/decorators/$1']
  },
  transform: {
    '^.+\\.(ts|tsx)$': `ts-jest`
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s']
};
