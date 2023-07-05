/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
      "axios": "axios/dist/node/axios.cjs"
    },
    "testEnvironment": "jsdom"
  };
};
