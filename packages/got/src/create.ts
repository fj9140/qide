import type { InstanceDefaults, Got, HTTPAlias, GotReturn } from './types';
import Request from './core/index';

const aliases: readonly HTTPAlias[] = ['post'];

const create = (defaults: InstanceDefaults): Got => {
  console.log(defaults);
  const got: Got = (url: string): GotReturn => {
    const request = new Request();

    return request;
  };

  for (const method of aliases) {
    got[method] = () => {};
  }

  return got;
};

export default create;
