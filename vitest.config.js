import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    pool: 'threads',
    coverage: {
      provider: 'istanbul',
      skipFull: true,
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'typescript',
          typecheck: {
            enabled: true,
            only: true,
            include: !process.env.VITEST_VSCODE
              ? ['**/*.{test,spec}.{ts,tsx}']
              : [],
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'node',
          include: ['**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
    ],
  },
})
