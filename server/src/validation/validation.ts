import {
  QuestionType,
  type AnswerInput,
  type Form,
  type QuestionInput,
} from '@google-forms/shared';
import { GraphQLError } from 'graphql';

const BAD_USER_INPUT = 'BAD_USER_INPUT';

const throwBadUserInput = (message: string): never => {
  throw new GraphQLError(message, {
    extensions: { code: BAD_USER_INPUT },
  });
};

const validateChoiceOptions = (
  options: readonly string[],
  questionIndex: number,
): void => {
  if (options.length === 0) {
    throwBadUserInput(
      `Question at index ${questionIndex} must define at least one option.`,
    );
  }

  const uniqueOptions = new Set<string>();

  for (const option of options) {
    if (option.trim().length === 0) {
      throwBadUserInput(
        `Question at index ${questionIndex} contains an empty option.`,
      );
    }

    if (uniqueOptions.has(option)) {
      throwBadUserInput(
        `Question at index ${questionIndex} contains duplicate option "${option}".`,
      );
    }

    uniqueOptions.add(option);
  }
};

export const validateQuestions = (
  questions: readonly QuestionInput[],
): void => {
  questions.forEach((question, questionIndex) => {
    const options = question.options ?? [];

    switch (question.type) {
      case QuestionType.Text:
      case QuestionType.Date:
        if (options.length > 0) {
          throwBadUserInput(
            `Question at index ${questionIndex} of type ${question.type} must not define options.`,
          );
        }
        break;
      case QuestionType.MultipleChoice:
      case QuestionType.Checkbox:
        validateChoiceOptions(options, questionIndex);
        break;
    }
  });
};

const validateAnswerValues = (
  answer: AnswerInput,
  question: Form['questions'][number],
): void => {
  switch (question.type) {
    case QuestionType.Text:
    case QuestionType.Date:
    case QuestionType.MultipleChoice:
      if (answer.values.length !== 1) {
        throwBadUserInput(
          `Question "${question.id}" of type ${question.type} requires exactly one value.`,
        );
      }
      break;
    case QuestionType.Checkbox:
      if (answer.values.length === 0) {
        throwBadUserInput(
          `Question "${question.id}" of type ${question.type} requires at least one value.`,
        );
      }
      break;
  }

  if (
    question.type !== QuestionType.MultipleChoice &&
    question.type !== QuestionType.Checkbox
  ) {
    return;
  }

  const options = new Set(question.options);

  for (const value of answer.values) {
    if (!options.has(value)) {
      throwBadUserInput(
        `Value "${value}" is not a valid option for question "${question.id}".`,
      );
    }
  }
};

export const validateAnswers = (
  form: Form,
  answers: readonly AnswerInput[],
): void => {
  const questionsById = new Map(
    form.questions.map((question) => [question.id, question]),
  );
  const answeredQuestionIds = new Set<string>();

  for (const answer of answers) {
    if (answeredQuestionIds.has(answer.questionId)) {
      throwBadUserInput(
        `Question "${answer.questionId}" has more than one answer.`,
      );
    }

    const question = questionsById.get(answer.questionId);

    if (!question) {
      return throwBadUserInput(
        `Question "${answer.questionId}" does not belong to form "${form.id}".`,
      );
    }

    validateAnswerValues(answer, question);
    answeredQuestionIds.add(answer.questionId);
  }
};
