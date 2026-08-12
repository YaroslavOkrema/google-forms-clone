# Google Forms Lite Clone

Base npm-workspaces monorepo for the Google Forms Lite Clone test task.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Installation

Install every workspace from the repository root with one command:

```bash
npm install
```

npm creates a single root lockfile and links the local workspaces automatically.

## Workspaces

```text
client/  React, TypeScript, Redux Toolkit, RTK Query and React Router application
server/  Node.js and TypeScript HTTP server prepared for Apollo GraphQL
shared/  Shared and generated TypeScript types for client and server
```

The client currently provides the typed API, state and routing foundation. The
feature pages intentionally remain placeholders until their dedicated stages.

## Development

Start the shared package watcher, client and server together:

```bash
npm run dev
```

- Client: `http://localhost:5173`
- GraphQL API: `http://localhost:4000/graphql`

The server port can be changed with the `PORT` environment variable.
The client uses the GraphQL URL above by default. Set `VITE_GRAPHQL_URL` in a
client environment file when the API is hosted elsewhere.

## Validation

```bash
npm run build
npm run lint
npm run typecheck
npm run format:check
```

Production server output can be started after a build with:

```bash
npm run start --workspace=@google-forms/server
```
