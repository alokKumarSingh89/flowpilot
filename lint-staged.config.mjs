export default {
  '*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,markdown,yaml,yml}': 'prettier --write',
};
