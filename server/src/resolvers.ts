import type { Resolvers } from '@google-forms/shared';
import { GraphQLError } from 'graphql';

import type { FormsRepository } from './formsRepository.js';
import { validateAnswers, validateQuestions } from './validation.js';

const NOT_FOUND = 'NOT_FOUND';

const throwFormNotFound = (formId: string): never => {
  throw new GraphQLError(`Form "${formId}" was not found.`, {
    extensions: { code: NOT_FOUND },
  });
};

export const createResolvers = (repository: FormsRepository): Resolvers => ({
  Query: {
    forms: () => repository.getForms(),
    form: (_parent, { id }) => repository.getForm(id) ?? null,
    responses: (_parent, { formId }) => repository.getResponses(formId),
  },
  Mutation: {
    createForm: (_parent, args) => {
      validateQuestions(args.questions);

      return repository.createForm(args);
    },
    submitResponse: (_parent, args) => {
      const form = repository.getForm(args.formId);

      if (!form) {
        return throwFormNotFound(args.formId);
      }

      validateAnswers(form, args.answers);

      return repository.createResponse(args);
    },
  },
});
