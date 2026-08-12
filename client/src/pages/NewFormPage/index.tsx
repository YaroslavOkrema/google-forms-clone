import { Link } from 'react-router-dom';

import { FormQuestionEditor } from 'src/components/FormQuestionEditor';
import { ROUTE_PATHS } from 'src/navigation/paths';
import { useNewFormPage } from 'src/pages/NewFormPage/useNewFormPage';

export function NewFormPage() {
  const {
    description,
    errors,
    handleAddOption,
    handleAddQuestion,
    handleDescriptionChange,
    handleOptionChange,
    handleOptionRemove,
    handleQuestionRemove,
    handleQuestionTitleChange,
    handleQuestionTypeChange,
    handleSubmit,
    handleTitleChange,
    hasValidationErrors,
    isSaving,
    questions,
    saveErrorMessage,
    title,
  } = useNewFormPage();

  return (
    <main className="builder-page">
      <form className="builder-form" noValidate onSubmit={handleSubmit}>
        <header className="builder-header">
          <div>
            <p className="home-eyebrow">Google Forms Lite</p>
            <h1>Create a new form</h1>
            <p>Build your questions, then save the form for others to fill.</p>
          </div>
          <Link
            className="home-button home-button-text builder-back-link"
            to={ROUTE_PATHS.home}
          >
            Back to forms
          </Link>
        </header>

        <section
          aria-labelledby="form-details-heading"
          className="builder-card"
        >
          <div className="builder-section-heading">
            <div>
              <p className="builder-step">Form details</p>
              <h2 id="form-details-heading">Name your form</h2>
            </div>
            <span className="builder-required-note">* Required</span>
          </div>

          <div className="builder-field">
            <label htmlFor="form-title">Form title *</label>
            <input
              aria-describedby={errors?.title ? 'form-title-error' : undefined}
              aria-invalid={Boolean(errors?.title)}
              className="builder-input"
              disabled={isSaving}
              id="form-title"
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Untitled form"
              type="text"
              value={title}
            />
            {errors?.title && (
              <p className="builder-field-error" id="form-title-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="builder-field">
            <label htmlFor="form-description">Description</label>
            <textarea
              className="builder-input builder-textarea"
              disabled={isSaving}
              id="form-description"
              onChange={(event) => handleDescriptionChange(event.target.value)}
              placeholder="Tell people what this form is about"
              rows={4}
              value={description}
            />
          </div>
        </section>

        <section
          aria-labelledby="questions-heading"
          className="builder-questions-section"
        >
          <div className="builder-questions-header">
            <div>
              <p className="builder-step">Questions</p>
              <h2 id="questions-heading">Build your form</h2>
            </div>
            <span className="builder-question-count">
              {questions.length}{' '}
              {questions.length === 1 ? 'question' : 'questions'}
            </span>
          </div>

          {questions.length === 0 && (
            <div className="builder-empty-state">
              <h3>No questions yet</h3>
              <p>You can save an empty form or add your first question.</p>
            </div>
          )}

          <div className="builder-question-list">
            {questions.map((question, index) => (
              <FormQuestionEditor
                disabled={isSaving}
                errors={errors?.questions[question.id]}
                index={index}
                key={question.id}
                onAddOption={handleAddOption}
                onOptionChange={handleOptionChange}
                onOptionRemove={handleOptionRemove}
                onRemove={handleQuestionRemove}
                onTitleChange={handleQuestionTitleChange}
                onTypeChange={handleQuestionTypeChange}
                question={question}
              />
            ))}
          </div>

          <button
            className="home-button home-button-secondary builder-add-question"
            disabled={isSaving}
            onClick={handleAddQuestion}
            type="button"
          >
            <span aria-hidden="true">+</span>
            Add question
          </button>
        </section>

        {hasValidationErrors && (
          <div
            className="builder-message builder-message-validation"
            role="alert"
          >
            <strong>Check the highlighted fields.</strong>
            <span>Your form has not been saved yet.</span>
          </div>
        )}

        {saveErrorMessage && (
          <div className="builder-message builder-message-error" role="alert">
            <strong>Form could not be saved.</strong>
            <span>{saveErrorMessage}</span>
          </div>
        )}

        <footer className="builder-actions">
          <p>Your draft stays here until the form is successfully saved.</p>
          <button
            className="home-button home-button-primary builder-save-button"
            disabled={isSaving}
            type="submit"
          >
            {isSaving && (
              <span aria-hidden="true" className="builder-button-spinner" />
            )}
            {isSaving ? 'Saving…' : 'Save form'}
          </button>
        </footer>
      </form>
    </main>
  );
}
