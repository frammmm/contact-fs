import { capitalize } from './utils';

interface IParams {
  [key: string]: any
}

export const requireParamsValidation = (params: IParams): string[] => {
  const errors: string[] = [];

  Object.keys(params).forEach(key => {
    if (!params[key]) {
      errors.push(`${capitalize(key)} is missing.`);
    }
  });

  return errors;
};
