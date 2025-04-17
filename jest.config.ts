import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  automock: false,
  preset: "jest-expo",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/dist/**",
    "!**/.expo/**"
  ]
};

export default config;