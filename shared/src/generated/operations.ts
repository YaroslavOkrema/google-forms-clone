/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import type * as SchemaTypes from './graphql.js';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type FormsQueryVariables = Exact<{ [key: string]: never }>;

export type FormsQuery = {
  forms: Array<{ id: string; title: string; description: string | null }>;
};

export type FormQueryVariables = Exact<{
  id: string | number;
}>;

export type FormQuery = {
  form: {
    id: string;
    title: string;
    description: string | null;
    questions: Array<{
      id: string;
      title: string;
      type: SchemaTypes.QuestionType;
      options: Array<string>;
    }>;
  } | null;
};

export type ResponsesQueryVariables = Exact<{
  formId: string | number;
}>;

export type ResponsesQuery = {
  responses: Array<{
    id: string;
    formId: string;
    answers: Array<{ questionId: string; values: Array<string> }>;
  }>;
};

export type CreateFormMutationVariables = Exact<{
  title: string;
  description?: string | null | undefined;
  questions: Array<SchemaTypes.QuestionInput> | SchemaTypes.QuestionInput;
}>;

export type CreateFormMutation = {
  createForm: {
    id: string;
    title: string;
    description: string | null;
    questions: Array<{
      id: string;
      title: string;
      type: SchemaTypes.QuestionType;
      options: Array<string>;
    }>;
  };
};

export type SubmitResponseMutationVariables = Exact<{
  formId: string | number;
  answers: Array<SchemaTypes.AnswerInput> | SchemaTypes.AnswerInput;
}>;

export type SubmitResponseMutation = {
  submitResponse: {
    id: string;
    formId: string;
    answers: Array<{ questionId: string; values: Array<string> }>;
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>['__apiType']
  >;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const FormsDocument = new TypedDocumentString(`
    query Forms {
  forms {
    id
    title
    description
  }
}
    `) as unknown as TypedDocumentString<FormsQuery, FormsQueryVariables>;
export const FormDocument = new TypedDocumentString(`
    query Form($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      title
      type
      options
    }
  }
}
    `) as unknown as TypedDocumentString<FormQuery, FormQueryVariables>;
export const ResponsesDocument = new TypedDocumentString(`
    query Responses($formId: ID!) {
  responses(formId: $formId) {
    id
    formId
    answers {
      questionId
      values
    }
  }
}
    `) as unknown as TypedDocumentString<
  ResponsesQuery,
  ResponsesQueryVariables
>;
export const CreateFormDocument = new TypedDocumentString(`
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]!) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
    description
    questions {
      id
      title
      type
      options
    }
  }
}
    `) as unknown as TypedDocumentString<
  CreateFormMutation,
  CreateFormMutationVariables
>;
export const SubmitResponseDocument = new TypedDocumentString(`
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
  submitResponse(formId: $formId, answers: $answers) {
    id
    formId
    answers {
      questionId
      values
    }
  }
}
    `) as unknown as TypedDocumentString<
  SubmitResponseMutation,
  SubmitResponseMutationVariables
>;
