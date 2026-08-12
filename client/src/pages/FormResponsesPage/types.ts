import type { FormQuery } from '@google-forms/shared';

import type { FormResponseCardData } from 'src/components/FormResponseCard/types';

type ResponsesForm = NonNullable<FormQuery['form']>;

export interface UseFormResponsesPageResult {
  errorMessage: string | null;
  formTitle: ResponsesForm['title'] | null;
  isEmpty: boolean;
  isLoading: boolean;
  isNotFound: boolean;
  responseCountLabel: string;
  responses: FormResponseCardData[];
  retry: () => void;
}
