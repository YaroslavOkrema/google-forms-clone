import { useFormsQuery } from 'src/api/formsApi';
import { LOAD_ERROR_FALLBACK } from 'src/pages/HomePage/constants';
import { prepareForms } from 'src/pages/HomePage/helpers';
import type { UseHomePageResult } from 'src/pages/HomePage/types';

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
