import type { FormQuery } from '@google-forms/shared';

type FormQuestion = NonNullable<FormQuery['form']>['questions'][number];

export interface FormQuestionFieldProps {
  disabled: boolean;
  index: number;
  onCheckboxAnswerChange: (
    questionId: string,
    option: string,
    checked: boolean,
  ) => void;
  onSingleAnswerChange: (questionId: string, value: string) => void;
  question: FormQuestion;
  values: string[];
}
