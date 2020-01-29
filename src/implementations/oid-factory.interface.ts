import Hashids from 'hashids';
import { Oid } from '../oid';
import { ServiceName, ScopeName, Scope } from './scope-registry';

export interface OidFactory {
  create: (scopename: string, id: string | number) => Oid;
  unwrap: (oid: Oid) => { id: string | number; scope: string };
  getEncoder?: (scopename: string) => Hashids;
}
export interface OidFactory2 {
  create: (scopename: ScopeName, id: string | number, service: ServiceName) => Oid;
  unwrap: (oid: Oid) => { id: string | number; scope: Scope; suffix: string };
  getEncoder?: (scope: Scope) => Hashids;
}
