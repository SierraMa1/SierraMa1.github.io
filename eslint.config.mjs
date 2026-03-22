import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', '.history/**', 'src/app/blog/**'],
  },
  {
    rules: {
      // Patrones válidos en código existente (hydration, localStorage); ESLint 9 + plugin estricto
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
