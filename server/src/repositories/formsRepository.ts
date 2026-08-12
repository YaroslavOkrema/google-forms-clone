import { randomUUID } from 'node:crypto';

import type {
  Form,
  MutationCreateFormArgs,
  MutationSubmitResponseArgs,
  Response,
} from '@google-forms/shared';

export interface FormsRepository {
  createForm(args: MutationCreateFormArgs): Form;
  createResponse(args: MutationSubmitResponseArgs): Response;
  getForm(id: string): Form | undefined;
  getForms(): Form[];
  getResponses(formId: string): Response[];
}

export class InMemoryFormsRepository implements FormsRepository {
  private readonly formsById = new Map<string, Form>();
  private readonly responsesByFormId = new Map<string, Response[]>();

  getForms(): Form[] {
    return [...this.formsById.values()];
  }

  getForm(id: string): Form | undefined {
    return this.formsById.get(id);
  }

  getResponses(formId: string): Response[] {
    return [...(this.responsesByFormId.get(formId) ?? [])];
  }

  createForm(args: MutationCreateFormArgs): Form {
    const form: Form = {
      id: randomUUID(),
      title: args.title,
      description: args.description ?? null,
      questions: args.questions.map((question) => ({
        id: randomUUID(),
        title: question.title,
        type: question.type,
        options: [...(question.options ?? [])],
      })),
    };

    this.formsById.set(form.id, form);

    return form;
  }

  createResponse(args: MutationSubmitResponseArgs): Response {
    const response: Response = {
      id: randomUUID(),
      formId: args.formId,
      answers: args.answers.map((answer) => ({
        questionId: answer.questionId,
        values: [...answer.values],
      })),
    };
    const responses = this.responsesByFormId.get(args.formId);

    if (responses) {
      responses.push(response);
    } else {
      this.responsesByFormId.set(args.formId, [response]);
    }

    return response;
  }
}
