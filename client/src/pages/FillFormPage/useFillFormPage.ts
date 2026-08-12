import { useRef, useState } from 'react';
import type { FormEventHandler } from 'react';
import { useParams } from 'react-router-dom';

import { useFormQuery, useSubmitResponseMutation } from '../../api/formsApi';
import { getApiErrorMessage } from '../../utils/apiErrors';
import { prepareAnswerInputs } from './helpers';
import type { AnswersState, UseFillFormPageResult } from './types';

const LOAD_ERROR_FALLBACK = 'Unable to load this form. Please try again.';
const SUBMIT_ERROR_FALLBACK =
  'Unable to submit your response. Please try again.';

export const useFillFormPage = (): UseFillFormPageResult => {
  const { id } = useParams<{ id: string }>();
  const formId = id ?? '';
  const [answers, setAnswers] = useState<AnswersState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitInProgress = useRef(false);
  const {
    data,
    error: loadError,
    isError: hasLoadError,
    isFetching,
    isLoading,
    refetch,
  } = useFormQuery({ id: formId }, { skip: !id });
  const [
    submitResponse,
    { error: submitError, isLoading: isSubmitting, reset: resetSubmission },
  ] = useSubmitResponseMutation();
  const form = data?.form ?? null;
  const showLoading = isLoading || (isFetching && !data);

  const clearSubmissionError = (): void => {
    if (submitError) {
      resetSubmission();
    }
  };

  const handleSingleAnswerChange = (
    questionId: string,
    value: string,
  ): void => {
    clearSubmissionError();
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: [value],
    }));
  };

  const handleCheckboxAnswerChange = (
    questionId: string,
    option: string,
    checked: boolean,
  ): void => {
    clearSubmissionError();
    setAnswers((currentAnswers) => {
      const currentValues = currentAnswers[questionId] ?? [];
      let nextValues: string[];

      if (checked) {
        nextValues = currentValues.includes(option)
          ? currentValues
          : [...currentValues, option];
      } else {
        nextValues = currentValues.filter((value) => value !== option);
      }

      return {
        ...currentAnswers,
        [questionId]: nextValues,
      };
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!form || !id || submitInProgress.current) {
      return;
    }

    submitInProgress.current = true;
    resetSubmission();
    const result = await submitResponse({
      answers: prepareAnswerInputs(form.questions, answers),
      formId: id,
    });

    if ('data' in result) {
      setIsSubmitted(true);
      return;
    }

    submitInProgress.current = false;
  };

  const retry = (): void => {
    void refetch();
  };

  return {
    answers,
    form,
    handleCheckboxAnswerChange,
    handleSingleAnswerChange,
    handleSubmit,
    isLoading: showLoading,
    isNotFound: !showLoading && !hasLoadError && (!id || data?.form === null),
    isSubmitted,
    isSubmitting,
    loadErrorMessage: hasLoadError
      ? getApiErrorMessage(loadError, LOAD_ERROR_FALLBACK)
      : null,
    retry,
    submitErrorMessage: getApiErrorMessage(submitError, SUBMIT_ERROR_FALLBACK),
  };
};
