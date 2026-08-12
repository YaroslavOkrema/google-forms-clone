import type { FormEventHandler } from 'react';
import type { FormQuery } from '@google-forms/shared';

export type FillForm = NonNullable<FormQuery['form']>;

export type AnswersState = Record<string, string[]>;

export interface UseFillFormPageResult {
  answers: AnswersState;
  form: FillForm | null;
  handleCheckboxAnswerChange: (
    questionId: string,
    option: string,
    checked: boolean,
  ) => void;
  handleSingleAnswerChange: (questionId: string, value: string) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isNotFound: boolean;
  isSubmitted: boolean;
  isSubmitting: boolean;
  loadErrorMessage: string | null;
  retry: () => void;
  submitErrorMessage: string | null;
}
