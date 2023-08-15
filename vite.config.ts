import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['node_modules', 'src', 'dist'],
    // ...
    typecheck: {
      tsconfig: './tsconfig.eslint.json'
    }
  }
})
