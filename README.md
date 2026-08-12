# Google Forms Lite Clone

A lightweight Google Forms clone for creating forms, filling them out, and
reviewing submitted responses. The project is an npm-workspaces monorepo with a
React client, an Apollo GraphQL server, and a shared package for schema-generated
TypeScript types and operations.

## Stack

- React 19, TypeScript, React Router
- Redux Toolkit and RTK Query
- Apollo Server and GraphQL
- GraphQL Code Generator with typed document nodes and resolver types
- Vite, ESLint, Prettier, and npm workspaces

## Monorepo structure

```text
client/  React application, routes, page hooks, presentational components, Redux state, and RTK Query API
server/  Apollo GraphQL schema, resolvers, validation, and in-memory repository
shared/  Generated GraphQL schema types, operation types, and typed documents shared by client and server
```

The root workspace owns shared tooling, the lockfile, Codegen configuration,
and scripts that coordinate all packages.

## Architecture

The client keeps rendering and feature logic separate. Route-level pages bind
markup to page hooks, presentational components receive typed props, the form
builder draft is managed by a Redux Toolkit slice, and server data is fetched
and cached by RTK Query.

The client calls typed RTK Query endpoints, which send generated GraphQL
documents to the API. Apollo resolvers validate input and delegate storage to a
repository instead of storing data in the transport layer.

The GraphQL schema is the source of truth for API models. GraphQL Code Generator
produces shared schema types, resolver types, operation result/variable types,
and typed documents. Client and server code import these generated contracts
from `@google-forms/shared` rather than maintaining parallel handwritten
GraphQL models.

## Requirements

The versions below match the root `package.json` `engines` field:

- Node.js `>=22.12.0`
- npm `>=10`

## Installation

From the repository root, install all workspace dependencies:

```bash
npm install
```

## Development

Start the shared package watcher, Vite client, and GraphQL server concurrently:

```bash
npm run dev
```

- Client: `http://localhost:5173`
- GraphQL endpoint: `http://localhost:4000/graphql`

The server reads an optional `PORT` environment variable. The client uses the
endpoint above by default; set `VITE_GRAPHQL_URL` in the client environment when
the API is hosted elsewhere.

## Build and quality checks

Create production output for all workspaces:

```bash
npm run build
```

Run ESLint across all workspaces:

```bash
npm run lint
```

Run strict TypeScript checks without emitting files:

```bash
npm run typecheck
```

Verify Prettier formatting:

```bash
npm run format:check
```

After a production build, start the compiled server with:

```bash
npm run start --workspace=@google-forms/server
```

## GraphQL Codegen and shared types

Regenerate GraphQL types and typed operations after changing
`server/schema.graphql` or a client `.graphql` operation:

```bash
npm run codegen
```

Codegen reads the server schema and `client/src/api/**/*.graphql`, then writes
the generated output under `shared/src/generated/`. These files are generated
artifacts and should not be edited manually. The shared workspace exposes them
to both the RTK Query client and the Apollo resolver implementation.

## In-memory storage

Forms and responses are stored in server-side `Map` instances for the lifetime
of the running server process. There is no database or authentication. Restarting
the server clears all created forms and submitted responses, which is expected
for this task.
