import nextJest from "next/jest";

import { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFiles: ["<rootDir>/jest.env.setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": ["<rootDir>/package/components/$1"],
    "^@internal/(.*)$": ["<rootDir>/package/internal/$1"],
    "^@contexts$": ["<rootDir>/package/contexts"],
    "^@hooks$": ["<rootDir>/package/hooks"],
    "^@lib/(.*)$": ["<rootDir>/package/lib/$1"],
    "^@lib$": ["<rootDir>/package/lib"],
    "^@public/(.*)$": ["<rootDir>/package/public/$1"],
    "^@styles$/(.*)$": ["<rootDir>/package/styles/$1"],
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/__old"],
  fakeTimers: {
    enableGlobally: true,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
