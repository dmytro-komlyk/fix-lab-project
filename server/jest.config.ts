module.exports = {
  testEnvironment: 'node',
  testRegex: '.*\\.(spec|test)\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  transform: { '^.+\\.(ts|tsx)$': `ts-jest` },

  rootDir: './src',
  moduleNameMapper: {
    '^@decorators/(.)*$': '<rootDir>/decorators'
  },

  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s']
};
