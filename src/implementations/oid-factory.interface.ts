import { ScopeName, ServiceName, Scope } from './../oid';
import { Oid } from '../oid';
import Hashids from 'hashids';

export interface OidFactory {
  create: (scopename: string, id: string | number) => Oid;
  unwrap: (oid: Oid) => { id: string | number; scope: string };
  getEncoder?: (scopename: string) => Hashids;
}
export interface OidFactory2 {
  create: (scopename: ScopeName, id: string | number, service: ServiceName) => Oid;
  unwrap: (oid: Oid) => { id: string | number; scope: string; service: string };
  getEncoder?: (scope: Scope) => Hashids;
}
