import type { FormsQuery } from '@google-forms/shared';

type FormSummary = Pick<
  FormsQuery['forms'][number],
  'id' | 'title' | 'description'
>;

export type HomePageForm = Omit<FormSummary, 'description'> & {
  description: string;
  fillPath: string;
  responsesPath: string;
};

export interface UseHomePageResult {
  errorMessage: string | null;
  forms: HomePageForm[];
  isEmpty: boolean;
  isLoading: boolean;
  retry: () => void;
}
