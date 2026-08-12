import { Link } from 'react-router-dom';

import { FormQuestionField } from 'src/components/FormQuestionField';
import { ROUTE_PATHS } from 'src/navigation/paths';
import { useFillFormPage } from 'src/pages/FillFormPage/useFillFormPage';

export function FillFormPage() {
  const {
    answers,
    form,
    handleCheckboxAnswerChange,
    handleSingleAnswerChange,
    handleSubmit,
    isLoading,
    isNotFound,
    isSubmitted,
    isSubmitting,
    loadErrorMessage,
    retry,
    submitErrorMessage,
  } = useFillFormPage();

  if (isLoading) {
    return (
      <main className="fill-page fill-state-page">
        <section aria-live="polite" className="fill-state-card" role="status">
          <span aria-hidden="true" className="loading-indicator" />
          <h1>Loading form</h1>
          <p>Please wait while the form is being retrieved.</p>
        </section>
      </main>
    );
  }

  if (loadErrorMessage) {
    return (
      <main className="fill-page fill-state-page">
        <section className="fill-state-card fill-state-card-error" role="alert">
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>Form could not be loaded</h1>
          <p>{loadErrorMessage}</p>
          <div className="fill-state-actions">
            <button
              className="home-button home-button-primary"
              onClick={retry}
              type="button"
            >
              Try Again
            </button>
            <Link
              className="home-button home-button-text"
              to={ROUTE_PATHS.home}
            >
              Back to forms
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (isNotFound || !form) {
    return (
      <main className="fill-page fill-state-page">
        <section className="fill-state-card">
          <p className="home-eyebrow">Google Forms Lite</p>
          <h1>Form not found</h1>
          <p>The form may have been removed, or the link may be incorrect.</p>
          <div className="fill-state-actions">
            <Link
              className="home-button home-button-primary"
              to={ROUTE_PATHS.home}
            >
              Back to forms
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (isSubmitted) {
    return (
      <main className="fill-page fill-state-page">
        <section
          aria-live="polite"
          className="fill-state-card fill-state-card-success"
          role="status"
        >
          <span aria-hidden="true" className="fill-success-icon">
            ✓
          </span>
          <p className="home-eyebrow">Response received</p>
          <h1>Form submitted</h1>
          <p>
            Your response to <strong>{form.title}</strong> was submitted
            successfully.
          </p>
          <div className="fill-state-actions">
            <Link
              className="home-button home-button-primary"
              to={ROUTE_PATHS.home}
            >
              Back to forms
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="fill-page">
      <form className="fill-form" noValidate onSubmit={handleSubmit}>
        <header className="fill-header">
          <div>
            <p className="home-eyebrow">Google Forms Lite</p>
            <h1>{form.title}</h1>
            {form.description?.trim() && (
              <p className="fill-description">{form.description}</p>
            )}
          </div>
          <Link
            className="home-button home-button-text fill-back-link"
            to={ROUTE_PATHS.home}
          >
            Back to forms
          </Link>
        </header>

        <section
          aria-labelledby="fill-questions-heading"
          className="fill-questions"
        >
          <div className="fill-questions-heading">
            <div>
              <p className="builder-step">Questions</p>
              <h2 id="fill-questions-heading">Your response</h2>
            </div>
            <span className="builder-question-count">
              {form.questions.length}{' '}
              {form.questions.length === 1 ? 'question' : 'questions'}
            </span>
          </div>

          {form.questions.length === 0 && (
            <div className="fill-empty-state">
              <h3>This form has no questions</h3>
              <p>You can still submit an empty response.</p>
            </div>
          )}

          <div className="fill-question-list">
            {form.questions.map((question, index) => (
              <FormQuestionField
                disabled={isSubmitting}
                index={index}
                key={question.id}
                onCheckboxAnswerChange={handleCheckboxAnswerChange}
                onSingleAnswerChange={handleSingleAnswerChange}
                question={question}
                values={answers[question.id] ?? []}
              />
            ))}
          </div>
        </section>

        {submitErrorMessage && (
          <div className="builder-message builder-message-error" role="alert">
            <strong>Response could not be submitted.</strong>
            <span>{submitErrorMessage}</span>
          </div>
        )}

        <footer className="builder-actions fill-actions">
          <p>Unanswered questions will not be included in your response.</p>
          <button
            className="home-button home-button-primary fill-submit-button"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && (
              <span aria-hidden="true" className="builder-button-spinner" />
            )}
            {isSubmitting ? 'Submitting…' : 'Submit response'}
          </button>
        </footer>
      </form>
    </main>
  );
}
