import { QuestionType } from '@google-forms/shared';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type {
  BuilderOption,
  BuilderQuestion,
  FormBuilderState,
} from 'src/types/formBuilder';
import { isChoiceQuestionType } from 'src/utils/questionTypes';

const createBuilderQuestion = (): BuilderQuestion => ({
  id: nanoid(),
  options: [],
  title: '',
  type: QuestionType.Text,
});

const createInitialState = (): FormBuilderState => ({
  description: '',
  questions: [createBuilderQuestion()],
  title: '',
});

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState: createInitialState(),
  reducers: {
    builderReset: {
      reducer: (
        _state,
        { payload }: PayloadAction<FormBuilderState>,
      ): FormBuilderState => payload,
      prepare: () => ({ payload: createInitialState() }),
    },
    descriptionChanged: (state, { payload }: PayloadAction<string>) => {
      state.description = payload;
    },
    optionAdded: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ option: BuilderOption; questionId: string }>,
      ) => {
        const question = state.questions.find(
          ({ id }) => id === payload.questionId,
        );

        if (question && isChoiceQuestionType(question.type)) {
          question.options.push(payload.option);
        }
      },
      prepare: (questionId: string) => ({
        payload: {
          option: { id: nanoid(), value: '' },
          questionId,
        },
      }),
    },
    optionRemoved: (
      state,
      { payload }: PayloadAction<{ optionId: string; questionId: string }>,
    ) => {
      const question = state.questions.find(
        ({ id }) => id === payload.questionId,
      );

      if (question) {
        question.options = question.options.filter(
          ({ id }) => id !== payload.optionId,
        );
      }
    },
    optionValueChanged: (
      state,
      {
        payload,
      }: PayloadAction<{
        optionId: string;
        questionId: string;
        value: string;
      }>,
    ) => {
      const question = state.questions.find(
        ({ id }) => id === payload.questionId,
      );
      const option = question?.options.find(
        ({ id }) => id === payload.optionId,
      );

      if (option) {
        option.value = payload.value;
      }
    },
    questionAdded: {
      reducer: (state, { payload }: PayloadAction<BuilderQuestion>) => {
        state.questions.push(payload);
      },
      prepare: () => ({ payload: createBuilderQuestion() }),
    },
    questionRemoved: (state, { payload }: PayloadAction<string>) => {
      state.questions = state.questions.filter(({ id }) => id !== payload);
    },
    questionTitleChanged: (
      state,
      { payload }: PayloadAction<{ questionId: string; title: string }>,
    ) => {
      const question = state.questions.find(
        ({ id }) => id === payload.questionId,
      );

      if (question) {
        question.title = payload.title;
      }
    },
    questionTypeChanged: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          initialOption: BuilderOption;
          questionId: string;
          type: QuestionType;
        }>,
      ) => {
        const question = state.questions.find(
          ({ id }) => id === payload.questionId,
        );

        if (!question) {
          return;
        }

        const wasChoiceQuestion = isChoiceQuestionType(question.type);
        const isChoiceQuestion = isChoiceQuestionType(payload.type);

        question.type = payload.type;

        if (!isChoiceQuestion) {
          question.options = [];
        } else if (!wasChoiceQuestion) {
          question.options = [payload.initialOption];
        }
      },
      prepare: (questionId: string, type: QuestionType) => ({
        payload: {
          initialOption: { id: nanoid(), value: '' },
          questionId,
          type,
        },
      }),
    },
    titleChanged: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
  },
});

export const {
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
} = formBuilderSlice.actions;

export const formBuilderReducer = formBuilderSlice.reducer;
