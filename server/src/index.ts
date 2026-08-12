import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { createResolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import { InMemoryFormsRepository } from './repositories/formsRepository.js';

const DEFAULT_PORT = 4000;
const port = Number(process.env.PORT ?? DEFAULT_PORT);
const repository = new InMemoryFormsRepository();

const server = new ApolloServer({
  typeDefs,
  resolvers: createResolvers(repository),
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`GraphQL server is running at ${new URL('graphql', url)}`);
