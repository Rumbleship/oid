import { Oid } from '../oid';
import Hashids from 'hashids';

export interface OidFactory {
  create: (scopename: string, id: string | number) => Oid;
  unwrap: (oid: Oid) => { id: string | number; scope: string };
  getEncoder?: (scopename: string) => Hashids;
}
