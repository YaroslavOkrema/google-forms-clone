import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { GRAPHQL_ENDPOINT } from './constants';

interface GraphQLDocument {
  toString(): string;
}

export interface GraphQLRequest {
  document: GraphQLDocument;
  variables: unknown;
}

export interface GraphQLBaseQueryError {
  message: string;
  status: number | 'FETCH_ERROR' | 'GRAPHQL_ERROR' | 'PARSING_ERROR';
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
};

const getGraphQLErrorMessage = (payload: unknown): string | undefined => {
  if (!isRecord(payload) || !Array.isArray(payload.errors)) {
    return undefined;
  }

  const messages = payload.errors.flatMap((error) => {
    if (!isRecord(error) || typeof error.message !== 'string') {
      return [];
    }

    return [error.message];
  });

  if (messages.length === 0) {
    return 'The GraphQL request failed.';
  }

  return messages.join('\n');
};

export const graphqlBaseQuery =
  (): BaseQueryFn<GraphQLRequest, unknown, GraphQLBaseQueryError> =>
  async ({ document, variables }, { signal }) => {
    let response: Response;

    try {
      response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: document.toString(),
          variables,
        }),
        signal,
      });
    } catch (error: unknown) {
      return {
        error: {
          message: getErrorMessage(error),
          status: 'FETCH_ERROR',
        },
      };
    }

    let payload: unknown;

    try {
      payload = await response.json();
    } catch (error: unknown) {
      return {
        error: {
          message: getErrorMessage(error),
          status: 'PARSING_ERROR',
        },
      };
    }

    const graphQLErrorMessage = getGraphQLErrorMessage(payload);

    if (!response.ok) {
      return {
        error: {
          message:
            graphQLErrorMessage ?? response.statusText ?? 'The request failed.',
          status: response.status,
        },
      };
    }

    if (graphQLErrorMessage) {
      return {
        error: {
          message: graphQLErrorMessage,
          status: 'GRAPHQL_ERROR',
        },
      };
    }

    if (!isRecord(payload) || !('data' in payload)) {
      return {
        error: {
          message: 'The GraphQL response does not contain data.',
          status: 'PARSING_ERROR',
        },
      };
    }

    return { data: payload.data };
  };
