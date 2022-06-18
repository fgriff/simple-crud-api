import { validate, version } from 'uuid';

const isUuidValid = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};

export { isUuidValid };
