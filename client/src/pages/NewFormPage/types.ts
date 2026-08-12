import type { FormEventHandler } from 'react';
import type { QuestionType } from '@google-forms/shared';

import type {
  BuilderQuestion,
  FormBuilderValidationErrors,
} from 'src/types/formBuilder';

export interface UseNewFormPageResult {
  description: string;
  errors: FormBuilderValidationErrors | null;
  handleAddOption: (questionId: string) => void;
  handleAddQuestion: () => void;
  handleDescriptionChange: (description: string) => void;
  handleOptionChange: (
    questionId: string,
    optionId: string,
    value: string,
  ) => void;
  handleOptionRemove: (questionId: string, optionId: string) => void;
  handleQuestionRemove: (questionId: string) => void;
  handleQuestionTitleChange: (questionId: string, title: string) => void;
  handleQuestionTypeChange: (questionId: string, type: QuestionType) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleTitleChange: (title: string) => void;
  hasValidationErrors: boolean;
  isSaving: boolean;
  questions: BuilderQuestion[];
  saveErrorMessage: string | null;
  title: string;
}
