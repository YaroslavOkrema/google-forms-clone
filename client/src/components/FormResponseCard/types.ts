import type { ResponsesQuery } from '@google-forms/shared';

type ResponseAnswer = ResponsesQuery['responses'][number]['answers'][number];
type ResponseId = ResponsesQuery['responses'][number]['id'];

export interface ResponseAnswerView {
  displayValues: string[];
  isMultipleValue: boolean;
  questionId: ResponseAnswer['questionId'];
  questionTitle: string;
}

export interface FormResponseCardData {
  answers: ResponseAnswerView[];
  id: ResponseId;
  label: string;
}

export interface FormResponseCardProps {
  response: FormResponseCardData;
}
