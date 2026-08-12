import { useFormsQuery } from '../../api/formsApi';
import { prepareForms } from './helpers';
import type { UseHomePageResult } from './types';

const LOAD_ERROR_FALLBACK = 'Unable to load forms. Please try again.';

export const useHomePage = (): UseHomePageResult => {
  const { data, error, isError, isFetching, isLoading, refetch } =
    useFormsQuery();
  const forms = prepareForms(data?.forms ?? []);
  const errorMessage = isError ? (error?.message ?? LOAD_ERROR_FALLBACK) : null;
  const showLoading = isLoading || (isFetching && !data);

  const retry = (): void => {
    void refetch();
  };

  return {
    errorMessage,
    forms,
    isEmpty: !showLoading && !isError && forms.length === 0,
    isLoading: showLoading,
    retry,
  };
};
