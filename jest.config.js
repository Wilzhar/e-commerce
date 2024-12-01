const { default: axios } = require("axios");

const config = {
  verbose: true,
  testEnvironmentOptions: {
    url: "http://localhost:3000",
  },
  moduleNameMapper: {
    "^axios$": "<rootDir>/node_modules/axios/dist/node/axios.cjs",
  },
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|antd|@ant-design|rc-.+?|@babel/runtime)).+(js|jsx)$"
  ]
};

module.exports = config;
