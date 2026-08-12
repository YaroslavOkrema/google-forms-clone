import {
  QuestionType,
  type FormQuery,
  type ResponsesQuery,
} from '@google-forms/shared';

import type {
  FormResponseCardData,
  ResponseAnswerView,
} from '../../components/FormResponseCard/types';

type ResponsesForm = NonNullable<FormQuery['form']>;
type FormQuestion = ResponsesForm['questions'][number];
type FormResponse = ResponsesQuery['responses'][number];

const UNKNOWN_QUESTION_TITLE = 'Question unavailable';
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
});

const formatDateValue = (value: string): string => {
  const match = ISO_DATE_PATTERN.exec(value);

  if (!match) {
    return value;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return value;
  }

  return dateFormatter.format(date);
};

const prepareAnswer = (
  answer: FormResponse['answers'][number],
  questionById: ReadonlyMap<string, FormQuestion>,
): ResponseAnswerView => {
  const question = questionById.get(answer.questionId);
  const displayValues =
    question?.type === QuestionType.Date
      ? answer.values.map(formatDateValue)
      : [...answer.values];

  return {
    displayValues,
    isMultipleValue:
      question?.type === QuestionType.Checkbox || displayValues.length > 1,
    questionId: answer.questionId,
    questionTitle: question?.title ?? UNKNOWN_QUESTION_TITLE,
  };
};

export const formatResponseCount = (count: number): string =>
  `${count} ${count === 1 ? 'response' : 'responses'}`;

export const prepareResponses = (
  questions: ResponsesForm['questions'],
  responses: ResponsesQuery['responses'],
): FormResponseCardData[] => {
  const questionById = new Map(
    questions.map((question) => [question.id, question] as const),
  );

  return responses.map((response, responseIndex) => ({
    answers: response.answers.map((answer) =>
      prepareAnswer(answer, questionById),
    ),
    id: response.id,
    label: `Response ${responseIndex + 1}`,
  }));
};
