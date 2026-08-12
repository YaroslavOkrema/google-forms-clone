import { QuestionType } from '@google-forms/shared';

import type { FormQuestionFieldProps } from 'src/components/FormQuestionField/types';

export function FormQuestionField({
  disabled,
  index,
  onCheckboxAnswerChange,
  onSingleAnswerChange,
  question,
  values,
}: FormQuestionFieldProps) {
  const inputId = `fill-question-${question.id}`;

  switch (question.type) {
    case QuestionType.Text:
      return (
        <fieldset className="fill-question-card" disabled={disabled}>
          <legend>
            <span className="fill-question-number">Question {index + 1}</span>
            <span className="fill-question-title">{question.title}</span>
          </legend>
          <label className="fill-answer-label" htmlFor={inputId}>
            Your answer
          </label>
          <input
            className="builder-input"
            id={inputId}
            onChange={(event) =>
              onSingleAnswerChange(question.id, event.target.value)
            }
            placeholder="Type your answer"
            type="text"
            value={values[0] ?? ''}
          />
        </fieldset>
      );
    case QuestionType.MultipleChoice:
      return (
        <fieldset className="fill-question-card" disabled={disabled}>
          <legend>
            <span className="fill-question-number">Question {index + 1}</span>
            <span className="fill-question-title">{question.title}</span>
          </legend>
          <div className="fill-choice-list">
            {question.options.map((option, optionIndex) => {
              const optionId = `${inputId}-option-${optionIndex}`;

              return (
                <label className="fill-choice" htmlFor={optionId} key={option}>
                  <input
                    checked={values[0] === option}
                    id={optionId}
                    name={inputId}
                    onChange={() => onSingleAnswerChange(question.id, option)}
                    type="radio"
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    case QuestionType.Checkbox:
      return (
        <fieldset className="fill-question-card" disabled={disabled}>
          <legend>
            <span className="fill-question-number">Question {index + 1}</span>
            <span className="fill-question-title">{question.title}</span>
          </legend>
          <div className="fill-choice-list">
            {question.options.map((option, optionIndex) => {
              const optionId = `${inputId}-option-${optionIndex}`;

              return (
                <label className="fill-choice" htmlFor={optionId} key={option}>
                  <input
                    checked={values.includes(option)}
                    id={optionId}
                    onChange={(event) =>
                      onCheckboxAnswerChange(
                        question.id,
                        option,
                        event.target.checked,
                      )
                    }
                    type="checkbox"
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    case QuestionType.Date:
      return (
        <fieldset className="fill-question-card" disabled={disabled}>
          <legend>
            <span className="fill-question-number">Question {index + 1}</span>
            <span className="fill-question-title">{question.title}</span>
          </legend>
          <label className="fill-answer-label" htmlFor={inputId}>
            Select a date
          </label>
          <input
            className="builder-input fill-date-input"
            id={inputId}
            onChange={(event) =>
              onSingleAnswerChange(question.id, event.target.value)
            }
            type="date"
            value={values[0] ?? ''}
          />
        </fieldset>
      );
  }
}
