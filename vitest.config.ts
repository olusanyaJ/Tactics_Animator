import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'apps/{web,worker}/**/*.{test,spec}.{ts,tsx,js}',
      'packages/{engine,schema,parser,db}/**/*.{test,spec}.{ts,tsx,js}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    passWithNoTests: false,
  },
});
