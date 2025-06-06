module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: ['<rootDir>/setup.js'],
  globals: {
    NODE_ENV: 'test'
  }
};