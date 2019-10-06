module.exports = {
  use: [
    "@neutrinojs/airbnb",
    "@neutrinojs/react-components",
    [
      "@neutrinojs/jest",
      {
        setupTestFrameworkScriptFile: "<rootDir>/test-setup.js",
        snapshotSerializers: ["enzyme-to-json/serializer"]
      }
    ]
  ]
};
