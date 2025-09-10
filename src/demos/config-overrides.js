import { override, disableEsLint } from 'customize-cra';

export default override(
  // Disable ESLint to reduce console noise
  disableEsLint(),

  // Suppress webpack warnings from dependencies
  (config) => {
    config.ignoreWarnings = [
      // Suppress "Critical dependency: the request of a dependency is an expression" warnings
      /Critical dependency: the request of a dependency is an expression/,
      // Suppress other common webpack warnings from node_modules
      /webpack compiled with \d+ warnings/
    ];

    // Also suppress these warnings in the webpack stats
    if (config.stats) {
      config.stats.warningsFilter = [
        /Critical dependency: the request of a dependency is an expression/,
        /webpack compiled with \d+ warnings/
      ];
    }

    return config;
  }
);
