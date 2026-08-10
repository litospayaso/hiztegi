import path from 'path';
import process from 'process';

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { fromRollup } from '@web/dev-server-rollup';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';

const timeout = 8000;

const getLogs = ({ type }) => {
  return type === 'error' || type === 'warning';
};

export default {
  filterBrowserLogs: getLogs,
  files: ['src/components/**/*.test.ts', 'src/shared/**/*.test.ts'],
  rootDir: '.',
  port: 6969,
  plugins: [
    fromRollup(typescriptPaths)({
      preserveExtensions: true,
      absolute: false,
      transform(route) {
        return path.join(process.cwd(), route);
      },
    }),
    fromRollup(commonjs)({
      include: [/node_modules\/jszip\//],
    }),
    esbuildPlugin({
      ts: true,
      js: true,
      tsconfig: path.join(process.cwd(), 'tsconfig.json'),
    }),
  ],
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: String(timeout),
    },
  },
  browsers: [
    playwrightLauncher({ product: 'chromium', launchOptions: { timeout } }),
    playwrightLauncher({ product: 'firefox', launchOptions: { timeout } }),
  ],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({
      outputPath: './test-results.xml',
    }),
  ],
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    sourcemapInclude: ['src/components/**/*.ts', 'src/shared/**/*.ts'],
    include: ['src/components/**/*.ts', 'src/shared/**/*.ts'],
    exclude: [
      'node_modules/**/*',
      'src/**/*.test.ts',
      'src/shared/httpRequest.ts',
      'src/shared/httpEndpoints.ts',
      'src/shared/functions.ts',
      'src/shared/page.ts',
      'src/shared/test-helper.ts',
    ],
    threshold: {
      statements: 80,
      branches: 70,
      functions: 70,
      lines: 80,
    },
  },
};
