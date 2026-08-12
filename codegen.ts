import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'server/schema.graphql',
  documents: 'client/src/api/**/*.graphql',
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    'shared/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: 'Record<PropertyKey, never>',
        useTypeImports: true,
      },
    },
    'shared/src/generated/operations.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        documentMode: 'string',
        importExtension: '.js',
        importSchemaTypesFrom: 'shared/src/generated/graphql',
        namespacedImportName: 'SchemaTypes',
        useTypeImports: true,
      },
    },
  },
};

export default config;
