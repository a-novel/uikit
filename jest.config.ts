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
    "^@components/(.*)$": ["<rootDir>/components/$1"],
    "^@internal/(.*)$": ["<rootDir>/internal/$1"],
    "^@contexts$": ["<rootDir>/contexts"],
    "^@hooks$": ["<rootDir>/hooks"],
    "^@lib/(.*)$": ["<rootDir>/lib/$1"],
    "^@lib$": ["<rootDir>/lib"],
    "^@public/(.*)$": ["<rootDir>/public/$1"],
    "^@styles$/(.*)$": ["<rootDir>/styles/$1"],
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/__old"],
  fakeTimers: {
    enableGlobally: true,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
