import {
  type CreateFormMutationVariables,
  type QuestionInput,
} from '@google-forms/shared';

import type {
  BuilderQuestionValidationErrors,
  FormBuilderState,
  FormBuilderValidationResult,
} from '../../types/formBuilder';
import { isChoiceQuestionType } from '../../utils/questionTypes';

const REQUIRED_FORM_TITLE = 'Form title is required.';
const REQUIRED_QUESTION_TITLE = 'Question title is required.';
const REQUIRED_OPTION = 'Option text is required.';
const REQUIRED_OPTION_LIST = 'Add at least one option.';
const DUPLICATE_OPTION = 'Options must be unique.';
const UNSUPPORTED_OPTIONS = 'This question type cannot have options.';
const SAVE_ERROR_FALLBACK = 'The form could not be saved. Please try again.';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getSaveErrorMessage = (error: unknown): string | null => {
  if (!error) {
    return null;
  }

  if (isRecord(error) && typeof error.message === 'string') {
    return error.message;
  }

  return SAVE_ERROR_FALLBACK;
};

export const validateFormBuilder = (
  state: FormBuilderState,
): FormBuilderValidationResult => {
  const errors: FormBuilderValidationResult['errors'] = { questions: {} };
  let isValid = true;

  if (state.title.trim().length === 0) {
    errors.title = REQUIRED_FORM_TITLE;
    isValid = false;
  }

  for (const question of state.questions) {
    const questionErrors: BuilderQuestionValidationErrors = { options: {} };

    if (question.title.trim().length === 0) {
      questionErrors.title = REQUIRED_QUESTION_TITLE;
      isValid = false;
    }

    if (isChoiceQuestionType(question.type)) {
      if (question.options.length === 0) {
        questionErrors.optionList = REQUIRED_OPTION_LIST;
        isValid = false;
      }

      const optionValues = new Set<string>();

      for (const option of question.options) {
        const value = option.value.trim();

        if (value.length === 0) {
          questionErrors.options[option.id] = REQUIRED_OPTION;
          isValid = false;
          continue;
        }

        if (optionValues.has(value)) {
          questionErrors.options[option.id] = DUPLICATE_OPTION;
          isValid = false;
        }

        optionValues.add(value);
      }
    } else if (question.options.length > 0) {
      questionErrors.optionList = UNSUPPORTED_OPTIONS;
      isValid = false;
    }

    if (
      questionErrors.title ||
      questionErrors.optionList ||
      Object.keys(questionErrors.options).length > 0
    ) {
      errors.questions[question.id] = questionErrors;
    }
  }

  return { errors, isValid };
};

export const prepareCreateFormVariables = (
  state: FormBuilderState,
): CreateFormMutationVariables => {
  const questions: QuestionInput[] = state.questions.map((question) => ({
    options: isChoiceQuestionType(question.type)
      ? question.options.map(({ value }) => value.trim())
      : [],
    title: question.title.trim(),
    type: question.type,
  }));
  const description = state.description.trim();

  return {
    description: description || null,
    questions,
    title: state.title.trim(),
  };
};
