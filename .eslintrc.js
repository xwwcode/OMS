module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    ADMIN_API: true,
  },
  rules: {
    'import/no-unresolved': [2, { ignore: ['utopa-antd-pro', '^@/', '^umi/', 'antd'] }],
    '@typescript-eslint/no-unused-vars': 0,
  },
};
