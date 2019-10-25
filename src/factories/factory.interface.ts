import { Oid2 } from '../oid';
import Hashids from 'hashids';

export interface OidFactory {
  create: (scopename: string, id: string | number) => Oid2;
  unwrap: (oid: Oid2) => { id: string | number; scope: string };
  getEncoder?: (scopename: string) => Hashids;
}
