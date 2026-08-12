import {
  CreateFormDocument,
  FormDocument,
  FormsDocument,
  ResponsesDocument,
  SubmitResponseDocument,
  type CreateFormMutation,
  type CreateFormMutationVariables,
  type FormQuery,
  type FormQueryVariables,
  type FormsQuery,
  type FormsQueryVariables,
  type ResponsesQuery,
  type ResponsesQueryVariables,
  type SubmitResponseMutation,
  type SubmitResponseMutationVariables,
} from '@google-forms/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { graphqlBaseQuery } from './graphqlBaseQuery';

const FORM_LIST_TAG_ID = 'LIST';

export const formsApi = createApi({
  reducerPath: 'formsApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Form', 'Response'],
  endpoints: (builder) => ({
    forms: builder.query<FormsQuery, void>({
      query: () => ({
        document: FormsDocument,
        variables: {} satisfies FormsQueryVariables,
      }),
      providesTags: (result) => [
        { type: 'Form', id: FORM_LIST_TAG_ID },
        ...(result?.forms.map(({ id }) => ({
          type: 'Form' as const,
          id,
        })) ?? []),
      ],
    }),
    form: builder.query<FormQuery, FormQueryVariables>({
      query: (variables) => ({ document: FormDocument, variables }),
      providesTags: (result) => {
        if (!result?.form) {
          return [];
        }

        return [{ type: 'Form', id: result.form.id }];
      },
    }),
    responses: builder.query<ResponsesQuery, ResponsesQueryVariables>({
      query: (variables) => ({ document: ResponsesDocument, variables }),
      providesTags: (_result, _error, { formId }) => [
        { type: 'Response', id: formId },
      ],
    }),
    createForm: builder.mutation<
      CreateFormMutation,
      CreateFormMutationVariables
    >({
      query: (variables) => ({ document: CreateFormDocument, variables }),
      invalidatesTags: [{ type: 'Form', id: FORM_LIST_TAG_ID }],
    }),
    submitResponse: builder.mutation<
      SubmitResponseMutation,
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Response', id: formId },
      ],
    }),
  }),
});

export const {
  useCreateFormMutation,
  useFormQuery,
  useFormsQuery,
  useResponsesQuery,
  useSubmitResponseMutation,
} = formsApi;
