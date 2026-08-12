import { QuestionType } from '@google-forms/shared';

export const QUESTION_TYPE_OPTIONS = [
  { label: 'Text', value: QuestionType.Text },
  { label: 'Multiple choice', value: QuestionType.MultipleChoice },
  { label: 'Checkboxes', value: QuestionType.Checkbox },
  { label: 'Date', value: QuestionType.Date },
] as const;
