module.exports = {
  verbose: true,
  testMatch: ["<rootDir>/src/**/?(*.)(spec|test).js?(x)"],
  moduleDirectories: ["node_modules", "src"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    ".*\\.(css|scss)$": "<rootDir>/test/config/styles.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/config/image.js",
    "@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
    "src/components/**/*.{js,jsx}",
    "!src/components/**/index.js",
    "!src/components/**/*.test.{js,jsx}",
    "!tests/**/*.spec.{js,jsx}"
  ],
  coverageDirectory: "coverage/",
  coverageReporters: ["html", "lcov"],
  setupFiles: [
    "<rootDir>/test/config/shim.js",
    "<rootDir>/test/config/setup.js"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
