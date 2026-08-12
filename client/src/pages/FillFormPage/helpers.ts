import { QuestionType, type AnswerInput } from '@google-forms/shared';

import type { AnswersState, FillForm } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string | null => {
  if (!error) {
    return null;
  }

  if (isRecord(error) && typeof error.message === 'string') {
    return error.message;
  }

  return fallback;
};

export const prepareAnswerInputs = (
  questions: FillForm['questions'],
  answers: AnswersState,
): AnswerInput[] => {
  const answerInputs: AnswerInput[] = [];

  for (const question of questions) {
    const values = answers[question.id] ?? [];

    switch (question.type) {
      case QuestionType.Text: {
        const value = values[0];

        if (value?.trim()) {
          answerInputs.push({ questionId: question.id, values: [value] });
        }
        break;
      }
      case QuestionType.Date: {
        const value = values[0];

        if (value) {
          answerInputs.push({ questionId: question.id, values: [value] });
        }
        break;
      }
      case QuestionType.MultipleChoice: {
        const value = values[0];

        if (value && question.options.includes(value)) {
          answerInputs.push({ questionId: question.id, values: [value] });
        }
        break;
      }
      case QuestionType.Checkbox: {
        const selectedValues = question.options.filter((option) =>
          values.includes(option),
        );

        if (selectedValues.length > 0) {
          answerInputs.push({
            questionId: question.id,
            values: selectedValues,
          });
        }
        break;
      }
    }
  }

  return answerInputs;
};
