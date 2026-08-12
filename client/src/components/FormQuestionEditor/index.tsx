import type { QuestionType } from '@google-forms/shared';

import { QUESTION_TYPE_OPTIONS } from 'src/components/FormQuestionEditor/constants';
import type { FormQuestionEditorProps } from 'src/components/FormQuestionEditor/types';
import { QuestionOptionRow } from 'src/components/QuestionOptionRow';
import { isChoiceQuestionType } from 'src/utils/questionTypes';

export function FormQuestionEditor({
  disabled,
  errors,
  index,
  onAddOption,
  onOptionChange,
  onOptionRemove,
  onRemove,
  onTitleChange,
  onTypeChange,
  question,
}: FormQuestionEditorProps) {
  const titleId = `question-${question.id}-title`;
  const titleErrorId = `${titleId}-error`;
  const optionsErrorId = `question-${question.id}-options-error`;

  return (
    <article className="builder-question-card">
      <div className="builder-question-heading">
        <p>Question {index + 1}</p>
        <button
          aria-label={`Delete question ${index + 1}`}
          className="home-button home-button-text builder-delete-button"
          disabled={disabled}
          onClick={() => onRemove(question.id)}
          type="button"
        >
          Delete
        </button>
      </div>

      <div className="builder-question-fields">
        <div className="builder-field builder-question-title-field">
          <label htmlFor={titleId}>Question title</label>
          <input
            aria-describedby={errors?.title ? titleErrorId : undefined}
            aria-invalid={Boolean(errors?.title)}
            className="builder-input"
            disabled={disabled}
            id={titleId}
            onChange={(event) => onTitleChange(question.id, event.target.value)}
            placeholder="Enter a question"
            type="text"
            value={question.title}
          />
          {errors?.title && (
            <p className="builder-field-error" id={titleErrorId}>
              {errors.title}
            </p>
          )}
        </div>

        <div className="builder-field builder-question-type-field">
          <label htmlFor={`question-${question.id}-type`}>Question type</label>
          <select
            className="builder-input builder-select"
            disabled={disabled}
            id={`question-${question.id}-type`}
            onChange={(event) =>
              onTypeChange(question.id, event.target.value as QuestionType)
            }
            value={question.type}
          >
            {QUESTION_TYPE_OPTIONS.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isChoiceQuestionType(question.type) && (
        <div className="builder-options">
          <div className="builder-options-heading">
            <h3>Options</h3>
            <button
              className="home-button home-button-secondary builder-small-button"
              disabled={disabled}
              onClick={() => onAddOption(question.id)}
              type="button"
            >
              Add option
            </button>
          </div>

          {errors?.optionList && (
            <p
              className="builder-field-error builder-option-list-error"
              id={optionsErrorId}
            >
              {errors.optionList}
            </p>
          )}

          {question.options.length > 0 && (
            <ul
              aria-describedby={errors?.optionList ? optionsErrorId : undefined}
              className="builder-options-list"
            >
              {question.options.map((option, optionIndex) => (
                <QuestionOptionRow
                  disabled={disabled}
                  error={errors?.options[option.id]}
                  index={optionIndex}
                  key={option.id}
                  onChange={(value) =>
                    onOptionChange(question.id, option.id, value)
                  }
                  onRemove={() => onOptionRemove(question.id, option.id)}
                  optionId={option.id}
                  questionIndex={index}
                  value={option.value}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
