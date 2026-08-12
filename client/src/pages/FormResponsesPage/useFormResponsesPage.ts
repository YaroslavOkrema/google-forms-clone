import { useParams } from 'react-router-dom';

import { useFormQuery, useResponsesQuery } from '../../api/formsApi';
import { formatResponseCount, prepareResponses } from './helpers';
import type { UseFormResponsesPageResult } from './types';

const LOAD_ERROR_FALLBACK =
  'Unable to load this form and its responses. Please try again.';

const getLoadErrorMessage = (
  hasFormError: boolean,
  formErrorMessage: string | undefined,
  hasResponsesError: boolean,
  responsesErrorMessage: string | undefined,
): string | null => {
  if (hasFormError) {
    return formErrorMessage ?? LOAD_ERROR_FALLBACK;
  }

  if (hasResponsesError) {
    return responsesErrorMessage ?? LOAD_ERROR_FALLBACK;
  }

  return null;
};

export const useFormResponsesPage = (): UseFormResponsesPageResult => {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? '';
  const {
    data: formData,
    error: formError,
    isError: hasFormError,
    isFetching: isFormFetching,
    isLoading: isFormLoading,
    refetch: refetchForm,
  } = useFormQuery({ id: formId }, { skip: !id });
  const {
    data: responsesData,
    error: responsesError,
    isError: hasResponsesError,
    isFetching: isResponsesFetching,
    isLoading: isResponsesLoading,
    refetch: refetchResponses,
  } = useResponsesQuery({ formId }, { skip: !id });
  const form = formData?.form ?? null;
  const responseItems = responsesData?.responses ?? [];
  const hasError = hasFormError || hasResponsesError;
  const showLoading =
    isFormLoading ||
    (isFormFetching && !formData) ||
    isResponsesLoading ||
    (isResponsesFetching && !responsesData);
  const errorMessage = getLoadErrorMessage(
    hasFormError,
    formError?.message,
    hasResponsesError,
    responsesError?.message,
  );
  const responses = form ? prepareResponses(form.questions, responseItems) : [];

  const retry = (): void => {
    void refetchForm();
    void refetchResponses();
  };

  return {
    errorMessage,
    formTitle: form?.title ?? null,
    isEmpty:
      !showLoading && !hasError && Boolean(form) && responseItems.length === 0,
    isLoading: showLoading,
    isNotFound: !showLoading && !hasError && (!id || formData?.form === null),
    responseCountLabel: formatResponseCount(responseItems.length),
    responses,
    retry,
  };
};
