import type { FormsQuery } from '@google-forms/shared';
import { generatePath } from 'react-router-dom';

import { ROUTE_PATHS } from 'src/navigation/paths';
import { DESCRIPTION_FALLBACK } from 'src/pages/HomePage/constants';
import type { HomePageForm } from 'src/pages/HomePage/types';

const formatDescription = (description: string | null): string => {
  const trimmedDescription = description?.trim();

  return trimmedDescription || DESCRIPTION_FALLBACK;
};

export const prepareForms = (forms: FormsQuery['forms']): HomePageForm[] =>
  forms.map(({ description, id, title }) => ({
    description: formatDescription(description),
    fillPath: generatePath(ROUTE_PATHS.fillForm, { id }),
    id,
    responsesPath: generatePath(ROUTE_PATHS.formResponses, { id }),
    title,
  }));
