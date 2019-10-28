import 'reflect-metadata';
import { Registry } from './../src/registry';
import {
  CheckdigitScopes,
  AlphaHashidScopes,
  BankingScopeNames,
  NoCheckdigitArbiterScopes
} from '../src/implementations/scopes.enum';
const all_scopes_names = [
  ...Object.keys(AlphaHashidScopes),
  ...Object.keys(NoCheckdigitArbiterScopes),
  ...Object.keys(BankingScopeNames),
  ...Object.keys(CheckdigitScopes)
];

test.each(all_scopes_names)('Declared scope %s is registered', declared_scope => {
  expect(Reflect.get(Registry, declared_scope)).toBeTruthy();
});

test.each(Object.keys(Registry))('Registered scope %s is declared', registered_scope_name => {
  expect(all_scopes_names.find(scope_name => scope_name === registered_scope_name)).toBeTruthy();
});
