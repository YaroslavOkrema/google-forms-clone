import { QuestionType } from '@google-forms/shared';

export const isChoiceQuestionType = (type: QuestionType): boolean =>
  type === QuestionType.MultipleChoice || type === QuestionType.Checkbox;
