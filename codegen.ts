import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'server/schema.graphql',
  generates: {
    'shared/src/generated/graphql.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
