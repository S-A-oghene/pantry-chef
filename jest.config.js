export default {
  testEnvironment: "jsdom",
  bail: false,
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{js,mjs}",
    "!src/**/index.mjs",
    "!src/js/main.mjs",
    "!src/**/*.test.{js,mjs}",
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/test/**/*.test.js"],
  transform: {},
};
