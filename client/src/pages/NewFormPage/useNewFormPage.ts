import { useState } from 'react';
import type { FormEventHandler } from 'react';
import type { QuestionType } from '@google-forms/shared';
import { useNavigate } from 'react-router-dom';

import { useCreateFormMutation } from 'src/api/formsApi';
import { ROUTE_PATHS } from 'src/navigation/paths';
import {
  builderReset,
  descriptionChanged,
  optionAdded,
  optionRemoved,
  optionValueChanged,
  questionAdded,
  questionRemoved,
  questionTitleChanged,
  questionTypeChanged,
  titleChanged,
} from 'src/stores/formBuilderSlice';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';
import { SAVE_ERROR_FALLBACK } from 'src/pages/NewFormPage/constants';
import {
  prepareCreateFormVariables,
  validateFormBuilder,
} from 'src/pages/NewFormPage/helpers';
import type { UseNewFormPageResult } from 'src/pages/NewFormPage/types';
import { getApiErrorMessage } from 'src/utils/apiErrors';

export const useNewFormPage = (): UseNewFormPageResult => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const builder = useAppSelector((state) => state.formBuilder);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);
  const [createForm, { error, isLoading: isSaving, reset: resetMutation }] =
    useCreateFormMutation();
  const validation = validateFormBuilder(builder);

  const handleTitleChange = (title: string): void => {
    dispatch(titleChanged(title));
  };

  const handleDescriptionChange = (description: string): void => {
    dispatch(descriptionChanged(description));
  };

  const handleAddQuestion = (): void => {
    dispatch(questionAdded());
  };

  const handleQuestionRemove = (questionId: string): void => {
    dispatch(questionRemoved(questionId));
  };

  const handleQuestionTitleChange = (
    questionId: string,
    title: string,
  ): void => {
    dispatch(questionTitleChanged({ questionId, title }));
  };

  const handleQuestionTypeChange = (
    questionId: string,
    type: QuestionType,
  ): void => {
    dispatch(questionTypeChanged(questionId, type));
  };

  const handleAddOption = (questionId: string): void => {
    dispatch(optionAdded(questionId));
  };

  const handleOptionChange = (
    questionId: string,
    optionId: string,
    value: string,
  ): void => {
    dispatch(optionValueChanged({ optionId, questionId, value }));
  };

  const handleOptionRemove = (questionId: string, optionId: string): void => {
    dispatch(optionRemoved({ optionId, questionId }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setHasAttemptedSave(true);
    resetMutation();

    if (!validation.isValid) {
      return;
    }

    const result = await createForm(prepareCreateFormVariables(builder));

    if ('data' in result) {
      dispatch(builderReset());
      navigate(ROUTE_PATHS.home, { replace: true });
    }
  };

  return {
    description: builder.description,
    errors: hasAttemptedSave ? validation.errors : null,
    handleAddOption,
    handleAddQuestion,
    handleDescriptionChange,
    handleOptionChange,
    handleOptionRemove,
    handleQuestionRemove,
    handleQuestionTitleChange,
    handleQuestionTypeChange,
    handleSubmit,
    handleTitleChange,
    hasValidationErrors: hasAttemptedSave && !validation.isValid,
    isSaving,
    questions: builder.questions,
    saveErrorMessage: getApiErrorMessage(error, SAVE_ERROR_FALLBACK),
    title: builder.title,
  };
};
