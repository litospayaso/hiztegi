/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from './httpRequest';

export const getData = async (): Promise<{data: string}> => {
  return request('/whatever');
};
